"use client";

import Coins from "./components/coins.component";
import { useEffect, useRef, useState } from "react";
import EmptySlot from "./components/empty_slot.component";
import DialogBox from "./components/dialog-box.component";

export default function Game() {
  const [coins, setCoins] = useState(0);
  const [accumulatedCoins, setAccumulatedCoins] = useState(0);
  const [rate, setRate] = useState(1);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const coinsRef = useRef(0);
  const [showDialogue, setShowDialogue] = useState(false);

  useEffect(() => {
    setTimer(
      setInterval(() => {
        setCoins((c) => c + rate);
      }, 1000)
    );
  }, []);

  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);

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
          gridTemplateColumns: "64px 64px 64px 64px 64px",
          gap: "10px",
        }}
      >
        <EmptySlot amount={5}></EmptySlot>
      </div>
      <DialogBox textToDisplay="Hello world! This is a text example to show any potential dialog message."></DialogBox>
    </div>
  );
}
