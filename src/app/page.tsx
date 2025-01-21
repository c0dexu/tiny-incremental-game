"use client";

import Coins from "./components/screen.component";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IEntity } from "./entity.interface";
import { EntityType } from "./enums/entity-types.enum";
import Entity from "./components/entity.component";
import { entityItems } from "./entity.list";
import Dialog from "./components/dialog.component";
import EntityInfo from "./components/entity-info.component";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
  power: number,
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
    // populatePlayground(
    //   [
    //     {
    //       type: EntityType.HOT_AIR_BALLOON,
    //       price: 45,
    //       claimed: false,
    //       frameIndex: 0,
    //     },
    //   ],
    //   entities,
    //   setEntities
    // );
    const probability = Math.random();
    console.log(probability);

    const keys = Object.keys(entityItems) as EntityType[];
    const n = 3;

    const temp = [];

    for (let key of keys) {
      if (entityItems[key].spawnProbability > probability) {
        temp.push({
          type: key,
          price: entityItems[key].price * power,
          power: entityItems[key].power,
          claimed: false,
          frameIndex: 0,
        });
      }
    }
    populatePlayground(temp, entities, setEntities);
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
  const [insufficientFundsDialog, setInsufficientFundsDialog] = useState(false);
  const entityRef = useRef<IEntity | null>(null);
  const rateRef = useRef(0);
  const [gridSize, setGridSize] = useState("64px");

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
    rateRef.current = rate;
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

  const entitiesToRender = entities.map((e, idx) => {
    return (
      <Entity
        key={idx}
        frames={entityItems[e.type].frames}
        name={e.type}
        frameIndex={frameIndex}
        coins={accumulatedCoins}
        claimed={e.claimed}
        price={e.price}
        power={e.power}
        onClaim={(power, price) => {
          entityRef.current = e;
          if (accumulatedCoins >= price) {
            setRate((r) => r + power);
            setAccumulatedCoins((m) => Math.max(0, m - price));
            setMarbles(0);
            const tempList = [...entities];
            tempList[idx].claimed = true;
            setEntities([...tempList]);
            updatePlayground(entities, rateRef.current, setEntities);
          } else {
            setInsufficientFundsDialog(true);
          }
        }}
      ></Entity>
    );
  });

  useEffect(() => {
    const n = entities.length;
    let txt = "";
    for (let i = 0; i < n; i++) {
      txt += "64px ";
      setGridSize(txt);
    }
  }, [entities]);

  useEffect(() => {
    console.log(gridSize);
  }, [gridSize]);

  return (
    <div>
      {insufficientFundsDialog && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Dialog
              title="Insufficient marbles"
              description={
                entityRef.current
                  ? `You can buy a ${
                      entityRef.current?.type
                    } only if you have at least ${
                      entityRef.current.price - accumulatedCoins
                    } marbles`
                  : ""
              }
              onSubmit={() => {
                setInsufficientFundsDialog(false);
              }}
            ></Dialog>
          </div>
        </div>
      )}
      <div
        style={{
          position: "fixed",
        }}
      ></div>
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
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              gridTemplateColumns:
                "64px 64px 64px 64px 64px 64px 64px 64px 64px",
              gap: "30px",
              background: `url("/grass_platform.png")`,
              backgroundRepeat: "revert",
              backgroundSize: "cover",
              width: "fit-content",
              height: "fit-content",
            }}
          >
            {entitiesToRender}
          </div>
        </div>
      </div>
    </div>
  );
}
