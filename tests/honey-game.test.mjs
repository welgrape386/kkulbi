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
  advance(w, [], 0.8);
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
