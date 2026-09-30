import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import beeImg from "../../imports/kkulbi1.webp";
const HoneyGame = lazy(() => import("./honey-game/HoneyGame"));
export function BeeEasterEgg() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={trigger}
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
          style={{ height: "1.15em", width: "auto" }}
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
