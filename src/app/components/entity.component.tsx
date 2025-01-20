import { EntityProps } from "../entity.interface";

export default function Entity(props: EntityProps) {
  return (
    <div
      style={{
        width: "85px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            cursor: !props.claimed ? "pointer" : "auto",
          }}
          onClick={() => {
            if (!props.claimed) {
              props.onClaim(props.power ?? 0, props.price);
            }
          }}
        >
          {!props.claimed && (
            <img src={`/${props.frames[0]}`} width="64px" height="64px"></img>
          )}

          {props.claimed && props.frameIndex === 0 && (
            <img src={`/${props.frames[0]}`} width="64px" height="64px"></img>
          )}
          {props.claimed && props.frameIndex === 1 && (
            <img src={`/${props.frames[1]}`} width="64px" height="64px"></img>
          )}
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div>{props.name}</div>
        {props.power && <div>Power: {props.power}</div>}
        {!props.claimed && <div>[{props.price} marbles]</div>}
      </div>
    </div>
  );
}
