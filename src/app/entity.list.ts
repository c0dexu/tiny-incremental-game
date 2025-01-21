import { EntityType } from "./enums/entity-types.enum";

interface EntityItem {
  frames: string[];
  price: number;
  power?: number;
  spawnProbability: number;
}

export const entityItems: Record<EntityType, EntityItem> = {
  [EntityType.GENERATOR]: {
    frames: ["generator.png", "generator_2.png"],
    spawnProbability: 0.1,
    price: 100,
    power: 1,
  },
  [EntityType.CAT]: {
    frames: ["cat_1.png", "cat_2.png"],
    spawnProbability: 0.67,
    price: 15,
  },
  [EntityType.HOT_AIR_BALLOON]: {
    frames: ["balloon_1.png", "balloon_2.png"],
    spawnProbability: 0.45,
    price: 45,
  },
  [EntityType.STAR]: {
    frames: ["star_1.png", "star_2.png"],
    spawnProbability: 0.2,
    price: 350,
  },
};
