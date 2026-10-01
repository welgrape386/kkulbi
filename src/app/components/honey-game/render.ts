import {
  BUSHES,
  HEIGHT,
  SHOP,
  THIEF_CATCH,
  TREES,
  WIDTH,
  hidden,
  type World,
} from "./engine";
import {
  BEE,
  BEE_COLORS,
  HIVE,
  HIVE_COLORS,
  PLAYER,
  PLAYER_COLORS,
  THIEF,
  THIEF_COLORS,
  sprite,
} from "./sprites";
const hash = (x: number, y: number, seed = 0) => {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return n - Math.floor(n);
};
const LEAF = ["#254837", "#356340", "#467a44", "#659650", "#8bb95c"];
type Scenery = {
  ground: HTMLCanvasElement;
  objects: { y: number; image: HTMLCanvasElement }[];
};
let scenery: Scenery | null = null;
function layer() {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  return canvas;
}
export function draw(ctx: CanvasRenderingContext2D, w: World, time: number) {
  ctx.imageSmoothingEnabled = false;
  let ink = ctx;
  const ground = !scenery && typeof document !== "undefined" ? layer() : null;
  if (ground) ink = ground.getContext("2d")!;
  const rect = (x: number, y: number, a: number, b: number, color: string) => {
    ink.fillStyle = color;
    ink.fillRect(Math.round(x), Math.round(y), a, b);
  };
  if (!scenery) {
    rect(0, 0, WIDTH, HEIGHT, "#93bb6c");
    // 16px terrain tiles with deterministic texture: no random flicker between frames.
    for (let y = 0; y < HEIGHT; y += 16)
      for (let x = 0; x < WIDTH; x += 16) {
        rect(x, y, 16, 16, hash(x, y) > 0.45 ? "#94bd6e" : "#9cc576");
        for (let i = 0; i < 9; i++) {
          const xx = x + Math.floor(hash(x, y, i + 1) * 15),
            yy = y + Math.floor(hash(y, x, i + 4) * 15);
          rect(xx, yy, 1, 1, i % 3 ? "#84ad60" : "#b0d888");
          if (i % 3 === 0) {
            rect(xx + 1, yy - 1, 1, 2, "#84ad60");
          }
        }
      }
    const dirt = (x: number, y: number, a: number, b: number) => {
      rect(x - 1, y - 1, a + 2, b + 2, "#b3ab69");
      rect(x, y, a, b, "#d9c48c");
      for (let yy = y + 2; yy < y + b; yy += 5)
        for (let xx = x + 2; xx < x + a; xx += 6) {
          const v = hash(xx, yy);
          if (v > 0.6) rect(xx, yy, 2, 1, v > 0.85 ? "#ae9869" : "#edd8a3");
        }
    };
    dirt(20, 185, 66, 43);
    dirt(48, 135, 19, 64);
    dirt(58, 135, 92, 18);
    dirt(134, 100, 18, 47);
    dirt(143, 96, 139, 18);
    dirt(264, 71, 18, 34);
    dirt(271, 68, 68, 18);
    // Tiny flower patches and pebble clusters replace the empty flat ground.
    for (let i = 0; i < 45; i++) {
      const x = 10 + Math.floor(hash(i, 4) * 360),
        y = 12 + Math.floor(hash(i, 9) * 212);
      if ((x < 87 && y > 180) || (x > 48 && x < 150 && y > 130 && y < 155))
        continue;
      rect(x, y, 1, 3, "#517944");
      rect(x - 1, y - 1, 3, 2, i % 3 ? "#e9e8ae" : "#d98980");
      rect(x, y, 1, 1, "#f5ce65");
    }
    for (let x = 8; x < WIDTH; x += 16) {
      rect(x, 5, 3, 8, "#6a5b3c");
      rect(x + 1, 4, 1, 7, "#d2bc7b");
      rect(x - 7, 7, 16, 2, "#8c7a4c");
      rect(x - 7, 10, 16, 1, "#c1a565");
    }
  }
  if (ground) {
    scenery = { ground, objects: [] };
    ctx.drawImage(ground, 0, 0);
  } else if (scenery) ctx.drawImage(scenery.ground, 0, 0);
  ink = ctx;
  function shadow(x: number, y: number, width: number) {
    rect(x - width / 2 + 2, y, width - 4, 4, "#72965a");
    rect(x - width / 2 + 5, y + 4, width - 10, 2, "#72965a");
  }
  function leafCluster(x: number, y: number, r: number, seed: number) {
    for (let yy = -r; yy <= r; yy++)
      for (let xx = -r; xx <= r; xx++) {
        const d = xx * xx + (yy * 1.14) ** 2;
        if (d > r * r) continue;
        const edge = d > (r - 1.6) ** 2;
        const light = (-yy + xx * 0.25) / r;
        const n = hash(Math.floor(xx / 2), Math.floor(yy / 2), seed);
        const shade = edge
          ? 0
          : Math.max(1, Math.min(4, Math.floor(2 + light + n * 1.7)));
        rect(x + xx, y + yy, 1, 1, LEAF[shade]);
      }
    rect(x - 3, y - r + 3, 3, 1, "#a4c970");
    rect(x + 2, y - 2, 2, 1, "#84ac56");
  }
  function tree(x: number, y: number, seed: number) {
    shadow(x, y + 3, 34);
    rect(x - 5, y - 19, 10, 22, "#403f2c");
    rect(x - 3, y - 19, 6, 21, "#8b6541");
    rect(x - 2, y - 17, 2, 17, "#b28751");
    rect(x + 2, y - 12, 2, 13, "#644a32");
    rect(x - 7, y + 1, 6, 2, "#514332");
    rect(x + 3, y + 1, 5, 2, "#514332");
    leafCluster(x, y - 28, 17, seed);
    leafCluster(x - 11, y - 23, 10, seed + 1);
    leafCluster(x + 11, y - 24, 10, seed + 2);
    leafCluster(x - 4, y - 37, 11, seed + 3);
    leafCluster(x + 6, y - 33, 11, seed + 4);
  }
  function bush(x: number, y: number) {
    shadow(x, y + 3, 34);
    leafCluster(x - 10, y - 2, 8, 3);
    leafCluster(x, y - 4, 10, 5);
    leafCluster(x + 10, y - 2, 8, 9);
    for (let i = 0; i < 6; i++) rect(x - 13 + i * 5, y + 3, 2, 1, "#86ae58");
  }
  function shop() {
    const x = SHOP.x,
      y = SHOP.y;
    shadow(x, y + 2, 46);
    rect(x - 20, y - 28, 40, 29, "#594c34");
    rect(x - 18, y - 26, 36, 25, "#e2ca92");
    for (let yy = y - 23; yy < y; yy += 5) rect(x - 18, yy, 36, 1, "#bca273");
    rect(x - 24, y - 36, 48, 10, "#62473a");
    rect(x - 21, y - 40, 42, 7, "#a85e42");
    rect(x - 18, y - 44, 36, 5, "#cb8258");
    for (let yy = y - 42; yy < y - 28; yy += 4)
      for (let xx = x - 19; xx < x + 20; xx += 7)
        rect(xx + (yy % 2), yy, 6, 1, "#e1a16b");
    rect(x - 8, y - 18, 16, 19, "#684933");
    rect(x - 6, y - 16, 12, 16, "#ad7b4b");
    rect(x + 2, y - 7, 2, 2, "#f1d07f");
    for (const offset of [-15, 11]) {
      rect(x + offset, y - 23, 6, 8, "#536858");
      rect(x + offset + 1, y - 22, 4, 5, "#a9d5cd");
      rect(x + offset + 3, y - 22, 1, 5, "#e4e4bd");
    }
    rect(x + 24, y - 14, 14, 11, "#6d5738");
    rect(x + 25, y - 13, 12, 8, "#d6bb7e");
    sprite(ink, HIVE, HIVE_COLORS, x + 26, y - 13);
    rect(x + 29, y - 3, 2, 6, "#796344");
  }
  // Sort grounded objects by feet so walking behind a tree reads as depth.
  const objects: { y: number; paint: () => void }[] = [
    { y: SHOP.y, paint: shop },
  ];
  TREES.forEach((t, i) =>
    objects.push({ y: t.y, paint: () => tree(t.x, t.y, i * 8) }),
  );
  BUSHES.forEach((b) => objects.push({ y: b.y, paint: () => bush(b.x, b.y) }));
  if (scenery) {
    if (!scenery.objects.length) {
      for (const object of objects) {
        const image = layer();
        ink = image.getContext("2d")!;
        object.paint();
        scenery.objects.push({ y: object.y, image });
      }
      ink = ctx;
    }
    objects.splice(
      0,
      objects.length,
      ...scenery.objects.map((object) => ({
        y: object.y,
        paint: () => ctx.drawImage(object.image, 0, 0),
      })),
    );
  }
  const p = w.player;
  objects.push({
    y: p.y,
    paint: () => {
      if (w.invincible > 0 && Math.floor(time / 100) % 2 !== 0) return;
      shadow(p.x, p.y, 16);
      ctx.globalAlpha = hidden(p) ? 0.55 : 1;
      const step = Math.floor(time / 160) % 2;
      sprite(ctx, PLAYER, PLAYER_COLORS, p.x - 8, p.y - 21);
      if (w.progress > 0) {
        const cut = Math.floor(time / 130) % 2;
        rect(p.x + 8, p.y - 13 + cut * 4, 2, 9, "#9b7044");
        rect(p.x + 7, p.y - 15 + cut * 4, 6, 4, "#364a4b");
        rect(p.x + 8, p.y - 15 + cut * 4, 5, 2, "#d1e0d4");
      } else if (step) {
        rect(p.x - 4, p.y - 1, 2, 1, "#182f32");
      }
      ctx.globalAlpha = 1;
    },
  });
  const t = w.thief;
  if (t) {
    objects.push({
      y: t.y,
      paint: () => {
        shadow(t.x, t.y, 14);
        const bob = t.mode === "sneak" ? 0 : Math.floor(time / 90) % 2; // 도망칠 땐 종종걸음
        sprite(ctx, THIEF, THIEF_COLORS, t.x - 6, t.y - 16 - bob, t.x > p.x);
        if (t.loot > 0) {
          // 훔친 돈자루
          rect(t.x + 5, t.y - 10 - bob, 6, 6, "#9b7044");
          rect(t.x + 6, t.y - 9 - bob, 4, 4, "#d9b66a");
          rect(t.x + 7, t.y - 12 - bob, 2, 2, "#6b4a2b");
        }
      },
    });
  }
  objects.sort((a, b) => a.y - b.y).forEach((o) => o.paint());
  if (t) {
    // 도망 중 표시 + 잡을 수 있는 거리면 빨간 원
    if (t.mode !== "sneak") {
      rect(t.x - 4, t.y - 29, 9, 10, "#fff2c4");
      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "#b04b3f";
      ctx.fillText("!", Math.round(t.x - 2), Math.round(t.y - 21));
    }
    if (Math.hypot(t.x - p.x, t.y - p.y) < THIEF_CATCH) {
      ctx.strokeStyle = "#e0483a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(Math.round(t.x), Math.round(t.y - 7), 11 + (Math.floor(time / 120) % 2), 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  w.hives.forEach((h) => {
    rect(h.x - 10, h.y - 19, 11, 2, "#705036");
    rect(h.x, h.y - 18, 1, 12, "#6c5e39");
    const colors = h.cooldown
      ? { O: "#65613e", Y: "#b5a775", L: "#c9bd8d" }
      : h.amount === 8
        ? { ...HIVE_COLORS, Y: "#f3c14f", L: "#ffe6a0" }
        : HIVE_COLORS;
    sprite(ctx, HIVE, colors, h.x - 6, h.y - 6);
  });
  for (const b of w.bees) {
    const flap = Math.floor(time / 80) % 2;
    sprite(
      ctx,
      BEE,
      BEE_COLORS,
      b.x - 6,
      b.y - 5 - flap,
      Math.cos(b.angle) < 0,
    );
    if (b.mode === "suspect" || b.mode === "chase") {
      rect(b.x - 4, b.y - 18, 9, 10, "#fff2c4");
      rect(b.x - 3, b.y - 19, 7, 1, "#4f573c");
      ctx.font = "bold 9px monospace";
      ctx.fillStyle = b.mode === "chase" ? "#b04b3f" : "#6b6041";
      ctx.fillText(
        b.mode === "chase" ? "!" : "?",
        Math.round(b.x - 2),
        Math.round(b.y - 10),
      );
    }
  }
  if (w.progress > 0) {
    rect(p.x - 12, p.y - 29, 24, 5, "#324d3b");
    rect(p.x - 11, p.y - 28, Math.round((22 * w.progress) / 1.4), 3, "#f6d97a");
  }
  if (w.remaining < 15) {
    ctx.fillStyle = `rgba(50,39,65,${(15 - w.remaining) / 60})`;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }
}
