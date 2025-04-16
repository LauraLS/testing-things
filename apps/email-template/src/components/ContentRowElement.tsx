import { type DragEvent, type PropsWithChildren, useState } from "react";
import { useEditorStore } from "@/stores/editor-store.ts";

type ContentElementRowProps = {
  variant: string;
};

const getGridSpan = (variant: any) => {
  if (variant === "2") return "col-span-6";
  if (variant === "3") return "col-span-4";
  if (variant === "4") return "col-span-3";
  return "col-span-12";
};

const getBorderStyle = (isDragging: boolean) => {
  if (isDragging) return "border-2 border-solid border-gray-500";
  return "border border-dashed border-gray-500";
};

const getDragOverColor = (isDragging: boolean) => {
  if (isDragging) return "bg-indigo-400";
  return "bg-transparent";
};

export default function ContentRowElement({
  variant,
}: PropsWithChildren<ContentElementRowProps>) {
  const dragRow = useEditorStore((state) => state.dragRow);
  const [over, setOver] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOver(false);
    const type = JSON.parse(event.dataTransfer.getData("object"))
      .type as string;
  };

  return (
    <div className={`${getGridSpan(variant)} relative w-full`}>
      <div
        className={`flex flex-col justify-center items-center h-20 ${getBorderStyle(dragRow)} bg-gray-300`}
      >
        <p className="text-center">Drop content blocks here</p>
      </div>
      {dragRow && (
        <div
          className={`${getDragOverColor(over)} absolute top-0 left-0 w-full h-full flex gap-2 items-center justify-center bg-indigo-400/60`}
          onDragOver={(event) => handleDragOver(event)}
          onDragLeave={(event) => handleDragLeave(event)}
          onDrop={(event) => handleDrop(event)}
        ></div>
      )}
    </div>
  );
}
