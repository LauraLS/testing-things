import { cn } from "@/libs/utils.ts";
import { type DragEvent, type PropsWithChildren, useState } from "react";
import { type Child, useEditorStore } from "@/stores/editor-store.ts";

type ContentRowElementEmptyProps = {
  className?: string;
  child: Child;
};

const getDragOverColor = (isDragging: boolean) => {
  if (isDragging) return "bg-indigo-400";
  return "bg-transparent";
};

const getBorderStyle = (isDragging: boolean) => {
  if (isDragging) return "border-2 border-solid border-gray-500";
  return "border border-dashed border-gray-500";
};

export default function ContentRowElementEmpty({
  className,
  child,
}: PropsWithChildren<ContentRowElementEmptyProps>) {
  const dragRow = useEditorStore((state) => state.dragRow);
  const changeChildType = useEditorStore((state) => state.changeChildType);
  const [over, setOver] = useState<boolean>(false);

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
    changeChildType(child.id, type);
  };

  return (
    <div className={`${getBorderStyle(dragRow)} relative w-full`}>
      <div
        className={cn(
          "flex flex-col justify-center items-center h-20 bg-gray-300",
          className,
        )}
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
