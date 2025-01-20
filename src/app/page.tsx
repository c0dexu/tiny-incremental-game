"use client";

import Coins from "./components/coins.component";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IEntity } from "./entity.interface";
import { EntityType } from "./enums/entity-types.enum";
import Entity from "./components/entity.component";
import { entityFrames } from "./entities.list";

function populatePlayground(
  entitiesToPopulate: IEntity[],
  entities: IEntity[],
  setEntities: (value: SetStateAction<IEntity[]>) => void
) {
  const temp = [...entities];
  setEntities([...temp, ...entitiesToPopulate]);
}

function updatePlayground(
  entities: IEntity[],
  marbles: number,
  setEntities: (value: SetStateAction<IEntity[]>) => void
) {
  if (entities.length === 1) {
    populatePlayground(
      [
        {
          type: EntityType.CAT,
          price: 15,
          claimed: false,
          frameIndex: 0,
        },
      ],
      entities,
      setEntities
    );
  } else if (entities.length > 1) {
    // stuff
  }
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
        type: EntityType.GENERATOR,
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
    return (
      <Entity
        key={idx}
        frames={entityFrames[e.type]}
        name={e.type}
        frameIndex={frameIndex}
        coins={accumulatedCoins}
        claimed={e.claimed}
        price={e.price}
        power={e.power}
        onClaim={(power, price) => {
          setRate((r) => r + power);
          setAccumulatedCoins((m) => Math.max(0, m - price));
          setMarbles(0);
          const tempList = [...entities];
          tempList[idx].claimed = true;
          setEntities([...tempList]);
          updatePlayground(entities, marbles, setEntities);
        }}
      ></Entity>
    );
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
