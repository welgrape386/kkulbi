// Original pixel sprites, one character = one native canvas pixel.
export const PLAYER = [
  ".....OOOOOO.....",
  "....OBBBBBBO....",
  "...OBBBBBBBBO...",
  "...OBBHHHHBBO...",
  "..OHHHHHHHHHHO..",
  "..OOOOOOOOOOOO..",
  "...OKSSSSSSKO...",
  "...OKSOSSOSKO...",
  "....OSSSSSSO....",
  ".....OSSSSO.....",
  "....OOCCCCOO....",
  "...OCCCCCCCCO...",
  "..OSOCCLLCCOAO..",
  "..OSOCCLLCCOAAO.",
  "..OSOCCCCCCOAAO.",
  "...OOCCCCCCOOAO.",
  "....ODDDDDDOOO..",
  "....ODDODDDO....",
  "....ODDOODDO....",
  "....OFFOOFFO....",
  "...OFFFFOFFFFO..",
  "...OOOOOOOOOOO..",
];
export const PLAYER_COLORS: Record<string, string> = {
  O: "#283b38",
  B: "#a65f39",
  H: "#e9c878",
  K: "#684838",
  S: "#f7d7a5",
  C: "#cb5748",
  L: "#eb8970",
  D: "#54737d",
  F: "#31434b",
  A: "#b78c51",
};
export const HIVE = [
  ".....OO.....",
  "....OYYO....",
  "...OYYYYO...",
  "..OYYLLYYO..",
  ".OYYYYYYYYO.",
  "OYYLLLLLLYYO",
  "OYYYYYYYYYYO",
  "OYYLLLLLLYYO",
  "OYYYYOOYYYYO",
  ".OYYOOOOYYO.",
  "..OYYYYYYO..",
  "...OOOOOO...",
];
export const HIVE_COLORS: Record<string, string> = {
  O: "#68482e",
  Y: "#dfa041",
  L: "#f4c96a",
};
export const BEE = [
  "..OO....OO..",
  ".OWWO..OWWO.",
  ".OWWWOOWWWO.",
  "..OOOOOOOO..",
  ".OYYOOYYOO..",
  "OYYYOOYYYO..",
  "OYYYOOYYOKO.",
  ".OYYOOYYOO..",
  "..OOOOOO....",
  "....O..O....",
];
export const BEE_COLORS: Record<string, string> = {
  O: "#4c4133",
  W: "#e9f3ed",
  Y: "#f0c84d",
  K: "#fff4d0",
};
export function sprite(
  ctx: CanvasRenderingContext2D,
  rows: string[],
  colors: Record<string, string>,
  x: number,
  y: number,
  flip = false,
) {
  rows.forEach((row, iy) => {
    for (let ix = 0; ix < row.length; ix++) {
      const color = colors[row[ix]];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(
          Math.round(x + (flip ? row.length - ix - 1 : ix)),
          Math.round(y + iy),
          1,
          1,
        );
      }
    }
  });
}
