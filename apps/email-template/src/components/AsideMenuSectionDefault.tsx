import type { DragEvent } from "react";
import { useEditorStore } from "@/stores/editor-store.ts";

export default function AsideMenuSectionDefault() {
  const changeDragSection = useEditorStore((state) => state.changeDragSection);

  const handleDragSectionStart = (event: DragEvent<HTMLDivElement>) => {
    changeDragSection(true);
    const target = event.target as HTMLDivElement;
    event.dataTransfer.setData(
      "object",
      JSON.stringify({ type: target.dataset.type }),
    );
  };

  const handleDragSectionEnd = (event: DragEvent<HTMLDivElement>) => {
    changeDragSection(false);
  };

  return (
    <>
      <div
        data-type="1"
        className="h-20 w-full bg-pink-50 py-4 px-8"
        draggable="true"
        onDragStart={handleDragSectionStart}
        onDragEnd={handleDragSectionEnd}
      >
        <div className="h-full w-full bg-gray-300 border border-black/20 border-dashed"></div>
      </div>
      <div
        data-type="2"
        className="h-20 w-full bg-pink-50 py-4 px-8 grid grid-cols-12 gap-x-3"
        draggable="true"
        onDragStart={handleDragSectionStart}
        onDragEnd={handleDragSectionEnd}
      >
        <div className="h-full w-full bg-gray-300 col-span-6 border border-black/20 border-dashed"></div>
        <div className="h-full w-full bg-gray-300 col-span-6 border border-black/20 border-dashed"></div>
      </div>
      <div
        data-type="3"
        className="h-20 w-full bg-pink-50 py-4 px-8 grid grid-cols-12 gap-x-3"
        draggable="true"
        onDragStart={handleDragSectionStart}
        onDragEnd={handleDragSectionEnd}
      >
        <div className="h-full w-full bg-gray-300 col-span-4 border border-black/20 border-dashed"></div>
        <div className="h-full w-full bg-gray-300 col-span-4 border border-black/20 border-dashed"></div>
        <div className="h-full w-full bg-gray-300 col-span-4 border border-black/20 border-dashed"></div>
      </div>
      <div
        data-type="4"
        className="h-20 w-full bg-pink-50 py-4 px-8 grid grid-cols-12 gap-x-3"
        draggable="true"
        onDragStart={handleDragSectionStart}
        onDragEnd={handleDragSectionEnd}
      >
        <div className="h-full w-full bg-gray-300 col-span-3 border border-black/20 border-dashed"></div>
        <div className="h-full w-full bg-gray-300 col-span-3 border border-black/20 border-dashed"></div>
        <div className="h-full w-full bg-gray-300 col-span-3 border border-black/20 border-dashed"></div>
        <div className="h-full w-full bg-gray-300 col-span-3 border border-black/20 border-dashed"></div>
      </div>
    </>
  );
}
