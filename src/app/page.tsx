"use client";

import Coins from "./components/coins.component";
import { useEffect, useRef, useState } from "react";
import { beginningDialog, Dialog } from "./dialog-texts";
import Generator from "./components/generator.component";

export default function Game() {
  const [coins, setCoins] = useState(0);
  const [accumulatedCoins, setAccumulatedCoins] = useState(0);
  const [rate, setRate] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const coinsRef = useRef(0);
  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogueList, setDialogueList] = useState<Dialog[]>([]);

  useEffect(() => {
    console.log(timerRef);
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setCoins((c) => c + rate);
      }, 1000);
    }
  }, [rate]);

  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);

  useEffect(() => {
    setDialogueList(beginningDialog);
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
          gridTemplateColumns: "256px 50%",
        }}
      >
        <Coins
          onCoinsCollect={() => {
            console.log(coinsRef.current);
            setAccumulatedCoins(accumulatedCoins + coinsRef.current);
            setCoins(0);
          }}
          accumulatedCoins={accumulatedCoins}
          coins={coins}
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
          onClaim={(power) => {
            setRate((r) => r + power);
          }}
        ></Generator>
      </div>
    </div>
  );
}
