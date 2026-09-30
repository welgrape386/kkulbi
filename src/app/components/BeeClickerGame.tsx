import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import beeImg from "../../imports/kkulbi1.webp";
import {
  LeaderboardPanel,
  readSavedNickname,
  saveNickname,
  submitScore,
  useLeaderboard,
} from "./BeeLeaderboard";

// ─── 꿀 채집 게임 ─────────────────────────────────────────────────────────────
// 꿀방울을 누르면 점수(콤보 배율), 꿀벌을 누르면 쏘여서 체력 -1 · 콤보 초기화.
// 제한시간 또는 체력 0 중 먼저 오는 쪽에서 종료. 뒤로 갈수록 꿀벌이 많고 빨라집니다.

const GAME_MS = 25_000;
const MAX_HEALTH = 3;
const HIGH_SCORE_KEY = "kkulbi-bee-highscore";

// 벌집 타일 (전환 연출과 공유)
export const HEX_W = 64;
export const HEX_H = HEX_W * 1.1547; // 뾰족한 위쪽 육각형
// 밝은 크림색~연한 꿀색 범위(#F5E6C8 ~ #E8C875). 바깥(전환·모달 뒤)은 한 톤 진하게, 게임판은 더 연하게.
// 오브젝트보다 채도/명도가 낮게 유지해 꿀방울·꿀벌이 먼저 눈에 들어오도록 합니다.
const COMB_TONES = {
  outer: ["#ecd495", "#e8c875", "#eed99f", "#eacd84"],
  inner: ["#f5e6c8", "#f3e0b8", "#f4e3bf", "#f1dcae"],
};
export const COMB_GAP = { outer: "#c9a04e", inner: "#dcbd78" }; // 타일 사이 따뜻한 금갈색 밀랍 선
export function combTileBackground(tone: number, variant: "outer" | "inner" = "outer") {
  const tones = COMB_TONES[variant];
  const base = tones[Math.abs(tone) % tones.length];
  // 위쪽 옅은 하이라이트 + 아래쪽 아주 살짝 그림자로 입체감
  return `linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 38%, rgba(160,110,20,0) 70%, rgba(160,110,20,0.12) 100%), ${base}`;
}

type Cell = { x: number; y: number };
type Kind = "honey" | "golden" | "bee" | "queen" | "heart";
type Target = { id: number; cell: number; kind: Kind; state: "live" | "collected" | "stung" };
type Popup = { id: number; cell: number; text: string; tone: "good" | "gold" | "bad" };

// 4콤보마다 배율 +1 (최대 x8)
const MAX_MULTIPLIER = 8;
const comboMultiplier = (combo: number) => Math.min(MAX_MULTIPLIER, 1 + Math.floor(combo / 4));
// x1-2 연한 금색 → x3-4 금색 → x5-6 주황 → x7-8 붉은 분홍
const COMBO_COLORS = ["#d6b47a", "#fbbf24", "#fb923c", "#fb7185"];

// 오브젝트별 규칙: 기본 점수 / 피해 / 회복 / 머무는 시간(ms, d = 난이도 0→1)
const KINDS: Record<Kind, { points?: number; damage?: number; heal?: number; life: (d: number) => number; label: string }> = {
  honey: { points: 1, life: (d) => 1150 - 500 * d, label: "꿀방울" },
  golden: { points: 5, life: (d) => 850 - 300 * d, label: "황금 꿀방울" },
  bee: { damage: 1, life: (d) => 1400 - 450 * d, label: "꿀벌" },
  queen: { damage: 2, life: (d) => 1500 - 300 * d, label: "여왕벌" },
  heart: { heal: 1, life: () => 1000, label: "하트" },
};

// 난이도: 처음 15초는 완만하게(0→0.3), 마지막 10초에 가파르게(0.3→1)
function difficulty(progress: number) {
  const calm = 0.6;
  return progress < calm ? (progress / calm) * 0.3 : 0.3 + ((progress - calm) / (1 - calm)) * 0.7;
}

// 황금 5% · 하트 3%(체력이 깎였을 때만) · 여왕벌 2~6%(초반 제외) · 꿀벌 16%→56% · 나머지 꿀방울
function pickKind(d: number, canHeal: boolean): Kind {
  const r = Math.random();
  const golden = 0.05;
  const heart = canHeal ? 0.03 : 0;
  const queen = d > 0.2 ? 0.02 + 0.04 * d : 0;
  const bee = 0.16 + 0.4 * d;
  if (r < golden) return "golden";
  if (r < golden + heart) return "heart";
  if (r < golden + heart + queen) return "queen";
  if (r < golden + heart + queen + bee) return "bee";
  return "honey";
}

function readHighScore() {
  try {
    return Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveHighScore(score: number) {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    // 저장이 막힌 환경(시크릿 모드 등)에서는 이번 판 기록만 보여줍니다.
  }
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// 쏘임 효과음: 효과음 파일 없이 Web Audio로 짧게 생성
let audioCtx: AudioContext | null = null;
function unlockAudio() {
  try {
    audioCtx ??= new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();
  } catch {
    audioCtx = null;
  }
}
function playSting() {
  if (!audioCtx) return;
  try {
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(620, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.18);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.21);
  } catch {
    // 소리가 안 나도 게임은 계속됩니다.
  }
}

// 게임판 크기에 맞춰 벌집 칸 좌표 계산 (playable = 판 안에 온전히 들어오는 칸)
function useCombCells() {
  const ref = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<{ all: Cell[]; playable: number[] }>({ all: [], playable: [] });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const build = () => {
      const { width, height } = el.getBoundingClientRect();
      const all: Cell[] = [];
      const playable: number[] = [];
      for (let row = -1; row * HEX_H * 0.75 < height; row++) {
        for (let col = -1; col * HEX_W < width; col++) {
          const x = col * HEX_W + (row % 2 ? HEX_W / 2 : 0);
          const y = row * HEX_H * 0.75;
          if (x >= 0 && y >= 0 && x + HEX_W <= width && y + HEX_H <= height) playable.push(all.length);
          all.push({ x, y });
        }
      }
      setLayout({ all, playable });
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, ...layout };
}

export function BeeClickerGame({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [health, setHealth] = useState(MAX_HEALTH);
  const [timeLeft, setTimeLeft] = useState(GAME_MS);
  const [targets, setTargets] = useState<Target[]>([]);
  const [popups, setPopups] = useState<Popup[]>([]);
  const [flashKey, setFlashKey] = useState(0); // 붉은 플래시 재시작용
  const [endReason, setEndReason] = useState<"time" | "health">("time");
  const [highScore, setHighScore] = useState(readHighScore);
  const [newRecord, setNewRecord] = useState(false);

  const board = useCombCells();
  const boardRef = useRef(board);
  boardRef.current = board;

  // 타이머 콜백에서 최신 값을 읽기 위한 ref
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const healthRef = useRef(MAX_HEALTH);
  const liveRef = useRef(false);
  const targetsRef = useRef<Target[]>([]);
  targetsRef.current = targets;
  const nextId = useRef(0);

  // ─── 랭킹 ───
  const { entries, refresh } = useLeaderboard(15_000);
  const [myNickname, setMyNickname] = useState(readSavedNickname);
  const [nicknameInput, setNicknameInput] = useState("");
  const [submit, setSubmit] = useState<{ sending: boolean; message: string | null }>({
    sending: false,
    message: null,
  });

  const register = async (nickname: string) => {
    setSubmit({ sending: true, message: null });
    const result = await submitScore(nickname, Math.min(9999, scoreRef.current));
    if (!result.ok) {
      setSubmit({ sending: false, message: result.error });
      return;
    }
    saveNickname(result.nickname);
    setMyNickname(result.nickname);
    setSubmit({
      sending: false,
      message: result.updated
        ? `랭킹에 반영됐어요! (최고 ${result.best}점)`
        : `기존 기록(${result.best}점)이 더 높아서 그대로 유지돼요.`,
    });
    refresh();
  };

  // 게임이 끝나면 최신 랭킹을 다시 불러오고, 등록한 적이 있으면 자동으로 갱신 시도
  useEffect(() => {
    if (phase !== "over") return;
    if (myNickname) register(myNickname);
    else refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const finish = (reason: "time" | "health") => {
    if (!liveRef.current) return;
    liveRef.current = false;
    setEndReason(reason);
    setTargets([]);
    const final = scoreRef.current;
    if (final > readHighScore()) {
      saveHighScore(final);
      setHighScore(final);
      setNewRecord(true);
    }
    setPhase("over");
  };
  const finishRef = useRef(finish);
  finishRef.current = finish;

  // ─── 게임 루프 ───
  useEffect(() => {
    if (phase !== "playing") return;
    const startAt = Date.now();
    const endAt = startAt + GAME_MS;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        timers.delete(t);
        fn();
      }, ms);
      timers.add(t);
    };

    const spawn = () => {
      if (!liveRef.current) return;
      const d = difficulty(Math.min(1, (Date.now() - startAt) / GAME_MS));
      const { playable } = boardRef.current;
      const busy = new Set(targetsRef.current.map((t) => t.cell));
      const free = playable.filter((c) => !busy.has(c));
      // 후반엔 한 번에 2~3개씩 등장
      const count = 1 + (d > 0.45 ? 1 : 0) + (d > 0.75 && Math.random() < 0.6 ? 1 : 0);
      for (let n = 0; n < count && free.length > 0; n++) {
        const id = nextId.current++;
        const kind = pickKind(d, healthRef.current < MAX_HEALTH);
        const cell = free.splice(Math.floor(Math.random() * free.length), 1)[0];
        setTargets((ts) => [...ts, { id, cell, kind, state: "live" }]);
        later(() => setTargets((ts) => ts.filter((t) => t.id !== id || t.state !== "live")), KINDS[kind].life(d));
      }
      later(spawn, 520 - 320 * d + Math.random() * 140);
    };
    spawn();

    const tick = setInterval(() => {
      const left = Math.max(0, endAt - Date.now());
      setTimeLeft(left);
      if (left === 0) finishRef.current("time");
    }, 100);

    return () => {
      clearInterval(tick);
      timers.forEach(clearTimeout);
    };
  }, [phase]);

  const start = () => {
    unlockAudio(); // 브라우저 정책상 사용자 클릭 시점에 오디오를 켜 둡니다
    scoreRef.current = 0;
    comboRef.current = 0;
    healthRef.current = MAX_HEALTH;
    liveRef.current = true;
    setScore(0);
    setCombo(0);
    setHealth(MAX_HEALTH);
    setTimeLeft(GAME_MS);
    setTargets([]);
    setPopups([]);
    setNewRecord(false);
    setSubmit({ sending: false, message: null });
    setPhase("playing");
  };

  const showPopup = (cell: number, text: string, tone: Popup["tone"]) => {
    const id = nextId.current++;
    setPopups((ps) => [...ps, { id, cell, text, tone }]);
    setTimeout(() => setPopups((ps) => ps.filter((p) => p.id !== id)), 650);
  };

  const hit = (target: Target) => {
    if (!liveRef.current || target.state !== "live") return;
    const rule = KINDS[target.kind];
    const markAndRemove = (state: Target["state"]) => {
      setTargets((ts) => ts.map((t) => (t.id === target.id ? { ...t, state } : t)));
      setTimeout(() => setTargets((ts) => ts.filter((t) => t.id !== target.id)), 420);
    };

    if (rule.points) {
      comboRef.current += 1;
      const gained = rule.points * comboMultiplier(comboRef.current);
      scoreRef.current += gained;
      setScore(scoreRef.current);
      setCombo(comboRef.current);
      showPopup(target.cell, `+${gained}`, target.kind === "golden" ? "gold" : "good");
      markAndRemove("collected");
      return;
    }

    if (rule.heal) {
      healthRef.current = Math.min(MAX_HEALTH, healthRef.current + rule.heal);
      setHealth(healthRef.current);
      showPopup(target.cell, "+❤️", "good");
      markAndRemove("collected");
      return;
    }

    // 쏘임: 체력 감소, 콤보 초기화, 흔들림 + 붉은 플래시 + 텍스트 + 효과음/진동
    const isQueen = target.kind === "queen";
    comboRef.current = 0;
    healthRef.current = Math.max(0, healthRef.current - (rule.damage ?? 1));
    setCombo(0);
    setHealth(healthRef.current);
    setFlashKey((k) => k + 1);
    showPopup(target.cell, isQueen ? "으악! 여왕벌!" : "따끔!", "bad");
    playSting();
    try {
      navigator.vibrate?.(isQueen ? [120, 60, 180] : 150);
    } catch {
      // 진동 미지원 기기
    }
    if (!prefersReducedMotion()) {
      const px = isQueen ? 10 : 6;
      board.ref.current?.animate(
        [
          { transform: "translate(0, 0)" },
          { transform: `translate(-${px}px, 2px)` },
          { transform: `translate(${px}px, -2px)` },
          { transform: `translate(-${px * 0.6}px, 1px)` },
          { transform: "translate(0, 0)" },
        ],
        { duration: isQueen ? 420 : 300, easing: "ease-out" },
      );
    }
    markAndRemove("stung");
    if (healthRef.current <= 0) setTimeout(() => finishRef.current("health"), 450);
  };

  const seconds = Math.ceil(timeLeft / 1000);
  const multiplier = comboMultiplier(combo);
  const showFullHearts = phase === "ready";

  return (
    <div
      className="kb-game-in absolute inset-0 flex items-center justify-center p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="꿀 채집 게임"
    >
      <style>{GAME_CSS}</style>
      <div
        className="relative w-full flex flex-col rounded-3xl overflow-hidden"
        style={{
          maxWidth: "980px",
          height: "min(90vh, 640px)",
          background: COMB_GAP.inner,
          border: "2px solid #c9a55a",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.45)",
        }}
      >
        {/* HUD: 체력 | 남은 시간 | 점수·콤보 | 닫기 */}
        <div
          className="flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-2.5"
          style={{ background: "linear-gradient(to bottom, #4b3a26, #3d2f1f)", borderBottom: "1px solid #c9a55a" }}
        >
          <div className="flex items-center gap-0.5" role="img" aria-label={`체력 ${health}/${MAX_HEALTH}`}>
            {Array.from({ length: MAX_HEALTH }, (_, i) => {
              const alive = showFullHearts || i < health;
              return (
                <span
                  key={`${i}-${alive}`}
                  className={alive ? "" : "kb-heart-lost"}
                  style={{ fontSize: "20px", filter: alive ? "none" : "grayscale(1)", opacity: alive ? 1 : 0.35 }}
                >
                  ❤️
                </span>
              );
            })}
          </div>

          <div className="flex-1 flex justify-center">
            {phase === "playing" && (
              <span
                className="rounded-full px-3 py-0.5"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  color: seconds <= 5 ? "#fca5a5" : "#fde68a",
                  fontSize: "15px",
                  fontWeight: 900,
                }}
              >
                ⏱️ {seconds}초
              </span>
            )}
          </div>

          <div className="text-right leading-none">
            <div style={{ color: "#fde68a", fontSize: "26px", fontWeight: 900 }}>{score}</div>
            <div
              key={combo}
              className={combo >= 4 ? "kb-combo-pop" : ""}
              style={{
                color: COMBO_COLORS[Math.min(COMBO_COLORS.length - 1, Math.floor((multiplier - 1) / 2))],
                fontSize: `${11 + Math.min(combo, 24) * 0.4}px`,
                fontWeight: 900,
                transformOrigin: "right center",
              }}
            >
              {combo > 0 ? `콤보 ${combo} · x${multiplier}` : "점수"}
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="게임 닫기"
            className="p-1.5 rounded-xl hover:bg-white/10 transition-colors"
            style={{ color: "#fde68a" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 타이머 막대 */}
        <div className="h-1.5" style={{ background: "#b8923f" }}>
          {phase === "playing" && (
            <div
              className="h-full"
              style={{
                width: `${(timeLeft / GAME_MS) * 100}%`,
                background: seconds <= 5 ? "#ef4444" : "linear-gradient(90deg, #f59e0b, #fde047)",
                transition: "width 100ms linear",
              }}
            />
          )}
        </div>

        <div className="flex-1 min-h-0 flex flex-col md:flex-row">
          {/* 벌집 게임판 */}
          <div
            ref={board.ref}
            className="relative flex-1 min-h-0 overflow-hidden select-none"
            style={{ touchAction: "manipulation", background: COMB_GAP.inner }}
          >
            {board.all.map((c, i) => (
              <div
                key={i}
                className="kb-cell absolute"
                style={{ left: c.x, top: c.y, width: HEX_W, height: HEX_H, background: combTileBackground(i * 5 + (i >> 3), "inner") }}
              />
            ))}

            {phase === "playing" &&
              targets.map((t) => {
                const c = board.all[t.cell];
                if (!c) return null;
                return (
                  <button
                    key={t.id}
                    onPointerDown={() => hit(t)}
                    aria-label={KINDS[t.kind].label}
                    className="absolute flex items-center justify-center"
                    style={{ left: c.x, top: c.y, width: HEX_W, height: HEX_H, WebkitTapHighlightColor: "transparent" }}
                  >
                    <span className={`kb-cell absolute inset-0 kb-glow-${t.kind} ${t.state === "live" ? "kb-glow-in" : "kb-glow-out"}`} />
                    <span
                      className={`relative ${
                        t.state === "collected" ? "kb-collect" : t.state === "stung" ? "kb-stung" : "kb-appear"
                      }`}
                    >
                      <TargetIcon kind={t.kind} />
                      {t.state === "collected" && (
                        <span className="kb-sparkle" aria-hidden="true">
                          ✨
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}

            {popups.map((p) => {
              const c = board.all[p.cell];
              if (!c) return null;
              return (
                <span
                  key={p.id}
                  className="kb-popup absolute pointer-events-none"
                  style={{
                    left: c.x + HEX_W / 2,
                    top: c.y + 4,
                    color: p.tone === "bad" ? "#dc2626" : p.tone === "gold" ? "#ca8a04" : "#b45309",
                    fontSize: p.tone === "gold" ? "22px" : "18px",
                    fontWeight: 900,
                    whiteSpace: "nowrap",
                    textShadow: "0 0 3px #fff, 0 1px 2px #fff",
                  }}
                >
                  {p.text}
                </span>
              );
            })}

            {/* 쏘였을 때 붉은 플래시 */}
            {flashKey > 0 && <div key={flashKey} className="kb-flash absolute inset-0 pointer-events-none" />}

            {phase === "ready" && (
              <Panel>
                <div className="flex justify-center items-end gap-2 mb-3">
                  <HoneyDrop />
                  <img src={beeImg} alt="" className="w-14 h-14" draggable={false} />
                </div>
                <div className="text-amber-900 mb-2" style={{ fontSize: "22px", fontWeight: 900 }}>
                  꿀을 모아라!
                </div>
                <ul className="text-slate-700 mb-2 space-y-1 text-left inline-block" style={{ fontSize: "13px", lineHeight: 1.6 }}>
                  <li>
                    🍯 <strong>꿀방울</strong> 1점 · 반짝이는 <strong>황금 꿀방울</strong> 5점
                  </li>
                  <li>
                    🐝 <strong>꿀벌</strong>은 ❤️ -1, 👑 <strong>여왕벌</strong>은 ❤️ -2!
                  </li>
                  <li>
                    ❤️ 가끔 나오는 <strong>하트</strong>로 체력 회복
                  </li>
                  <li>
                    🔥 연속으로 모으면 <strong>콤보 배율</strong> 상승 (최대 x{MAX_MULTIPLIER})
                  </li>
                  <li>
                    ⏱️ {GAME_MS / 1000}초가 지나거나 ❤️ {MAX_HEALTH}개를 모두 잃으면 끝!
                  </li>
                </ul>
                <p className="text-amber-800 mb-4" style={{ fontSize: "12px", fontWeight: 700 }}>
                  최고 기록: {highScore}점
                </p>
                <PrimaryButton onClick={start}>시작하기</PrimaryButton>
              </Panel>
            )}

            {phase === "over" && (
              <Panel>
                <div className="text-4xl mb-1">{newRecord ? "🏆" : endReason === "health" ? "🐝" : "🍯"}</div>
                <div className="text-slate-600" style={{ fontSize: "13px", fontWeight: 700 }}>
                  {endReason === "health" ? "벌에게 너무 많이 쏘였어요!" : "시간 종료!"}
                </div>
                <div className="text-amber-900" style={{ fontSize: "40px", fontWeight: 900, lineHeight: 1.2 }}>
                  {score}점
                </div>
                {newRecord && (
                  <div className="text-orange-700" style={{ fontSize: "13px", fontWeight: 800 }}>
                    새로운 최고 기록!
                  </div>
                )}
                <p className="text-amber-800 mb-4" style={{ fontSize: "13px", fontWeight: 700 }}>
                  최고 기록: {highScore}점
                </p>

                {/* 랭킹 등록 */}
                <div className="mb-4 rounded-xl p-3 text-left" style={{ background: "#fdf3d7", border: "1px solid #e8c56a" }}>
                  {myNickname ? (
                    <p className="text-amber-900" style={{ fontSize: "12px", lineHeight: 1.6 }}>
                      이미 <strong>{myNickname}</strong>(으)로 등록했어요. 이번 점수가 더 높으면 자동 갱신됩니다.
                    </p>
                  ) : (
                    <form
                      className="flex gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (nicknameInput.trim()) register(nicknameInput);
                      }}
                    >
                      <input
                        value={nicknameInput}
                        onChange={(e) => setNicknameInput(e.target.value)}
                        maxLength={12}
                        placeholder="닉네임 (최대 12자)"
                        aria-label="랭킹 닉네임"
                        className="flex-1 min-w-0 rounded-xl border-2 border-amber-300 bg-white px-3 py-2 text-slate-700 placeholder-slate-500 outline-none focus:border-amber-500"
                        style={{ fontSize: "13px" }}
                      />
                      <button
                        type="submit"
                        disabled={submit.sending || !nicknameInput.trim()}
                        className="flex-shrink-0 rounded-xl px-3 py-2 disabled:opacity-50"
                        style={{
                          background: "linear-gradient(135deg, #f5c842, #f59e0b)",
                          color: "#1a1200",
                          fontSize: "13px",
                          fontWeight: 800,
                        }}
                      >
                        랭킹 등록하기
                      </button>
                    </form>
                  )}
                  {(submit.sending || submit.message) && (
                    <p className="mt-2 text-amber-800" style={{ fontSize: "12px", fontWeight: 700 }}>
                      {submit.sending ? "등록 중…" : submit.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 justify-center">
                  <PrimaryButton onClick={start}>다시하기</PrimaryButton>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-white border-2 border-amber-300 text-amber-800 hover:bg-amber-50 transition-colors"
                    style={{ fontSize: "14px", fontWeight: 700 }}
                  >
                    닫기
                  </button>
                </div>
              </Panel>
            )}
          </div>

          {/* 실시간 랭킹 (모바일: 게임 중에는 숨겨 게임판을 넓게) */}
          <aside
            className={`${phase === "playing" ? "hidden md:flex" : "flex"} flex-col md:w-64 max-h-[40%] md:max-h-none border-t-2 md:border-t-0 md:border-l-2`}
            style={{ background: "#fbf5e6", borderColor: "#c9a55a" }}
          >
            <LeaderboardPanel entries={entries} myNickname={myNickname} />
          </aside>
        </div>
      </div>
    </div>
  );
}

function TargetIcon({ kind }: { kind: Kind }) {
  if (kind === "honey") return <HoneyDrop />;
  if (kind === "golden") return <HoneyDrop golden />;
  if (kind === "heart") return <span className="kb-beat inline-block" style={{ fontSize: "34px", lineHeight: 1 }}>❤️</span>;
  return (
    <span className="kb-fly relative inline-block" style={{ fontSize: kind === "queen" ? "42px" : "36px", lineHeight: 1 }}>
      🐝
      {kind === "queen" && (
        <span className="absolute left-1/2 -translate-x-1/2" style={{ top: "-14px", fontSize: "18px" }}>
          👑
        </span>
      )}
    </span>
  );
}

function HoneyDrop({ golden = false }: { golden?: boolean }) {
  const gradientId = "kb-honey" + useId().replace(/:/g, "");
  return (
    <svg
      width="34"
      height="42"
      viewBox="0 0 34 42"
      aria-hidden="true"
      className={golden ? "kb-golden" : ""}
      style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))" }}
    >
      <defs>
        <radialGradient id={gradientId} cx="38%" cy="55%" r="65%">
          <stop offset="0%" stopColor={golden ? "#ffffff" : "#fff3b0"} />
          <stop offset="45%" stopColor={golden ? "#fde047" : "#fbbf24"} />
          <stop offset="100%" stopColor={golden ? "#eab308" : "#c2690a"} />
        </radialGradient>
      </defs>
      <path d="M17 2 C 17 2, 3 19, 3 27 A 14 14 0 0 0 31 27 C 31 19, 17 2, 17 2 Z" fill={`url(#${gradientId})`} stroke={golden ? "#a16207" : "#9a4f06"} strokeWidth="1.5" />
      <ellipse cx="11.5" cy="25" rx="3" ry="5" fill="rgba(255,255,255,0.7)" transform="rotate(-20 11.5 25)" />
    </svg>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-3 overflow-y-auto" style={{ background: "rgba(150, 100, 20, 0.22)" }}>
      <div
        className="kb-appear rounded-2xl px-5 py-5 text-center w-full max-w-sm"
        style={{
          background: "linear-gradient(to bottom, #fffbeb, #fdf3d7)",
          border: "2px solid #d4a017",
          boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PrimaryButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 rounded-xl transition-shadow hover:shadow-md"
      style={{
        background: "linear-gradient(135deg, #f5c842, #f59e0b)",
        color: "#1a1200",
        fontSize: "14px",
        fontWeight: 800,
      }}
    >
      {children}
    </button>
  );
}

const GAME_CSS = `
.kb-cell { clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); transform: scale(0.97); }
@keyframes kb-game-in { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: none; } }
.kb-game-in { animation: kb-game-in 220ms ease-out; }

.kb-glow-honey { background: radial-gradient(circle at 50% 45%, #fffbe6 0%, #fde68a 55%, #f5c842 100%); }
.kb-glow-golden { background: radial-gradient(circle at 50% 45%, #ffffff 0%, #fef08a 40%, #facc15 100%); box-shadow: 0 0 0 2px #facc15; }
.kb-glow-bee { background: radial-gradient(circle at 50% 45%, #fff1e6 0%, #fdba74 55%, #f97316 100%); }
.kb-glow-queen { background: radial-gradient(circle at 50% 45%, #ffe4e6 0%, #fb7185 50%, #be123c 100%); }
.kb-glow-heart { background: radial-gradient(circle at 50% 45%, #fff1f2 0%, #fecdd3 55%, #fda4af 100%); }
@keyframes kb-golden { 0%,100% { filter: drop-shadow(0 0 2px #fde047) brightness(1); } 50% { filter: drop-shadow(0 0 10px #facc15) brightness(1.25); } }
.kb-golden { animation: kb-golden 500ms ease-in-out infinite; }
@keyframes kb-beat { 0%,100% { transform: scale(1); } 30% { transform: scale(1.18); } }
.kb-beat { animation: kb-beat 600ms ease-in-out infinite; }
@keyframes kb-combo-pop { 0% { transform: scale(1.35); } 100% { transform: scale(1); } }
.kb-combo-pop { animation: kb-combo-pop 220ms ease-out; }
@keyframes kb-glow-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1.02); } }
.kb-glow-in { animation: kb-glow-in 180ms ease-out forwards; }
@keyframes kb-glow-out { from { opacity: 1; transform: scale(1.02); } to { opacity: 0; transform: scale(0.9); } }
.kb-glow-out { animation: kb-glow-out 380ms ease-out forwards; }

@keyframes kb-appear { 0% { transform: scale(0); opacity: 0; } 70% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); } }
.kb-appear { animation: kb-appear 200ms ease-out; }
@keyframes kb-collect { 0% { transform: scale(1); opacity: 1; } 35% { transform: scale(1.45); opacity: 1; } 100% { transform: scale(0.3) translateY(-10px); opacity: 0; } }
.kb-collect { animation: kb-collect 400ms ease-out forwards; }
@keyframes kb-stung { 0% { transform: scale(1.2) rotate(0); } 30% { transform: scale(1.3) rotate(-15deg); } 60% { transform: scale(1.2) rotate(15deg); } 100% { transform: scale(0.4); opacity: 0; } }
.kb-stung { animation: kb-stung 400ms ease-out forwards; }
@keyframes kb-fly { 0%,100% { transform: translateX(-3px) rotate(-8deg); } 50% { transform: translateX(3px) rotate(8deg); } }
.kb-fly { animation: kb-fly 260ms ease-in-out infinite; }

.kb-sparkle { position: absolute; left: 50%; top: -6px; font-size: 18px; animation: kb-sparkle 400ms ease-out forwards; }
@keyframes kb-sparkle { from { opacity: 1; transform: translate(-50%, 0) scale(0.6); } to { opacity: 0; transform: translate(-50%, -14px) scale(1.3); } }
@keyframes kb-popup { from { opacity: 1; transform: translate(-50%, 0); } to { opacity: 0; transform: translate(-50%, -32px); } }
.kb-popup { animation: kb-popup 650ms ease-out forwards; }

@keyframes kb-flash { from { background: rgba(220, 38, 38, 0.45); } to { background: rgba(220, 38, 38, 0); } }
.kb-flash { animation: kb-flash 350ms ease-out forwards; }
@keyframes kb-heart-lost { 0% { transform: scale(1.5); } 100% { transform: scale(1); } }
.kb-heart-lost { display: inline-block; animation: kb-heart-lost 300ms ease-out; }

@media (prefers-reduced-motion: reduce) {
  .kb-game-in, .kb-appear, .kb-collect, .kb-stung, .kb-fly, .kb-sparkle, .kb-popup, .kb-flash,
  .kb-glow-in, .kb-glow-out, .kb-heart-lost, .kb-golden, .kb-beat, .kb-combo-pop { animation-duration: 1ms; animation-iteration-count: 1; }
}
`;
