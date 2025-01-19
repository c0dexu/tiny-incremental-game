"use client";

import { useRef, useState } from "react";

interface GeneratorProps {
  onClaim: (power: number) => void;
}

export default function Generator(props: GeneratorProps) {
  const [claimed, setClaimed] = useState(false);
  const power = useRef(1);
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
              props.onClaim(power.current);
              setClaimed(true);
            }
          }}
        >
          <img src="/generator.png" width="64px" height="64px"></img>
        </button>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div>Generator</div>
        <div>Power: {power.current}</div>
        {!claimed && <div>[0 coins]</div>}
        {claimed && <div>[Claimed]</div>}
      </div>
    </div>
  );
}
