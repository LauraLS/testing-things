import { type DragEvent, type PropsWithChildren, useState } from "react";
import { useEditorStore } from "@/stores/editor-store.ts";

type ContentMainRowProps = {
  id: string;
  variant: string;
  onDrop: (
    event: DragEvent<HTMLDivElement>,
    id: string,
    direction: string,
  ) => void;
};

const v = {
  "1": ["12"],
  "2": ["6", "6"],
  "3": ["4", "4", "4"],
  "4": ["3", "3", "3", "3"],
} as const;

const Column = ({ variant }: PropsWithChildren<{ variant: string }>) => {};

export default function ContentMainRow({
  id,
  onDrop,
  variant,
}: PropsWithChildren<ContentMainRowProps>) {
  const dragSection = useEditorStore((state) => state.dragSection);
  const generalOptions = useEditorStore((state) => state.generalOptions);
  const [overUp, setOverUp] = useState(false);
  const [overDown, setOverDown] = useState(false);

  const columns = v[variant as keyof typeof v] ?? ["12"];

  const handleDragOver = (
    event: DragEvent<HTMLDivElement>,
    direction: string,
  ) => {
    event.preventDefault();
    if (direction === "up") setOverUp(true);
    if (direction === "down") setOverDown(true);
  };

  const handleDragLeave = (
    event: DragEvent<HTMLDivElement>,
    direction: string,
  ) => {
    event.preventDefault();
    if (direction === "up") setOverUp(false);
    if (direction === "down") setOverDown(false);
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    id: string,
    direction: string,
  ) => {
    event.preventDefault();
    setOverUp(false);
    setOverDown(false);
    onDrop(event, id, direction);
  };

  const getGridSpan = (variant: any) => {
    if (variant === "2") return "col-span-6";
    if (variant === "3") return "col-span-4";
    if (variant === "4") return "col-span-3";
    return "col-span-12";
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-32 hover:border-2 hover:border-black relative">
      <div
        style={{ width: generalOptions.width }}
        className="grid grid-cols-12 gap-x-2"
      >
        {columns.map((column, index) => (
          <div
            key={index}
            className={`${getGridSpan(variant)} flex flex-col justify-center items-center h-20 border border-dashed border-gray-500 bg-gray-300`}
          >
            <p>Drop content blocks here</p>
          </div>
        ))}
      </div>
      {dragSection && (
        <div className="flex flex-col w-full h-full absolute top-0 left-0 border border-dashed border-black">
          <div
            onDragOver={(event) => handleDragOver(event, "up")}
            onDragLeave={(event) => handleDragLeave(event, "up")}
            onDrop={(event) => handleDrop(event, id, "up")}
            className="w-full h-full relative"
          >
            {overUp && (
              <>
                <div className="w-full h-2 absolute -top-1 left-0 bg-violet-500"></div>
                <p className="bg-violet-500 rounded-2xl px-6 text-xs font-extralight -top-2 left-1/2 m-auto absolute">
                  Drag here top
                </p>
              </>
            )}
          </div>
          <div
            onDragOver={(event) => handleDragOver(event, "down")}
            onDragLeave={(event) => handleDragLeave(event, "down")}
            onDrop={(event) => handleDrop(event, id, "down")}
            className="w-full h-full relative"
          >
            {overDown && (
              <>
                <div className="w-full h-2 absolute -bottom-1.5 left-0 bg-violet-500"></div>
                <p className="bg-violet-500 rounded-2xl px-6 text-xs font-extralight -bottom-2.5 left-1/2 m-auto absolute">
                  Drag here down
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
