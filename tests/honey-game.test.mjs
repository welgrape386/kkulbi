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
const { createWorld, update, CAPACITY, SHOP, hidden } = await import(
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
