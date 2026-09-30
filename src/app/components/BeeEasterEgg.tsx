import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import beeImg from "../../imports/kkulbi1.webp";
import { BeeClickerGame, COMB_GAP, HEX_H, HEX_W, combTileBackground } from "./BeeClickerGame";

// "바로가기" 제목 옆 꿀벌 아이콘. 한 번 누르면 벌집 전환 후 꿀 채집 게임이 열립니다.
const TRANSITION_MS = 1000;

export function BeeEasterEgg() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={beeImg}
        alt=""
        aria-hidden="true"
        draggable={false}
        onClick={() => setOpen(true)}
        className="inline-block select-none"
        style={{
          height: "1.15em",
          width: "auto",
          verticalAlign: "-0.2em",
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
        }}
      />
      {open && <EggOverlay onClose={() => setOpen(false)} />}
    </>
  );
}

function EggOverlay({ onClose }: { onClose: () => void }) {
  const [showGame, setShowGame] = useState(false);
  const tiles = useMemo(buildTransitionTiles, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setShowGame(true), TRANSITION_MS);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, []);

  return createPortal(
    <div className="kb-backdrop fixed inset-0 overflow-hidden" style={{ zIndex: 100 }}>
      <style>{EGG_CSS}</style>
      {tiles.map((t, i) => (
        <div
          key={i}
          className="kb-hex absolute"
          style={{
            left: t.x,
            top: t.y,
            width: HEX_W,
            height: HEX_H,
            background: combTileBackground(t.tone),
            animationDelay: `${t.delay}ms`,
          }}
        />
      ))}
      {showGame && <BeeClickerGame onClose={onClose} />}
    </div>,
    document.body,
  );
}

// 게임판과 같은 크기·색의 벌집 타일이 화면 4곳에서 퍼져 나가며 화면을 덮습니다.
function buildTransitionTiles() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const origins = Array.from({ length: 4 }, () => [Math.random() * w, Math.random() * h]);
  const maxDist = Math.hypot(w, h) / 2;
  const tiles: { x: number; y: number; tone: number; delay: number }[] = [];

  for (let row = -1; row * HEX_H * 0.75 < h + HEX_H; row++) {
    for (let col = -1; col * HEX_W < w + HEX_W; col++) {
      const x = col * HEX_W + (row % 2 ? HEX_W / 2 : 0);
      const y = row * HEX_H * 0.75;
      const d = Math.min(...origins.map(([ox, oy]) => Math.hypot(ox - x, oy - y)));
      tiles.push({
        x,
        y,
        tone: row * 7 + col * 3 + 50,
        delay: Math.min(1, d / maxDist) * 620 + Math.random() * 90,
      });
    }
  }
  return tiles;
}

const EGG_CSS = `
@keyframes kb-backdrop-in { from { background: transparent; } to { background: ${COMB_GAP.outer}; } }
.kb-backdrop { animation: kb-backdrop-in 800ms ease-in forwards; }
@keyframes kb-hex-in { 0% { transform: scale(0) rotate(-30deg); opacity: 0; } 70% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(0.97); opacity: 1; } }
.kb-hex {
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  transform: scale(0);
  animation: kb-hex-in 240ms cubic-bezier(.2,.8,.3,1.2) forwards;
}
@media (prefers-reduced-motion: reduce) {
  .kb-hex, .kb-backdrop { animation-duration: 1ms; animation-delay: 0ms !important; }
}
`;
