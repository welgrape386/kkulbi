import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import beeImg from "../../imports/kkulbi1.webp";
const HoneyGame = lazy(() => import("./honey-game/HoneyGame"));
export function BeeEasterEgg() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <>
      <style>{BLINK_CSS}</style>
      <button
        ref={trigger}
        className="kb-bee-blink"
        type="button"
        aria-label="꿀도둑 게임 열기"
        title="꿀도둑 게임 열기"
        onClick={() => setOpen(true)}
        style={{
          background: "none",
          border: 0,
          padding: 0,
          display: "inline-block",
          verticalAlign: "middle",
          cursor: "pointer",
          lineHeight: 0,
        }}
      >
        <img
          src={beeImg}
          alt=""
          draggable={false}
          style={{ height: "1.35em", width: "auto" }}
        />
      </button>
      {open && (
        <Overlay
          onClose={() => {
            setOpen(false);
            trigger.current?.focus();
          }}
        />
      )}
    </>
  );
}
function Overlay({ onClose }: { onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root.current?.focus();
    const keyboard = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const items = root.current?.querySelectorAll<HTMLElement>(
          "button:not(:disabled),input,canvas[tabindex]",
        );
        if (!items?.length) {
          e.preventDefault();
          return;
        }
        const first = items[0],
          last = items[items.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === root.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (
          !e.shiftKey &&
          (document.activeElement === last ||
            document.activeElement === root.current)
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", keyboard);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", keyboard);
    };
  }, [onClose]);
  return createPortal(
    <div
      ref={root}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="꿀비의 숨겨진 숲"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#172b29ed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
      }}
    >
      <Suspense
        fallback={
          <button onClick={onClose} style={{ color: "white" }}>
            숲으로 가는 중… (닫기)
          </button>
        }
      >
        <HoneyGame onClose={onClose} />
      </Suspense>
    </div>,
    document.body,
  );
}

// 눈길을 끄는 깜빡임 + 금빛 glow. 1.2초 주기라 초당 3회 이하 깜빡임 기준 안쪽입니다.
const BLINK_CSS = `
@keyframes kb-bee-blink {
  0%, 100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 6px rgba(245, 180, 0, 0.9)); }
  50% { opacity: 0.35; transform: scale(0.92); filter: drop-shadow(0 0 0 rgba(245, 180, 0, 0)); }
}
.kb-bee-blink { animation: kb-bee-blink 1.2s ease-in-out infinite; }
.kb-bee-blink:hover, .kb-bee-blink:focus-visible { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .kb-bee-blink { animation: none; filter: drop-shadow(0 0 6px rgba(245, 180, 0, 0.9)); }
}
`;
