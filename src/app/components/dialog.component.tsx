interface DialogProps {
  title: string;
  description: string;
  onClose: () => void;
  onSubmit: () => void;
}

export default function Dialog(props: DialogProps) {
  return <div>hello</div>;
}
