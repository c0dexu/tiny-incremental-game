import { EntityProps } from "../entity.interface";

export default function Generator(props: EntityProps) {
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
              if (props.coins >= props.price) {
                props.onClaim(props.power ?? 0, props.price);
              }
            }
          }}
        >
          {!props.claimed && (
            <img src="/generator.png" width="64px" height="64px"></img>
          )}

          {props.claimed && props.frameIndex === 0 && (
            <img src="/generator.png" width="64px" height="64px"></img>
          )}
          {props.claimed && props.frameIndex === 1 && (
            <img src="/generator_2.png" width="64px" height="64px"></img>
          )}
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div>Generator</div>
        <div>Power: {props.power ?? 0}</div>
        {!props.claimed && <div>[{props.price} marbles]</div>}
      </div>
    </div>
  );
}
