import {
  BUSHES,
  HEIGHT,
  SHOP,
  TREES,
  WIDTH,
  hidden,
  type World,
} from "./engine";
export function draw(ctx: CanvasRenderingContext2D, w: World, time: number) {
  ctx.imageSmoothingEnabled = false;
  const rect = (x: number, y: number, a: number, b: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), a, b);
  };
  rect(0, 0, WIDTH, HEIGHT, "#83ac67");
  for (let y = 0; y < HEIGHT; y += 12)
    for (let x = 0; x < WIDTH; x += 12) {
      if ((x * 7 + y * 3) % 31 < 10) rect(x + 3, y + 4, 2, 2, "#72995a");
    }
  rect(20, 185, 64, 43, "#ceb780");
  rect(45, 132, 15, 60, "#ceb780");
  rect(50, 132, 82, 12, "#ceb780");
  for (const t of TREES) {
    rect(t.x - 4, t.y - 8, 8, 17, "#815537");
    rect(t.x - 19, t.y - 31, 38, 19, "#365d3b");
    rect(t.x - 14, t.y - 40, 28, 19, "#497744");
    rect(t.x - 10, t.y - 36, 15, 8, "#5d8c4f");
  }
  rect(SHOP.x - 19, SHOP.y - 28, 38, 27, "#e5c894");
  rect(SHOP.x - 23, SHOP.y - 34, 46, 9, "#a75d43");
  rect(SHOP.x - 15, SHOP.y - 25, 30, 5, "#f2dfb0");
  rect(SHOP.x - 5, SHOP.y - 15, 10, 15, "#70513c");
  ctx.font = "8px monospace";
  ctx.fillStyle = "#fff4d4";
  ctx.fillText("SHOP", SHOP.x - 10, SHOP.y - 19);
  w.hives.forEach((h) => {
    rect(
      h.x - 5,
      h.y - 6,
      10,
      12,
      h.cooldown ? "#8d8860" : h.amount === 8 ? "#ffd368" : "#d99636",
    );
    rect(h.x - 7, h.y - 3, 14, 6, h.cooldown ? "#8d8860" : "#efb94e");
    rect(h.x - 1, h.y, 3, 3, "#694423");
  });
  for (const b of BUSHES) {
    rect(b.x - 16, b.y - 8, 32, 16, "#477b48");
    rect(b.x - 12, b.y - 11, 10, 8, "#62934c");
    rect(b.x + 2, b.y - 10, 10, 7, "#62934c");
  }
  const p = w.player;
  if (w.invincible === 0 || Math.floor(time / 100) % 2 === 0) {
    rect(p.x - 5, p.y, 10, 3, "#628452");
    rect(p.x - 3, p.y - 12, 6, 6, "#efc599");
    rect(p.x - 4, p.y - 14, 8, 3, "#60442f");
    rect(p.x - 4, p.y - 6, 8, 6, hidden(p) ? "#608754" : "#b4543e");
    rect(p.x - 3, p.y, 2, 3, "#3d4550");
    rect(p.x + 1, p.y, 2, 3, "#3d4550");
    rect(p.x + 4, p.y - 7, 3, 6, "#d8ae60");
    if (w.progress > 0) {
      rect(p.x - 10, p.y - 20, 20, 3, "#355439");
      rect(
        p.x - 10,
        p.y - 20,
        Math.round((20 * w.progress) / 1.4),
        3,
        "#ffe193",
      );
    }
  }
  for (const b of w.bees) {
    const flap = Math.floor(time / 90) % 2;
    rect(b.x - 5, b.y - 5 - flap, 4, 3, "#e8f3df");
    rect(b.x + 1, b.y - 5 + flap, 4, 3, "#e8f3df");
    rect(b.x - 4, b.y - 2, 8, 5, "#edbf4d");
    rect(b.x - 1, b.y - 2, 2, 5, "#604c31");
    rect(b.x + 3, b.y - 1, 1, 2, "#382f28");
    if (b.mode === "suspect" || b.mode === "chase") {
      ctx.fillStyle = b.mode === "chase" ? "#922e2e" : "#fff4d4";
      ctx.fillText(b.mode === "chase" ? "!" : "?", b.x - 2, b.y - 10);
    }
  }
  if (w.remaining < 15) {
    ctx.fillStyle = `rgba(50,39,65,${(15 - w.remaining) / 60})`;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }
}
