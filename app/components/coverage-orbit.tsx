"use client";

import { useRef, type PointerEvent } from "react";
import {
  Buildings,
  CarProfile,
  Heartbeat,
  HouseLine,
} from "@phosphor-icons/react";

export function CoverageOrbit() {
  const stageRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current;
    if (!stage) return;

    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.setProperty("--orbit-ry", `${x * 10}deg`);
    stage.style.setProperty("--orbit-rx", `${y * -8}deg`);
  }

  function resetOrbit() {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--orbit-ry", "0deg");
    stage.style.setProperty("--orbit-rx", "0deg");
  }

  return (
    <div
      ref={stageRef}
      className="orbit-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetOrbit}
      aria-label="Life, auto, home, and business insurance coverage"
    >
      <div className="orbit-shell" aria-hidden="true">
        <span className="orbit-line orbit-line-one" />
        <span className="orbit-line orbit-line-two" />
        <span className="orbit-line orbit-line-three" />
        <span className="orbit-core">
          <span>4</span>
          <small>ways covered</small>
        </span>
        <span className="orbit-node orbit-node-life">
          <Heartbeat size={18} weight="regular" />
          Life
        </span>
        <span className="orbit-node orbit-node-auto">
          <CarProfile size={18} weight="regular" />
          Auto
        </span>
        <span className="orbit-node orbit-node-home">
          <HouseLine size={18} weight="regular" />
          Home
        </span>
        <span className="orbit-node orbit-node-business">
          <Buildings size={18} weight="regular" />
          Business
        </span>
      </div>
    </div>
  );
}
