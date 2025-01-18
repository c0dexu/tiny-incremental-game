"use client";

export default function EmptySlot() {
  return (
    <button
      style={{
        background: "url('/empty_slot.png')",
        backgroundRepeat: "no-repeat",
        width: "64px",
        height: "64px",
        fontSize: "11px",
        display: "flex",
        alignItems: "center",
        margin: "0",
      }}
    >
      <div>Empty Slot (5 coins)</div>
    </button>
  );
}
