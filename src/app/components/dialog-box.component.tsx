"use client";

import { useEffect, useState } from "react";

interface DialogBoxProp {
  textToDisplay: string;
}

export default function DialogBox(props: DialogBoxProp) {
  const [text, setText] = useState("");

  useEffect(() => {
    let idx = 0;
    if (props.textToDisplay.length > 0) {
      let interval = setInterval(() => {
        const char = props.textToDisplay[idx];
        setText((t) => t + char);
        idx++;
        if (idx > props.textToDisplay.length - 1) {
          clearInterval(interval);
        }
      }, 100);
    }
  }, [props.textToDisplay]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          border: "1px solid",
          borderRadius: "10px",
          padding: "10px 10px 10px 10px",
          height: "128px",
          width: "50%",
        }}
      >
        {text}
      </div>
    </div>
  );
}
