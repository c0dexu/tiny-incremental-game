interface DialogProps {
  title: string;
  description: string;
  onSubmit: () => void;
}

export default function Dialog(props: DialogProps) {
  return (
    <div
      style={{
        border: "1px solid #665536",
        width: "512px",
        height: "190px",
        borderRadius: "1rem",
        display: "grid",
        gridTemplateRows: "20% 50% 30%",
        padding: "0.5rem 0.5rem 0.5rem 0.5rem",
        backgroundColor: "#665536",
        opacity: "0.95",
      }}
    >
      <div
        style={{
          fontSize: "18px",
        }}
      >
        <div style={{ fontWeight: "bold" }}>{props.title}</div>
        <div style={{ border: "1px solid #b8a88c" }}></div>
      </div>
      <div
        style={{
          fontSize: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem 1rem 1rem 1rem",
        }}
      >
        {props.description}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={props.onSubmit}
          style={{
            fontSize: "16px",
            border: "1px solid #9ca37a",
            backgroundColor: "#9ca37a",
            borderRadius: "1rem",
            width: "25%",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
