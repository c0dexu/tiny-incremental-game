"use client";

import Coins from "./components/coins.component";
import { useEffect, useRef, useState } from "react";
import EmptySlot from "./components/empty_slot.component";

export default function Game() {
  const [coins, setCoins] = useState(0);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setCoins((c) => c + rate);
    }, 1000);
  }, []);

  return (
    <div
      style={{
        padding: "3rem 3rem 3rem 3rem",
        display: "grid",
        gridTemplateRows: "64px 50%",
        gap: "10rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "128px 50%",
        }}
      >
        <Coins coins={coins} rate={rate}></Coins>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "64px 64px 64px 64px 64px",
          gap: "10px",
        }}
      >
        <EmptySlot amount={5}></EmptySlot>
      </div>
    </div>
  );
}
