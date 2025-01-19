"use client";

import Coins from "./components/coins.component";
import { useEffect, useRef, useState } from "react";
import { beginningDialog, Dialog } from "./dialog-texts";
import Generator from "./components/generator.component";

export default function Game() {
  const [marbles, setMarbles] = useState(0);
  const [accumulatedCoins, setAccumulatedCoins] = useState(0);
  const [rate, setRate] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const coinsRef = useRef(0);

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    timer.current = setInterval(() => {
      setMarbles((c) => c + rate);
    }, 1000);
  }, [rate]);

  useEffect(() => {
    coinsRef.current = marbles;
  }, [marbles]);

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
          gridTemplateColumns: "256px 50%",
        }}
      >
        <Coins
          onMarblesCollect={() => {
            console.log(coinsRef.current);
            setAccumulatedCoins(accumulatedCoins + coinsRef.current);
            setMarbles(0);
          }}
          accumulatedMarbles={accumulatedCoins}
          marbles={marbles}
          rate={rate}
        ></Coins>
      </div>

      <div
        style={{
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: "64px 64px 64px 64px 64px",
          gap: "30px",
        }}
      >
        <Generator
          coins={marbles}
          onClaim={(power) => {
            setRate((r) => r + power);
          }}
        ></Generator>
      </div>
    </div>
  );
}
