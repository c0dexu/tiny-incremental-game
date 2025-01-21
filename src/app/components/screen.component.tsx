"use client";

import { useEffect, useState } from "react";

interface MarblesProps {
  marbles: number;
  rate: number;
  accumulatedMarbles: number;
  onMarblesCollect: () => void;
}

export default function Marbles(props: MarblesProps) {
  return (
    <div
      style={{
        border: "1px solid #5b755f",
        borderRadius: "10%",
        padding: "0.25rem 0.25rem 0.25rem 0.25rem",
        backgroundColor: "#486349",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <div>Marbles collected: {props.accumulatedMarbles}</div>
        <img src="/marble.png"></img>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div>Marbles generated:</div>
        </div>
        <span
          style={{
            marginLeft: "5px",
          }}
        >
          {props.marbles}
        </span>
        <img src="/marble.png"></img>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div>Current rate:</div>
        <span
          style={{
            marginLeft: "5px",
          }}
        >
          {props.rate}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          width: "100%",
        }}
      >
        <button
          style={{
            marginTop: "8px",
            backgroundColor: "#91b8a9",
            borderRadius: "15%",
            padding: "5px 5px 5px 5px",
          }}
          onClick={props.onMarblesCollect}
        >
          Collect marbles
        </button>
      </div>
    </div>
  );
}
