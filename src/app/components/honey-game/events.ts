import type { World } from "./engine";

// 한 프레임 전후 상태를 비교해 효과음을 낼 사건을 찾아냅니다 (엔진은 건드리지 않음).
export type Snapshot = {
  honey: number;
  money: number;
  hp: number;
  chasing: number;
  thief: boolean;
  caught: number;
  stolen: number;
};
export type SoundEvent =
  | "harvest"
  | "sell"
  | "sting"
  | "faint"
  | "alert"
  | "escape"
  | "thief"
  | "catch"
  | "stolen";

export const snapshot = (w: World): Snapshot => ({
  honey: w.honey,
  money: w.money,
  hp: w.hp,
  chasing: w.bees.filter((b) => b.mode === "chase").length,
  thief: w.thief !== null,
  caught: w.caught,
  stolen: w.stolen,
});

export function soundEvents(before: Snapshot, after: Snapshot): SoundEvent[] {
  const events: SoundEvent[] = [];
  if (after.caught > before.caught) events.push("catch");
  else if (after.money > before.money) events.push("sell");
  else if (after.honey > before.honey) events.push("harvest");
  // 회복 아이템이 없으니 체력이 오르면 쓰러진 것 (엔진이 체력 3으로 되돌리고 꿀을 비움)
  const fainted = after.hp > before.hp;
  if (fainted) events.push("faint");
  else if (after.hp < before.hp) events.push("sting");
  if (after.chasing > before.chasing) events.push("alert");
  else if (!fainted && before.chasing > 0 && after.chasing === 0) events.push("escape");
  if (!before.thief && after.thief) events.push("thief");
  if (after.stolen > before.stolen) events.push("stolen");
  return events;
}
