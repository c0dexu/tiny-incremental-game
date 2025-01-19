export interface IEntity {
  type: string;
  price: number;
  power?: number;
  claimed: boolean;
  frameIndex: number;
}

export interface EntityProps {
  key: number;
  frameIndex: number;
  coins: number;
  claimed: boolean;
  price: number;
  onClaim: (power: number, price: number) => void;
}
