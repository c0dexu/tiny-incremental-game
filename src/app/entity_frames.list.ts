import { EntityType } from "./enums/entity-types.enum";

export const entityFrames: Record<EntityType, string[]> = {
  [EntityType.GENERATOR]: ["generator.png", "generator_2.png"],
  [EntityType.CAT]: ["cat_1.png", "cat_2.png"],
  [EntityType.HOT_AIR_BALLOON]: ["balloon_1.png", "balloon_2.png"],
};
