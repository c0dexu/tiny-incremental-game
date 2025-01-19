export interface IEntity {
  type: string;
  price: number;
  power?: number;
  claimed: boolean;
  frameIndex: number;
}
