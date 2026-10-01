import type { SoundEvent } from "./events";

// 꿀도둑 배경음악·효과음. 음원 파일 없이 Web Audio로 8비트(칩튠) 소리를 직접 만듭니다.
// 브라우저 정책상 사용자가 버튼을 누른 순간 unlock()을 불러야 소리가 납니다.

const MUTE_KEY = "kkulbi-honey-muted";

let ctx: AudioContext | null = null;
let master: GainNode, musicBus: GainNode, sfxBus: GainNode;

function readMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}
let muted = readMuted();

export function isMuted() {
  return muted;
}

export function setMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(MUTE_KEY, value ? "1" : "0");
  } catch {
    // 저장이 막혀도 이번 판에는 적용됩니다.
  }
  if (ctx) master.gain.setTargetAtTime(value ? 0 : 1, ctx.currentTime, 0.02);
}

export function unlock() {
  try {
    if (!ctx) {
      ctx = new AudioContext();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 1;
      master.connect(ctx.destination);
      musicBus = ctx.createGain();
      musicBus.gain.value = 0.07;
      musicBus.connect(master);
      sfxBus = ctx.createGain();
      sfxBus.gain.value = 0.16;
      sfxBus.connect(master);
    }
    if (ctx.state === "suspended") ctx.resume();
  } catch {
    ctx = null; // 오디오 미지원 환경: 조용히 게임만 진행
  }
}

// 음 하나: 주파수에서 시작해(필요하면 slideTo까지 미끄러지며) 짧게 감쇠
function tone(
  bus: GainNode,
  type: OscillatorType,
  freq: number,
  at: number,
  length: number,
  volume = 1,
  slideTo?: number,
) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, at + length);
  gain.gain.setValueAtTime(volume, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length);
  osc.connect(gain).connect(bus);
  osc.start(at);
  osc.stop(at + length + 0.02);
}

const note = (semitonesFromA4: number) => 440 * 2 ** (semitonesFromA4 / 12);
// 자주 쓰는 음 (A4 기준 반음 수)
const C5 = 3, D5 = 5, E5 = 7, G5 = 10, A5 = 12, C6 = 15;

// ─── 효과음 ─────────────────────────────────────────────────────────────────
const SFX: Record<SoundEvent | "start" | "end", (t: number) => void> = {
  harvest: (t) => {
    // 쪼르륵 올라가는 세 음
    [C5, E5, G5].forEach((n, i) => tone(sfxBus, "triangle", note(n), t + i * 0.06, 0.12, 0.9));
  },
  sell: (t) => {
    // 동전 소리
    tone(sfxBus, "square", note(A5), t, 0.08, 0.5);
    tone(sfxBus, "square", note(C6 + 4), t + 0.08, 0.25, 0.5);
  },
  sting: (t) => {
    tone(sfxBus, "sawtooth", 640, t, 0.2, 0.8, 150);
  },
  alert: (t) => {
    // 벌이 알아챘을 때 '삐익!'
    tone(sfxBus, "square", note(E5), t, 0.07, 0.45);
    tone(sfxBus, "square", note(A5), t + 0.08, 0.12, 0.45);
  },
  escape: (t) => {
    // 수풀로 따돌림: 내려가는 휘파람
    tone(sfxBus, "triangle", 900, t, 0.25, 0.6, 450);
  },
  faint: (t) => {
    [G5, E5, C5, -2].forEach((n, i) => tone(sfxBus, "triangle", note(n), t + i * 0.13, 0.2, 0.8));
  },
  thief: (t) => {
    // 살금살금 반음 내려가는 두 음
    tone(sfxBus, "triangle", note(E5), t, 0.12, 0.7);
    tone(sfxBus, "triangle", note(E5 - 1), t + 0.14, 0.12, 0.7);
    tone(sfxBus, "triangle", note(E5), t + 0.28, 0.12, 0.7);
    tone(sfxBus, "triangle", note(E5 - 1), t + 0.42, 0.18, 0.7);
  },
  catch: (t) => {
    // 검거 팡파르
    [C5, E5, G5, C6, G5, C6].forEach((n, i) =>
      tone(sfxBus, "square", note(n), t + i * 0.07, i === 5 ? 0.35 : 0.1, 0.5),
    );
  },
  stolen: (t) => {
    tone(sfxBus, "square", note(G5), t, 0.15, 0.4, note(C5 - 5));
    tone(sfxBus, "square", note(E5), t + 0.18, 0.3, 0.4, note(C5 - 9));
  },
  start: (t) => {
    [C5, E5, G5, C6].forEach((n, i) => tone(sfxBus, "square", note(n), t + i * 0.07, 0.12, 0.4));
  },
  end: (t) => {
    [G5, E5, G5, C6].forEach((n, i) => tone(sfxBus, "triangle", note(n), t + i * 0.15, i === 3 ? 0.5 : 0.18, 0.9));
  },
};

export function playSfx(name: keyof typeof SFX) {
  if (!ctx || muted) return;
  SFX[name](ctx.currentTime + 0.01);
}

// ─── 배경음악 ───────────────────────────────────────────────────────────────
// null = 쉼표. stepsPerBeat: 2 = 8분음표, 4 = 16분음표.
type Song = {
  bpm: number;
  stepsPerBeat: number;
  melody: (number | null)[];
  bass: (number | null)[];
  bassWave: OscillatorType;
  hihat: boolean;
};
const _ = null;

// 평소: 느긋한 C장조
const CALM: Song = {
  bpm: 112,
  stepsPerBeat: 2,
  melody: [C5, _, E5, G5, A5, _, G5, E5, D5, _, E5, _, C5, _, _, _, C5, _, E5, G5, A5, _, C6, A5, G5, _, E5, D5, C5, _, _, _],
  bass: [-21, _, _, _, -16, _, _, _, -19, _, _, _, -14, _, _, _],
  bassWave: "triangle",
  hihat: false,
};

// 추격: A단조 Am → F → G → E(G#로 긴장), 16분음표 아르페지오로 "우다다다" + 8분 베이스 펄스 + 하이햇
const F5n = 8, G5n = 10, B5n = 14, Gs5 = 11;
const TENSE: Song = {
  bpm: 160,
  stepsPerBeat: 4,
  melody: [
    A5, E5, C5, E5, A5, E5, C5, E5, //   Am
    A5, F5n, C5, F5n, A5, F5n, C5, F5n, // F
    B5n, G5n, D5, G5n, B5n, G5n, D5, G5n, // G
    B5n, Gs5, E5, Gs5, B5n, Gs5, E5, Gs5, // E (G# → 처음의 A로 해결)
  ],
  bass: [
    -24, _, -24, _, -24, _, -24, _,
    -28, _, -28, _, -28, _, -28, _,
    -26, _, -26, _, -26, _, -26, _,
    -29, _, -29, _, -29, _, -29, _,
  ],
  bassWave: "square",
  hihat: true,
};

// 하이햇: 아주 짧은 노이즈
let noise: AudioBuffer | null = null;
function hihat(at: number) {
  if (!ctx) return;
  if (!noise) {
    noise = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const src = ctx.createBufferSource();
  const hp = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  src.buffer = noise;
  hp.type = "highpass";
  hp.frequency.value = 6000;
  gain.gain.setValueAtTime(0.35, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.04);
  src.connect(hp).connect(gain).connect(musicBus);
  src.start(at);
  src.stop(at + 0.05);
}

let timer: ReturnType<typeof setInterval> | null = null;
let step = 0;
let nextAt = 0;
let tense = false;

export function setTense(value: boolean) {
  if (value !== tense) step = 0; // 분위기가 바뀌면 새 곡의 첫 박부터
  tense = value;
}

export function startMusic() {
  if (!ctx || timer) return;
  step = 0;
  nextAt = ctx.currentTime + 0.05;
  // 25ms마다 0.12초 앞까지 미리 예약 (setInterval 지연에도 박자가 흔들리지 않게)
  timer = setInterval(() => {
    if (!ctx) return;
    while (nextAt < ctx.currentTime + 0.12) {
      const song = tense ? TENSE : CALM;
      const stepLength = 60 / song.bpm / song.stepsPerBeat;
      const m = song.melody[step % song.melody.length];
      const b = song.bass[step % song.bass.length];
      if (m !== null) tone(musicBus, "square", note(m), nextAt, stepLength * 0.85, 0.5);
      if (b !== null)
        tone(musicBus, song.bassWave, note(b), nextAt, stepLength * 1.8, song.bassWave === "square" ? 0.45 : 1);
      if (song.hihat) hihat(nextAt);
      nextAt += stepLength;
      step++;
    }
  }, 25);
}

export function stopMusic() {
  if (timer) clearInterval(timer);
  timer = null;
}
