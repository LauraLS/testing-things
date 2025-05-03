import { Image, LetterText } from "lucide-react";
import type { DragEvent } from "react";
import { useEditorStore } from "@/stores/editor-store.ts";

export default function AsideMenuRowDefault() {
  const changeDragRow = useEditorStore((state) => state.changeDragRow);

  const handleDragRowStart = (event: DragEvent<HTMLDivElement>) => {
    changeDragRow(true);
    const target = event.target as HTMLDivElement;
    event.dataTransfer.setData(
      "object",
      JSON.stringify({ type: target.dataset.type }),
    );
  };

  const handleDragRowEnd = (event: DragEvent<HTMLDivElement>) => {
    changeDragRow(false);
  };

  return (
    <>
      <div
        data-type="image"
        className="w-full aspect-square bg-pink-50 flex justify-center items-center"
        draggable="true"
        onDragStart={handleDragRowStart}
        onDragEnd={handleDragRowEnd}
      >
        <Image strokeWidth={1} size={40} className="" />
      </div>
      <div
        data-type="text"
        className="w-full aspect-square bg-pink-50 flex justify-center items-center"
        draggable="true"
        onDragStart={handleDragRowStart}
        onDragEnd={handleDragRowEnd}
      >
        <LetterText strokeWidth={1} size={40} className="" />
      </div>
      <div
        data-type="image"
        className="w-full aspect-square bg-pink-50 flex justify-center items-center"
        draggable="true"
        onDragStart={handleDragRowStart}
        onDragEnd={handleDragRowEnd}
      >
        <Image strokeWidth={1} size={40} className="" />
      </div>
      <div
        data-type="text"
        className="w-full aspect-square bg-pink-50 flex justify-center items-center"
        draggable="true"
        onDragStart={handleDragRowStart}
        onDragEnd={handleDragRowEnd}
      >
        <LetterText strokeWidth={1} size={40} className="" />
      </div>
      <div
        data-type="image"
        className="w-full aspect-square bg-pink-50 flex justify-center items-center"
        draggable="true"
        onDragStart={handleDragRowStart}
        onDragEnd={handleDragRowEnd}
      >
        <Image strokeWidth={1} size={40} className="" />
      </div>
      <div
        data-type="text"
        className="w-full aspect-square bg-pink-50 flex justify-center items-center"
        draggable="true"
        onDragStart={handleDragRowStart}
        onDragEnd={handleDragRowEnd}
      >
        <LetterText strokeWidth={1} size={40} className="" />
      </div>
      <div
        data-type="image"
        className="w-full aspect-square bg-pink-50 flex justify-center items-center"
        draggable="true"
        onDragStart={handleDragRowStart}
        onDragEnd={handleDragRowEnd}
      >
        <Image strokeWidth={1} size={40} className="" />
      </div>
      <div
        data-type="text"
        className="w-full aspect-square bg-pink-50 flex justify-center items-center"
        draggable="true"
        onDragStart={handleDragRowStart}
        onDragEnd={handleDragRowEnd}
      >
        <LetterText strokeWidth={1} size={40} className="" />
      </div>
    </>
  );
}
