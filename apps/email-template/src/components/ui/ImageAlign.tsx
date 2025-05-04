import { cn } from "@/libs/utils";
import {
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
} from "lucide-react";
import type { PropsWithChildren } from "react";

type ImageAlignProps = {
  value?: "left" | "right" | "center";
  className?: string;
  onChange?: (value: "left" | "right" | "center") => void;
};

export default function ImageAlign({
  className = "",
  value = "left",
  onChange,
}: PropsWithChildren<ImageAlignProps>) {
  const isActive = (valueCheck: string) => valueCheck === value;

  return (
    <div className={cn("grid grid-cols-3", className)}>
      <button
        onClick={() => onChange?.("left")}
        className={cn(
          "flex items-center justify-center col-span-1 px-2 py-1 cursor-pointer border-l border-t border-b border-black rounded-l",
          isActive("left") && "bg-gray-300",
        )}
      >
        <AlignStartVertical strokeWidth={1} size={25} className="" />
      </button>
      <button
        onClick={() => onChange?.("center")}
        className={cn(
          "flex items-center justify-center col-span-1 px-2 py-1 cursor-pointer border border-black",
          isActive("center") && "bg-gray-300",
        )}
      >
        <AlignCenterVertical strokeWidth={1} size={25} className="" />
      </button>
      <button
        onClick={() => onChange?.("right")}
        className={cn(
          "flex items-center justify-center col-span-1 px-2 py-1 cursor-pointer border-r border-t border-b border-black rounded-r",
          isActive("right") && "bg-gray-300",
        )}
      >
        <AlignEndVertical strokeWidth={1} size={25} className="" />
      </button>
    </div>
  );
}
