import { useRef, useState, type MutableRefObject } from "react";
import type { Point } from "./engine";

// 모바일 가상 조이스틱. 스틱을 끌면 stick.current에 방향 벡터(길이 0~1)를 넣고,
// 손을 떼면 0으로 돌려 캐릭터를 멈춥니다. 표시 여부는 CSS(터치 기기에서만)로 정합니다.
const RADIUS = 44; // 스틱이 움직일 수 있는 반경(px)

export function Joystick({
  stick,
  disabled,
}: {
  stick: MutableRefObject<Point>;
  disabled: boolean;
}) {
  const base = useRef<HTMLDivElement>(null);
  const [knob, setKnob] = useState<{ x: number; y: number; dragging: boolean }>({
    x: 0,
    y: 0,
    dragging: false,
  });

  const move = (clientX: number, clientY: number) => {
    const rect = base.current!.getBoundingClientRect();
    let x = clientX - (rect.left + rect.width / 2);
    let y = clientY - (rect.top + rect.height / 2);
    const len = Math.hypot(x, y);
    if (len > RADIUS) {
      x = (x / len) * RADIUS;
      y = (y / len) * RADIUS;
    }
    stick.current = { x: x / RADIUS, y: y / RADIUS };
    setKnob({ x, y, dragging: true });
  };

  const release = () => {
    stick.current = { x: 0, y: 0 };
    setKnob({ x: 0, y: 0, dragging: false });
  };

  return (
    <div
      ref={base}
      className="honey-joystick"
      data-disabled={disabled || undefined}
      role="presentation"
      onPointerDown={(e) => {
        if (disabled) return;
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (knob.dragging) move(e.clientX, e.clientY);
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={release}
    >
      <div
        className="honey-joystick-knob"
        style={{
          transform: `translate(${knob.x}px, ${knob.y}px)`,
          // 드래그 중엔 손가락을 바로 따라가고, 떼면 부드럽게 중앙 복귀
          transition: knob.dragging ? "none" : "transform 160ms ease-out",
        }}
      />
    </div>
  );
}
