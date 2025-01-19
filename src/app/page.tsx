"use client";

import Coins from "./components/coins.component";
import { useEffect, useRef, useState } from "react";
import Generator from "./components/generator.component";
import { v4 as uuidv4 } from "uuid";
import { IEntity } from "./entity.interface";
import Cat from "./components/cat.component";

function getRule(entities: IEntity[], marbles: number): string {
  if (entities.length === 1 && entities[0].type === "GENERATOR") {
    if (entities[0].price === 0) {
      return "first_time_play";
    }
  }
  return "nothing";
}

export default function Game() {
  const [marbles, setMarbles] = useState(0);
  const [accumulatedCoins, setAccumulatedCoins] = useState(0);
  const [rate, setRate] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const coinsRef = useRef(0);
  const [entities, setEntities] = useState<IEntity[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);

  // initial effect to add the zero generator
  useEffect(() => {
    setInterval(() => {
      setFrameIndex((f) => (f + 1) % 2);
    }, 500);

    setEntities([
      {
        type: "GENERATOR",
        price: 0,
        power: 1,
        claimed: false,
        frameIndex: 0,
      },
    ]);
  }, []);

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

  useEffect(() => {
    console.log(entities);
  }, [entities]);

  const entitiesToRender = entities.map((e, idx) => {
    switch (e.type) {
      case "GENERATOR":
        return (
          <Generator
            key={idx}
            frameIndex={frameIndex}
            coins={accumulatedCoins}
            claimed={e.claimed}
            price={e.price}
            onClaim={(power, price) => {
              setRate((r) => r + power);
              setAccumulatedCoins((m) => Math.max(0, m - price));
              setMarbles(0);
              const tempList = [...entities];
              tempList[idx].claimed = true;
              setEntities([...tempList]);
              const rule = getRule(entities, marbles);
              switch (rule) {
                case "first_time_play":
                  const xyz = [...entities];
                  xyz.push({
                    type: "CAT",
                    price: 15,
                    claimed: false,
                    power: 0,
                    frameIndex: 0,
                  });
                  setEntities([...xyz]);
                  break;
              }
            }}
          ></Generator>
        );
      case "CAT":
        return (
          <Cat
            key={idx}
            frameIndex={frameIndex}
            coins={accumulatedCoins}
            claimed={e.claimed}
            price={e.price}
            onClaim={(power, price) => {
              console.log("here");
              const tempList = [...entities];
              tempList[idx].claimed = true;
              setEntities([...tempList]);
              setAccumulatedCoins((m) => Math.max(0, m - e.price));
            }}
          ></Cat>
        );
    }
  });

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
        {entitiesToRender}
      </div>
    </div>
  );
}
