import { useEffect, useRef, useState, type PointerEvent as CanvasPointerEvent } from "react";
import {
  LeaderboardPanel,
  readSavedNickname,
  saveNickname,
  submitScore,
  useLeaderboard,
} from "../BeeLeaderboard";
import {
  CAPACITY,
  HEIGHT,
  WIDTH,
  createWorld,
  distance,
  hidden,
  SHOP,
  THIEF_CATCH,
  catchThief,
  clickedThief,
  update,
} from "./engine";
import { draw } from "./render";
import { Joystick } from "./Joystick";
import { snapshot, soundEvents } from "./events";
import {
  isMuted,
  playSfx,
  setMuted,
  setTense,
  startMusic,
  stopMusic,
  unlock,
} from "./audio";
import "./honey-game.css";
export default function HoneyGame({ onClose }: { onClose: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const world = useRef(createWorld());
  const deadline = useRef(0);
  const keys = useRef(new Set<string>());
  const stick = useRef({ x: 0, y: 0 }); // 모바일 조이스틱 방향
  // 터치 기기 여부 (안내 문구용. 조이스틱 표시 자체는 CSS가 결정)
  const [touch] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches,
  );
  const [hud, setHud] = useState(() => ({ ...world.current }));
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [nickname, setNickname] = useState(() => readSavedNickname() ?? "");
  const [result, setResult] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [muted, setMutedState] = useState(isMuted);
  const { entries, refresh } = useLeaderboard(null);
  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    let frame = 0,
      last = performance.now(),
      lastHud = 0;
    function loop(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (phase === "playing") {
        world.current.remaining = Math.max(
          0,
          (deadline.current - Date.now()) / 1000,
        );
        const before = snapshot(world.current);
        update(world.current, keys.current, dt, stick.current);
        const after = snapshot(world.current);
        soundEvents(before, after).forEach(playSfx);
        setTense(after.chasing > 0);
      }
      draw(ctx!, world.current, now);
      if (now - lastHud > 80) {
        setHud({ ...world.current });
        lastHud = now;
      }
      if (phase === "playing" && world.current.remaining === 0) {
        setHud({ ...world.current });
        setPhase("done");
        stopMusic();
        playSfx("end");
        keys.current.clear();
        stick.current = { x: 0, y: 0 };
      }
      frame = requestAnimationFrame(loop);
    }
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [phase]);
  useEffect(() => {
    const clear = () => {
      keys.current.clear();
      stick.current = { x: 0, y: 0 };
    };
    const down = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).matches("input,button,textarea")) return;
      const k = e.key.toLowerCase();
      if (
        [
          "w",
          "a",
          "s",
          "d",
          "e",
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
        ].includes(k)
      ) {
        e.preventDefault();
        keys.current.add(k);
      }
    };
    const up = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
      clear();
      stopMusic(); // 게임 창을 닫으면 음악도 정지
    };
  }, []);
  function start() {
    unlock(); // 사용자 클릭 시점에 오디오 허용
    setTense(false);
    playSfx("start");
    startMusic();
    world.current = createWorld();
    deadline.current = Date.now() + 120_000;
    keys.current.clear();
    stick.current = { x: 0, y: 0 };
    setHud({ ...world.current });
    setResult("");
    setSubmitted(false);
    setPhase("playing");
    canvas.current?.focus();
  }
  // 캔버스 클릭/탭 위치를 맵 좌표(384×240)로 변환
  function toMap(e: CanvasPointerEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * WIDTH,
      y: ((e.clientY - r.top) / r.height) * HEIGHT,
    };
  }
  function clickCanvas(e: CanvasPointerEvent<HTMLCanvasElement>) {
    if (phase !== "playing" || !clickedThief(world.current, toMap(e))) return;
    if (catchThief(world.current)) playSfx("catch");
    else world.current.message = "도둑에게 더 가까이 가야 잡을 수 있어요!";
    setHud({ ...world.current });
  }
  async function register() {
    if (sending || submitted) return;
    setSending(true);
    try {
      const response = await submitScore(nickname, hud.money);
      if (response.ok) {
        saveNickname(response.nickname);
        setNickname(response.nickname);
        setResult(
          `최고 수입 ${response.best} 꿀머니${response.updated ? " · 새 기록!" : ""}`,
        );
        setSubmitted(true);
        await refresh();
      } else setResult(response.error);
    } finally {
      setSending(false);
    }
  }
  const near = distance(hud.player, SHOP) < 25;
  const thief = hud.thief;
  const prompt = thief && distance(hud.player, thief) < THIEF_CATCH
    ? touch
      ? "지금! 도둑을 탭하거나 채집 버튼으로 잡기"
      : "지금! E 또는 도둑 클릭으로 잡기"
    : thief
      ? thief.mode === "escape"
        ? "도둑이 꿀머니를 들고 달아나요! 앞질러 막으세요"
        : "도둑 출현! 쫓아가서 잡으면 +100 꿀머니"
      : near
    ? touch
      ? "판매 버튼 · 꿀 전부 판매"
      : "E · 꿀 전부 판매"
    : hud.honey === CAPACITY
      ? "가방이 꽉 찼어요. 상점으로!"
      : hud.hives.some((h) => h.cooldown === 0 && distance(hud.player, h) < 21)
        ? touch
          ? "채집 버튼을 꾹 눌러 벌집 채집"
          : "E를 꾹 눌러 벌집 채집"
        : hidden(hud.player)
          ? "수풀에 숨었어요"
          : touch
            ? "왼쪽 아래 조이스틱으로 이동"
            : "WASD / 방향키 · 이동";
  return (
    <section className="honey-game" aria-label="꿀도둑 게임">
      <header>
        <div>
          <small>꿀비의 숲 · 숨겨진 이야기</small>
          <h2>꿀도둑</h2>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => {
              setMuted(!muted);
              setMutedState(!muted);
            }}
            aria-label={muted ? "소리 켜기" : "소리 끄기"}
            aria-pressed={muted}
            title={muted ? "소리 켜기" : "소리 끄기"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <button onClick={onClose} aria-label="게임 닫기">
            닫기 ×
          </button>
        </div>
      </header>
      <div className="honey-layout">
        <div>
          <div className="honey-hud">
            <span aria-label={`체력 ${hud.hp}`}>
              {"♥".repeat(hud.hp)}
              {"♡".repeat(3 - hud.hp)}
            </span>
            <span>
              꿀 {hud.honey}/{CAPACITY}
            </span>
            <span>{hud.money} 꿀머니</span>
            <strong>
              {Math.floor(Math.ceil(hud.remaining) / 60)}:
              {String(Math.ceil(hud.remaining) % 60).padStart(2, "0")}
            </strong>
          </div>
          <div className="honey-stage">
            <canvas
              ref={canvas}
              width={WIDTH}
              height={HEIGHT}
              tabIndex={0}
              onPointerDown={clickCanvas}
              onPointerMove={(e) => {
                // 잡을 수 있는 거리의 도둑 위에서는 손가락 커서
                const w = world.current;
                e.currentTarget.style.cursor =
                  w.thief && clickedThief(w, toMap(e)) && distance(w.player, w.thief) < THIEF_CATCH
                    ? "pointer"
                    : "";
              }}
              aria-label="숲 맵. WASD 또는 방향키 이동, E 채집과 판매."
            />
            {phase !== "playing" && (
              <div className="honey-curtain">
                <h3>
                  {phase === "ready"
                    ? "달콤한 냄새를 따라…"
                    : "오늘의 장사 끝!"}
                </h3>
                <p>
                  {phase === "ready"
                    ? "벌들 몰래 꿀을 모아 상점에 팔아보세요."
                    : "판매 수입 " + hud.money + " 꿀머니"}
                </p>
                <p>
                  한 판 2분 · 채집은 {touch ? "채집 버튼" : "E"}을 1.4초 꾹<br />
                  수풀에 숨기 · 쓰러지면 들고 있던 꿀만 잃어요.
                  <br />
                  상점을 노리는 도둑을 잡으면 +100 꿀머니!
                </p>
                {phase === "done" && (
                  <>
                    <label>
                      랭킹 닉네임
                      <input
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        maxLength={12}
                        placeholder="닉네임 1~12자"
                      />
                    </label>
                    <button
                      disabled={sending || submitted || !nickname.trim()}
                      onClick={register}
                    >
                      {sending
                        ? "등록 중…"
                        : submitted
                          ? "등록 완료"
                          : "수입 기록하기"}
                    </button>
                    <p role="status">{result}</p>
                  </>
                )}
                <button onClick={start}>
                  {phase === "ready" ? "숲으로 들어가기" : "한 번 더"}
                </button>
              </div>
            )}
          </div>
          <p className="honey-prompt">
            {phase === "playing"
              ? prompt
              : "판매한 꿀만 랭킹 수입으로 인정돼요."}
          </p>
          <p className="honey-message" role="status">
            {hud.message}
          </p>
          <div className="honey-controls">
            {[
              ["a", "←"],
              ["w", "↑"],
              ["s", "↓"],
              ["d", "→"],
              ["e", "채집 / 판매"],
            ].map(([key, label]) => (
              <button
                key={key}
                className={key === "e" ? "honey-action" : "honey-arrow"}
                disabled={phase !== "playing"}
                aria-label={label}
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.currentTarget.setPointerCapture(e.pointerId);
                  keys.current.add(key);
                }}
                onPointerUp={() => keys.current.delete(key)}
                onPointerCancel={() => keys.current.delete(key)}
                onLostPointerCapture={() => keys.current.delete(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <Joystick stick={stick} disabled={phase !== "playing"} />
        </div>
        <aside>
          <LeaderboardPanel entries={entries} myNickname={nickname} />
        </aside>
      </div>
    </section>
  );
}
