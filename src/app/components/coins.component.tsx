"use client";

import { useEffect, useState } from "react";

interface CoinsProps {
  amount: number;
  rate: number;
}

export default function Coins(props: CoinsProps) {
  return (
    <div
      style={{
        border: "1px solid #5b755f",
        borderRadius: "10%",
        padding: "0.25rem 0.25rem 0.25rem 0.25rem",
        backgroundColor: "#5b755f",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <div>Coins:</div>
        <span
          style={{
            marginLeft: "5px",
          }}
        >
          {props.amount}
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
    </div>
  );
}
