import assert from "node:assert/strict";
import { test, after } from "node:test";
import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const directory = await mkdtemp(join(tmpdir(), "honey-game-"));
after(() => rm(directory, { recursive: true, force: true }));
await build({
  entryPoints: ["src/app/components/honey-game/engine.ts"],
  outfile: join(directory, "engine.mjs"),
  format: "esm",
  platform: "node",
  bundle: true,
});
const {
  createWorld,
  update,
  CAPACITY,
  SHOP,
  hidden,
  THIEF_CATCH,
  THIEF_MAX,
  catchThief,
  clickedThief,
} = await import(
  pathToFileURL(join(directory, "engine.mjs"))
);
const advance = (w, keys, seconds) => {
  for (let i = 0; i < Math.round(seconds * 60); i++)
    update(w, new Set(keys), 1 / 60);
};
test("diagonal movement uses the same speed and stays inside the map", () => {
  const a = createWorld(),
    b = createWorld();
  a.bees = [];
  b.bees = [];
  a.player = { x: 150, y: 145 };
  b.player = { ...a.player };
  advance(a, ["d"], 0.5);
  advance(b, ["d", "s"], 0.5);
  assert.ok(
    Math.abs(
      Math.hypot(a.player.x - 150, a.player.y - 145) -
        Math.hypot(b.player.x - 150, b.player.y - 145),
    ) < 0.01,
  );
  advance(a, ["d"], 10);
  assert.ok(a.player.x <= 376);
});
test("harvesting holds player still, respects bag capacity and hive cooldown", () => {
  const w = createWorld();
  w.bees = [];
  w.player = { x: w.hives[0].x, y: w.hives[0].y };
  const before = { ...w.player };
  w.honey = 11;
  advance(w, ["e", "d"], 1);
  assert.deepEqual(w.player, before);
  advance(w, ["e"], 0.5);
  assert.equal(w.honey, CAPACITY);
  assert.ok(w.hives[0].cooldown > 0);
});
test("releasing E cancels harvesting progress", () => {
  const w = createWorld();
  w.bees = [];
  w.player = { ...w.hives[0] };
  advance(w, ["e"], 0.7);
  advance(w, [], 0.1);
  assert.equal(w.progress, 0);
  assert.equal(w.honey, 0);
});
test("only selling turns carried honey into income", () => {
  const w = createWorld();
  w.honey = 8;
  assert.equal(w.money, 0);
  w.player = { ...SHOP };
  advance(w, ["e"], 0.1);
  assert.equal(w.money, 160);
  assert.equal(w.honey, 0);
  advance(w, ["e"], 0.1);
  assert.equal(w.money, 160);
});
test("bee suspicion becomes pursuit and contact has an invulnerability window", () => {
  const w = createWorld();
  const b = w.bees[0];
  w.bees = [b];
  w.player = { x: b.x, y: b.y };
  advance(w, [], 1.35);
  assert.equal(b.mode, "chase");
  assert.equal(w.hp, 2);
  advance(w, [], 0.2);
  assert.equal(w.hp, 2);
});
test("death loses carried honey and preserves banked income", () => {
  const w = createWorld();
  w.money = 200;
  w.honey = 8;
  w.hp = 1;
  const b = w.bees[0];
  b.mode = "chase";
  w.player = { x: b.x, y: b.y };
  advance(w, [], 0.05);
  assert.equal(w.hp, 3);
  assert.equal(w.honey, 0);
  assert.equal(w.money, 200);
  assert.ok(w.player.y > 190);
});
test("hiding ends pursuit; shop is a safe zone", () => {
  const w = createWorld();
  w.player = { x: 105, y: 169 };
  assert.ok(hidden(w.player));
  const b = w.bees[0];
  b.mode = "chase";
  b.timer = 2;
  b.x = 100;
  b.y = 150;
  advance(w, [], 0.05);
  assert.equal(b.mode, "return");
  w.player = { ...SHOP };
  b.mode = "chase";
  b.x = SHOP.x;
  b.y = SHOP.y;
  advance(w, [], 0.1);
  assert.equal(w.hp, 3);
});
test("time expires without selling unsold honey and prevents further updates", () => {
  const w = createWorld();
  w.bees = [];
  w.honey = 5;
  w.remaining = 0.01;
  advance(w, [], 0.05);
  assert.equal(w.remaining, 0);
  assert.equal(w.money, 0);
  const p = { ...w.player };
  advance(w, ["d", "e"], 1);
  assert.deepEqual(w.player, p);
  assert.equal(w.honey, 5);
});

// Regression: a nearby hive must actually be harvestable before bees force contact.
test("entrance hives allow a full harvest with the real bee patrols active", () => {
  for (let i = 0; i < 2; i++) {
    const w = createWorld();
    w.player = { x: w.hives[i].x, y: w.hives[i].y + 12 };
    advance(w, ["e"], 1.5);
    assert.equal(w.honey, 2);
    assert.equal(w.hp, 3);
  }
});
test("patrols start away from their hive and return to their outer orbit", () => {
  const w = createWorld();
  for (const b of w.bees)
    assert.ok(Math.hypot(b.x - b.home.x, b.y - b.home.y) > 35);
  const b = w.bees[0];
  b.mode = "return";
  b.x = b.home.x;
  b.y = b.home.y;
  advance(w, [], 3);
  assert.ok(Math.hypot(b.x - b.home.x, b.y - b.home.y) > 30);
});

test("patrols use different directions, phases and angular speeds", () => {
  const w = createWorld(),
    angles = w.bees.map((b) => b.angle);
  assert.equal(new Set(w.bees.map((b) => b.direction)).size, 2);
  assert.ok(new Set(w.bees.map((b) => b.orbitSpeed)).size > 2);
  assert.ok(new Set(angles).size > 3);
  advance(w, [], 0.5);
  assert.ok(w.bees.some((b, i) => b.angle > angles[i]));
  assert.ok(w.bees.some((b, i) => b.angle < angles[i]));
});
test("harvesting alerts a nearby guard and lingering near the hive gets punished", () => {
  const w = createWorld();
  const b = w.bees[0];
  w.bees = [b];
  b.radius = 30; // 벌집 가까이 도는 경비벌
  b.x = b.home.x + 30;
  b.y = b.home.y;
  w.player = { x: w.hives[0].x, y: w.hives[0].y + 12 };
  advance(w, ["e"], 1);
  assert.equal(b.mode, "suspect");
  advance(w, ["e"], 0.5);
  assert.equal(w.honey, 2);
  advance(w, [], 1);
  assert.equal(b.mode, "chase");
  assert.ok(w.hp < 3);
});

test("harvesting does not alert a guard patrolling far from the hive", () => {
  const w = createWorld();
  const b = w.bees[0];
  w.bees = [b];
  b.radius = 75;
  b.x = b.home.x + 75;
  b.y = b.home.y;
  w.player = { x: w.hives[0].x, y: w.hives[0].y + 12 };
  advance(w, ["e"], 1.5);
  assert.equal(w.honey, 2);
  assert.equal(b.mode, "patrol");
  assert.equal(w.hp, 3);
});

test("a spotted player who ducks into a bush loses the bee and is not stung", () => {
  const w = createWorld();
  const b = w.bees[0];
  w.bees = [b];
  w.player = { x: 105, y: 169 };
  b.mode = "chase";
  b.timer = 0; // 방금 발각됨
  b.x = w.player.x;
  b.y = w.player.y;
  advance(w, [], 0.05);
  assert.equal(b.mode, "return");
  advance(w, [], 1);
  assert.equal(w.hp, 3);
});

test("a suspicious bee does not escalate on a player hiding in a bush", () => {
  const w = createWorld();
  const b = w.bees[0];
  w.bees = [b];
  w.player = { x: 105, y: 169 };
  b.mode = "suspect";
  b.timer = 0.75;
  b.x = w.player.x + 3;
  b.y = w.player.y;
  advance(w, [], 0.2);
  assert.equal(b.mode, "return");
  assert.equal(w.hp, 3);
});

test("moving players are spotted from farther away than players standing still", () => {
  const setup = () => {
    const w = createWorld();
    const b = w.bees[0];
    w.bees = [b];
    w.player = { x: 200, y: 150 };
    b.x = 200;
    b.y = 124; // 26px 위
    return { w, b };
  };
  const still = setup();
  update(still.w, new Set(), 1 / 60);
  assert.equal(still.b.mode, "patrol");
  const moving = setup();
  update(moving.w, new Set(["d"]), 1 / 60);
  assert.equal(moving.b.mode, "suspect");
});

test("a chasing bee closes the gap on a player running in a straight line", () => {
  const w = createWorld(),
    b = w.bees[0];
  w.bees = [b];
  w.player = { x: 170, y: 150 };
  b.x = 150;
  b.y = 150;
  b.home = { x: 170, y: 150 };
  b.mode = "chase";
  const before = Math.hypot(w.player.x - b.x, w.player.y - b.y);
  advance(w, ["d"], 0.7);
  assert.ok(Math.hypot(w.player.x - b.x, w.player.y - b.y) < before);
});

test("joystick moves in the dragged direction, scales speed and ignores the deadzone", () => {
  const run = (stick, keys = []) => {
    const w = createWorld();
    w.bees = [];
    w.player = { x: 200, y: 150 };
    for (let i = 0; i < 30; i++) update(w, new Set(keys), 1 / 60, stick);
    return { dx: w.player.x - 200, dy: w.player.y - 150 };
  };
  const full = run({ x: 0.7071, y: -0.7071 }); // 오른쪽 위 대각선, 끝까지 당김
  assert.ok(full.dx > 0 && full.dy < 0);
  assert.ok(Math.abs(Math.hypot(full.dx, full.dy) - 30) < 0.5); // 60px/s × 0.5s
  const half = run({ x: 0.5, y: 0 });
  assert.ok(Math.abs(half.dx - 15) < 0.5); // 절반만 당기면 절반 속도
  const tiny = run({ x: 0.1, y: 0 });
  assert.equal(tiny.dx, 0); // 데드존
  const keyboard = run({ x: 0, y: 0 }, ["d"]); // 스틱을 놓으면 키보드 그대로
  assert.ok(Math.abs(keyboard.dx - 30) < 0.5);
});

test("sound events: harvest, sell, sting, faint, alert and escape", async () => {
  const dir = await mkdtemp(join(tmpdir(), "honey-events-"));
  await build({
    entryPoints: ["src/app/components/honey-game/events.ts"],
    outfile: join(dir, "events.mjs"),
    format: "esm",
    platform: "node",
    bundle: true,
  });
  const { soundEvents } = await import(pathToFileURL(join(dir, "events.mjs")));
  await rm(dir, { recursive: true, force: true });
  const s = (o) => ({ honey: 0, money: 0, hp: 3, chasing: 0, thief: false, caught: 0, stolen: 0, ...o });
  assert.deepEqual(soundEvents(s(), s({ honey: 2 })), ["harvest"]);
  assert.deepEqual(soundEvents(s({ honey: 4 }), s({ money: 80 })), ["sell"]);
  assert.deepEqual(soundEvents(s({ chasing: 1 }), s({ hp: 2, chasing: 1 })), ["sting"]);
  // 쓰러짐: 체력 1 → 3으로 초기화, 추격 해제 — "escape"는 울리지 않아야 함
  assert.deepEqual(soundEvents(s({ hp: 1, honey: 5, chasing: 1 }), s({ hp: 3 })), ["faint"]);
  assert.deepEqual(soundEvents(s(), s({ chasing: 1 })), ["alert"]);
  assert.deepEqual(soundEvents(s({ chasing: 2 }), s()), ["escape"]);
  assert.deepEqual(soundEvents(s(), s()), []);
  assert.deepEqual(soundEvents(s(), s({ thief: true })), ["thief"]);
  // 검거 보상으로 수입이 늘어도 판매음이 아니라 검거음
  assert.deepEqual(soundEvents(s({ thief: true, money: 100 }), s({ money: 200, caught: 1 })), ["catch"]);
  assert.deepEqual(soundEvents(s({ thief: true, money: 100 }), s({ thief: true, stolen: 1 })), ["stolen"]);
});

// ─── 도둑 ──────────────────────────────────────────────────────────────────
const thiefWorld = (thief, player) => {
  const w = createWorld();
  w.bees = [];
  w.money = 300;
  w.thief = { mode: "sneak", loot: 0, standoff: -1, exit: { x: 374, y: 150 }, ...thief };
  w.player = player;
  return w;
};

test("thief only appears once there is banked income to steal", () => {
  const w = createWorld();
  w.bees = [];
  w.player = { x: 200, y: 30 };
  w.thiefTimer = 0.5;
  advance(w, [], 1);
  assert.equal(w.thief, null);
  w.money = 50;
  advance(w, [], 0.05);
  assert.ok(w.thief);
});

test("an unnoticed thief reaches the shop, steals and escapes", () => {
  const w = thiefWorld({ x: 120, y: 207 }, { x: 300, y: 40 });
  advance(w, [], 2.5); // 80px / 40px/s
  assert.equal(w.money, 200);
  assert.equal(w.thief?.mode, "escape");
  assert.equal(w.thief?.loot, 100);
  assert.equal(w.stolen, 1);
});

test("a normal-speed player runs down a fleeing thief and catches it with E", () => {
  const w = thiefWorld({ x: 150, y: 150 }, { x: 115, y: 150 });
  advance(w, [], 0.05);
  assert.equal(w.thief.mode, "flee");
  let caughtAt = -1;
  for (let i = 0; i < 60 * 8 && w.thief; i++) {
    update(w, new Set(["d"]), 1 / 60); // 쫓아가기
    if (w.thief && Math.hypot(w.thief.x - w.player.x, w.thief.y - w.player.y) < THIEF_CATCH - 1) {
      update(w, new Set(["e"]), 1 / 60);
      caughtAt = i / 60;
    }
  }
  assert.equal(w.thief, null);
  assert.equal(w.caught, 1);
  assert.equal(w.money, 400);
  assert.ok(caughtAt > 1.5 && caughtAt < 5, `caught after ${caughtAt}s`); // 35px 차이를 초당 8px로 좁힘
});

test("a player carrying 10+ honey is too slow to catch a fleeing thief", () => {
  const w = thiefWorld({ x: 150, y: 150 }, { x: 115, y: 150 });
  w.honey = 10;
  const gap = () => Math.hypot(w.thief.x - w.player.x, w.thief.y - w.player.y);
  advance(w, [], 0.05);
  const before = gap();
  advance(w, ["d"], 2);
  assert.ok(w.thief && gap() > before); // 48 < 52 → 거리가 벌어짐
});

test("a player hiding in a bush is not noticed and can ambush the thief", () => {
  // 수풀(105,169) 가장자리에 숨어, 상점으로 가는 도둑의 길목을 지킴
  const w = thiefWorld({ x: 160, y: 160 }, { x: 105, y: 176 });
  assert.ok(hidden(w.player));
  advance(w, [], 0.3);
  assert.equal(w.thief.mode, "sneak");
  // 도둑이 수풀 앞을 지나갈 때 E
  for (let i = 0; i < 120 && w.thief; i++) update(w, new Set(["e"]), 1 / 60);
  assert.equal(w.caught, 1);
  assert.equal(w.money, 400);
});

test("catching an escaping thief returns the stolen money plus the reward", () => {
  const w = thiefWorld({ x: 60, y: 200, mode: "escape", loot: 100 }, { x: 64, y: 200 });
  w.money = 200;
  advance(w, ["e"], 0.02);
  assert.equal(w.money, 400);
  assert.equal(w.thief, null);
});

test("a fleeing thief cannot leave the map and gets cornered", () => {
  const w = thiefWorld({ x: 370, y: 225, mode: "flee" }, { x: 340, y: 200 });
  for (let i = 0; i < 60 * 4 && w.thief; i++) {
    const th = w.thief, close = Math.hypot(th.x - w.player.x, th.y - w.player.y) < 12;
    update(w, new Set(close ? ["e"] : ["d", "s"]), 1 / 60);
    if (w.thief) assert.ok(w.thief.x <= 376 && w.thief.y <= 232);
  }
  assert.equal(w.caught, 1);
});

test("a thief that shakes off the player goes back to sneaking toward the shop", () => {
  const w = thiefWorld({ x: 200, y: 120, mode: "flee" }, { x: 200, y: 200 });
  advance(w, [], 0.1);
  assert.equal(w.thief.mode, "sneak");
});

const withRandom = (value, fn) => {
  const original = Math.random;
  Math.random = () => value;
  try {
    fn();
  } finally {
    Math.random = original;
  }
};
const resolveThief = (w) => {
  w.thief = null;
  w.thiefTimer = 0;
};

test("at most two thieves per game, the second one only by chance", () => {
  const w = createWorld();
  w.bees = [];
  w.money = 500;
  w.player = { x: 200, y: 30 };
  w.thiefTimer = 0;
  withRandom(0.99, () => {
    update(w, new Set(), 1 / 60); // 첫 도둑은 확률과 상관없이 등장
    assert.equal(w.thiefCount, 1);
    resolveThief(w);
    update(w, new Set(), 1 / 60); // 두 번째: 확률(50%) 실패 → 재시도 대기
    assert.equal(w.thief, null);
    assert.ok(w.thiefTimer > 0);
  });
  withRandom(0.1, () => {
    w.thiefTimer = 0;
    update(w, new Set(), 1 / 60); // 확률 성공 → 두 번째 등장
    assert.equal(w.thiefCount, 2);
    for (let i = 0; i < 5; i++) {
      resolveThief(w);
      update(w, new Set(), 1 / 60);
    }
  });
  assert.equal(w.thiefCount, THIEF_MAX);
  assert.equal(w.thief, null);
});

test("clicking the thief catches it only when the player is close enough", () => {
  const w = thiefWorld({ x: 200, y: 150 }, { x: 150, y: 150 });
  assert.ok(clickedThief(w, { x: 200, y: 142 }));
  assert.ok(!clickedThief(w, { x: 240, y: 142 }));
  assert.equal(catchThief(w), false); // 너무 멂
  w.player = { x: 190, y: 150 };
  assert.equal(catchThief(w), true);
  assert.equal(w.money, 400);
  assert.equal(w.thief, null);
});

test("a thief that has been in a standoff for 15 seconds gives up and leaves", () => {
  const w = thiefWorld({ x: 200, y: 120 }, { x: 200, y: 150 });
  w.player = { x: 200, y: 150 };
  advance(w, [], 0.1);
  assert.equal(w.thief.mode, "flee");
  // 플레이어는 가만히, 도둑은 대치 중: 15초 전엔 아직 남아 있음
  w.thief.standoff = 14.5;
  advance(w, [], 0.3);
  assert.notEqual(w.thief?.mode, "escape");
  advance(w, [], 0.3);
  assert.equal(w.thief.mode, "escape");
  assert.equal(w.thief.loot, 0);
  advance(w, [], 10);
  assert.equal(w.thief, null);
  assert.equal(w.money, 300); // 훔쳐 가지는 않음
});
