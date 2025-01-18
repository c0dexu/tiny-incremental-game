"use client";

import { useEffect, useState } from "react";

interface CoinsProps {
  coins: number;
  rate: number;
  accumulatedCoins: number;
  onCoinsCollect: () => void;
}

export default function Coins(props: CoinsProps) {
  return (
    <div
      style={{
        border: "1px solid #5b755f",
        borderRadius: "10%",
        padding: "0.25rem 0.25rem 0.25rem 0.25rem",
        backgroundColor: "#5b755f",
        fontSize: "14px",
      }}
    >
      <div>Coins collected: {props.accumulatedCoins}</div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div>Coins generated:</div>
        <span
          style={{
            marginLeft: "5px",
          }}
        >
          {props.coins}
        </span>
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
          onClick={props.onCoinsCollect}
        >
          Collect coins
        </button>
      </div>
    </div>
  );
}
