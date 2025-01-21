import { EntityProps } from "../entity.interface";

export default function EntityInfo(props: EntityProps) {
  return (
    <div
      style={{
        border: "1px solid #5b6987",
        borderRadius: ".5rem",
        fontSize: "15px",
        padding: ".25rem .25rem .25rem .25rem",
        backgroundColor: "#5b6987",
      }}
    >
      <div>Name: {props.name}</div>
      <div>Price: {props.price} marbles</div>
      <div>Claimed: {props.claimed}</div>
      {props.power && <div>Power: {props.power}</div>}
    </div>
  );
}
