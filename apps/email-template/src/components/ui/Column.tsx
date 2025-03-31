import { type DragEvent, type PropsWithChildren, useState } from "react";

type ColumnProps = {
  className?: string;
};

export default function Column({ className }: PropsWithChildren<ColumnProps>) {
  const [over, setOver] = useState(false);
  const [text, setText] = useState("Soltar el contenido aquí");

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("object");
    const json = JSON.parse(data);
    const { action } = json;
    setText(`Soltar el contenido ${action}`);
    setOver(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOver(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={className}
    >
      <p>{text}</p>
      {over && (
        <div className="absolute top-0 right-0 w-full h-full flex gap-2 items-center justify-center bg-indigo-400/60">
          <span className="text-xs text-white bg-black/50 px-2 py-1 rounded-full">
            Soltar aquí
          </span>
        </div>
      )}
    </div>
  );
}
