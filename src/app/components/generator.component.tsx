"use client";

import { useEffect, useRef, useState } from "react";

interface GeneratorProps {
  key: string;
  frameIndex: number;
  coins: number;
  claimed: boolean;
  price: number;
  onClaim: (power: number, price: number) => void;
}

export default function Generator(props: GeneratorProps) {
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
            if (!props.claimed) {
              if (props.coins >= props.price) {
                props.onClaim(power.current, props.price);
              }
            }
          }}
        >
          {!props.claimed && (
            <img src="/generator.png" width="64px" height="64px"></img>
          )}

          {props.claimed && props.frameIndex === 0 && (
            <img src="/generator.png" width="64px" height="64px"></img>
          )}
          {props.claimed && props.frameIndex === 1 && (
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
        {!props.claimed && <div>[{props.price} coins]</div>}
      </div>
    </div>
  );
}
