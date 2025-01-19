"use client";

import { useEffect, useRef, useState } from "react";

interface GeneratorProps {
  coins: number;
  onClaim: (power: number) => void;
}

export default function Generator(props: GeneratorProps) {
  const [claimed, setClaimed] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  const power = useRef(1);
  const price = useRef(0);

  useEffect(() => {
    setInterval(() => {
      setAnimationFrame((x) => (x + 1) % 2);
    }, 500);
  }, []);

  return (
    <div
      style={{
        width: "85px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => {
            if (!claimed) {
              if (props.coins >= price.current) {
                props.onClaim(power.current);
                setClaimed(true);
              }
            }
          }}
        >
          {!claimed && (
            <img src="/generator.png" width="64px" height="64px"></img>
          )}

          {claimed && animationFrame === 0 && (
            <img src="/generator.png" width="64px" height="64px"></img>
          )}
          {claimed && animationFrame === 1 && (
            <img src="/generator_2.png" width="64px" height="64px"></img>
          )}
        </button>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div>Generator</div>
        <div>Power: {power.current}</div>
        {!claimed && <div>[{price.current} coins]</div>}
      </div>
    </div>
  );
}
