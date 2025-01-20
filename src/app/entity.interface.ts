import { EntityType } from "./enums/entity-types.enum";

export interface IEntity {
  type: EntityType;
  price: number;
  power?: number;
  claimed: boolean;
  frameIndex: number;
}

export interface EntityProps {
  key: number;
  name: string;
  frameIndex: number;
  frames: string[];
  coins: number;
  claimed: boolean;
  price: number;
  power?: number;
  onClaim: (power: number, price: number) => void;
}
