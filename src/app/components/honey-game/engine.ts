export const WIDTH = 384,
  HEIGHT = 240,
  DURATION = 120,
  CAPACITY = 12;
export type Point = { x: number; y: number };
export type Hive = Point & { amount: number; cooldown: number };
export type Bee = Point & {
  home: Point;
  mode: "patrol" | "suspect" | "chase" | "return";
  timer: number;
  angle: number;
  radius: number;
  speed: number;
  direction: number;
  orbitSpeed: number;
  phase: number;
  lastKnown: Point;
};
export type World = {
  player: Point;
  hp: number;
  honey: number;
  money: number;
  remaining: number;
  invincible: number;
  progress: number;
  target: number;
  message: string;
  hives: Hive[];
  bees: Bee[];
};
export const SHOP = { x: 40, y: 207 };
export const BUSHES = [
  { x: 105, y: 169 },
  { x: 174, y: 111 },
  { x: 290, y: 161 },
  { x: 246, y: 57 },
];
export const TREES = [
  { x: 48, y: 61 },
  { x: 104, y: 107 },
  { x: 181, y: 52 },
  { x: 258, y: 103 },
  { x: 333, y: 48 },
  { x: 338, y: 191 },
  { x: 192, y: 191 },
];
export const distance = (a: Point, b: Point) =>
  Math.hypot(a.x - b.x, a.y - b.y);
export const hidden = (p: Point) =>
  BUSHES.some((b) => Math.abs(p.x - b.x) < 16 && Math.abs(p.y - b.y) < 10);
export function createWorld(): World {
  const hives = TREES.slice(0, 5).map((t, i) => ({
    x: t.x + 13,
    y: t.y + 12,
    amount: i < 2 ? 2 : i < 4 ? 4 : 8,
    cooldown: 0,
  }));
  return {
    player: { x: 55, y: 207 },
    hp: 3,
    honey: 0,
    money: 0,
    remaining: DURATION,
    invincible: 0,
    progress: 0,
    target: -1,
    message: "벌의 움직임을 보고 벌집에 다가가세요.",
    hives,
    bees: hives.flatMap((h, i) =>
      Array.from({ length: i === 4 ? 2 : 1 }, (_, j) => {
        const phase = i === 4 ? Math.PI + j * 1.5 : i * 0.9;
        const radius = i === 4 ? 46 : 48 + (i % 3) * 4;
        return {
          x: h.x + Math.cos(phase) * radius,
          y: h.y + Math.sin(phase) * radius * 0.8,
          home: { x: h.x, y: h.y },
          mode: "patrol" as const,
          timer: 0,
          angle: phase,
          radius,
          speed: i === 4 ? 74 : 66 + (i % 3) * 2,
          direction: (i + j) % 2 === 0 ? 1 : -1,
          orbitSpeed: 0.38 + (i % 3) * 0.11 + j * 0.07,
          phase,
          lastKnown: { x: h.x, y: h.y },
        };
      }),
    ),
  };
}
function walk(p: Point, target: Point, speed: number, dt: number) {
  const d = distance(p, target);
  if (d > 0) {
    p.x += ((target.x - p.x) / d) * Math.min(d, speed * dt);
    p.y += ((target.y - p.y) / d) * Math.min(d, speed * dt);
  }
}
export function update(w: World, keys: Set<string>, dt: number) {
  if (w.remaining <= 0) return;
  w.remaining = Math.max(0, w.remaining - dt);
  w.invincible = Math.max(0, w.invincible - dt);
  w.hives.forEach((h) => (h.cooldown = Math.max(0, h.cooldown - dt)));
  const dx =
    Number(keys.has("d") || keys.has("arrowright")) -
    Number(keys.has("a") || keys.has("arrowleft"));
  const dy =
    Number(keys.has("s") || keys.has("arrowdown")) -
    Number(keys.has("w") || keys.has("arrowup"));
  const interaction = keys.has("e");
  const nearShop = distance(w.player, SHOP) < 25;
  const target = w.hives.findIndex(
    (h) => h.cooldown === 0 && distance(w.player, h) < 21,
  );
  const harvesting =
    interaction && target >= 0 && !nearShop && w.honey < CAPACITY;
  if (!harvesting && (dx || dy)) {
    const speed = ((w.honey >= 10 ? 48 : 60) * dt) / Math.hypot(dx, dy);
    const next = {
      x: Math.max(8, Math.min(WIDTH - 8, w.player.x + dx * speed)),
      y: Math.max(17, Math.min(HEIGHT - 8, w.player.y + dy * speed)),
    };
    const blocked = (p: Point) =>
      TREES.some((t) => Math.abs(p.x - t.x) < 7 && Math.abs(p.y - t.y) < 7);
    if (!blocked({ x: next.x, y: w.player.y })) w.player.x = next.x;
    if (!blocked({ x: w.player.x, y: next.y })) w.player.y = next.y;
  }
  if (interaction && nearShop && w.honey > 0) {
    w.money += w.honey * 20;
    w.message = `꿀 ${w.honey}개 판매! 수입이 안전하게 보관됐어요.`;
    w.honey = 0;
  }
  if (harvesting) {
    if (w.target !== target) w.progress = 0;
    w.target = target;
    w.progress += dt;
    const h = w.hives[target];
    w.bees.forEach((b) => {
      if (w.progress > 0.6 && distance(b, h) < 60 && b.mode === "patrol") {
        b.mode = "suspect";
        b.timer = 0;
        b.lastKnown = { ...w.player };
      }
    });
    if (w.progress >= 1.4) {
      const amount = Math.min(h.amount, CAPACITY - w.honey);
      w.honey += amount;
      h.cooldown = 18;
      w.progress = 0;
      w.message = `꿀 +${amount}! 상점으로 가져가세요.`;
    }
  } else {
    w.progress = 0;
    w.target = -1;
  }
  for (const b of w.bees) {
    b.timer += dt;
    const d = distance(b, w.player);
    const safe = distance(w.player, SHOP) < 32;
    const seen = !safe && d < (hidden(w.player) ? 6 : 24);
    if (b.mode === "patrol") {
      b.angle += dt * b.orbitSpeed * b.direction;
      const radius = b.radius + Math.sin(b.angle * 2 + b.phase) * 7;
      walk(
        b,
        {
          x: Math.max(
            12,
            Math.min(WIDTH - 12, b.home.x + Math.cos(b.angle) * radius),
          ),
          y: Math.max(
            18,
            Math.min(HEIGHT - 12, b.home.y + Math.sin(b.angle) * radius * 0.8),
          ),
        },
        24 + b.orbitSpeed * 12,
        dt,
      );
      if (seen) {
        b.lastKnown = { ...w.player };
        b.mode = "suspect";
        b.timer = 0;
      }
    } else if (b.mode === "suspect") {
      if (seen) b.lastKnown = { ...w.player };
      walk(b, b.lastKnown, 28, dt);
      if (b.timer > 0.8) {
        b.mode =
          !safe &&
          (seen || d < 32 || (harvesting && distance(b, w.hives[target]) < 60))
            ? "chase"
            : "return";
        b.timer = 0;
      }
    } else if (b.mode === "chase") {
      walk(b, w.player, b.speed, dt);
      if (
        safe ||
        distance(b, b.home) > 105 ||
        (hidden(w.player) && b.timer > 1.2)
      ) {
        b.mode = "return";
        b.timer = 0;
      }
      if (!safe && d < 8 && w.invincible === 0) {
        w.hp--;
        w.invincible = 1.3;
        w.progress = 0;
        w.message = "따끔! 수풀에 숨어 추격을 피하세요.";
        const away = {
          x: w.player.x + (w.player.x - b.x) * 2,
          y: w.player.y + (w.player.y - b.y) * 2,
        };
        w.player.x = Math.max(8, Math.min(WIDTH - 8, away.x));
        w.player.y = Math.max(17, Math.min(HEIGHT - 8, away.y));
        if (w.hp === 0) {
          w.player = { x: 55, y: 207 };
          w.hp = 3;
          w.honey = 0;
          w.invincible = 2;
          w.message =
            "상점 앞에서 깨어났어요. 들고 있던 꿀은 잃었지만 판매 수입은 안전해요.";
          w.bees.forEach((bee) => {
            bee.mode = "return";
            bee.timer = 0;
          });
        }
      }
    } else {
      const orbit = {
        x: Math.max(
          12,
          Math.min(WIDTH - 12, b.home.x + Math.cos(b.angle) * b.radius),
        ),
        y: Math.max(
          18,
          Math.min(HEIGHT - 12, b.home.y + Math.sin(b.angle) * b.radius * 0.8),
        ),
      };
      walk(b, orbit, 38, dt);
      if (distance(b, orbit) < 3) {
        b.mode = "patrol";
        b.timer = 0;
      }
    }
  }
  if (w.remaining === 0)
    w.message = "해가 졌어요. 판매한 꿀의 수입으로 기록을 남겨요.";
}
