import { EntityProps } from "../entity.interface";

export default function Cat(props: EntityProps) {
  return (
    <div
      style={{
        width: "85px",
      }}
      onClick={() => {
        console.log(props.coins, props.price);
        if (!props.claimed) {
          if (props.coins >= props.price) {
            props.onClaim(0, props.price);
          }
        }
      }}
    >
      {!props.claimed && (
        <img
          style={{
            cursor: !props.claimed ? "pointer" : "auto",
          }}
          width="64px"
          height="64px"
          src="cat_1.png"
        ></img>
      )}
      {props.claimed && props.frameIndex === 0 && (
        <img width="64px" height="64px" src="cat_1.png"></img>
      )}
      {props.claimed && props.frameIndex === 1 && (
        <img width="64px" height="64px" src="cat_2.png"></img>
      )}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div>Cat</div>
        {!props.claimed && <div>[{props.price} marbles]</div>}
      </div>
    </div>
  );
}
