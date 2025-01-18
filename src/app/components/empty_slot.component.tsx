"use client";

interface EmptySlotProps {
  amount: number;
}

export default function EmptySlot(props: EmptySlotProps) {
  return (
    <button
      style={{
        background: "url('/empty_slot.png')",
        backgroundRepeat: "no-repeat",
        width: "64px",
        height: "64px",
        fontSize: "11px",
        alignItems: "center",
        margin: "0",
      }}
    >
      <div>Empty slot</div>
      <div>( {props.amount} coins )</div>
    </button>
  );
}
