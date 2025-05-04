import { cn } from "@/libs/utils";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import type { PropsWithChildren } from "react";

type TextAlignProps = {
  value?: "left" | "right" | "center" | "justify";
  className?: string;
  onChange?: (value: "left" | "right" | "center" | "justify") => void;
};

export default function TextAlign({
  className = "",
  value = "left",
  onChange,
}: PropsWithChildren<TextAlignProps>) {
  console.log(value);
  const isActive = (valueCheck: string) => valueCheck === value;

  return (
    <div className={cn("grid grid-cols-4", className)}>
      <button
        onClick={() => onChange?.("left")}
        className={cn(
          "flex items-center justify-center col-span-1 px-2 py-1 cursor-pointer border-l border-t border-b border-black rounded-l",
          isActive("left") && "bg-gray-300",
        )}
      >
        <AlignLeft strokeWidth={1} size={25} className="" />
      </button>
      <button
        onClick={() => onChange?.("center")}
        className={cn(
          "flex items-center justify-center col-span-1 px-2 py-1 cursor-pointer border border-black",
          isActive("center") && "bg-gray-300",
        )}
      >
        <AlignCenter strokeWidth={1} size={25} className="" />
      </button>
      <button
        onClick={() => onChange?.("right")}
        className={cn(
          "flex items-center justify-center col-span-1 px-2 py-1 cursor-pointer border-r border-t border-b border-black",
          isActive("right") && "bg-gray-300",
        )}
      >
        <AlignRight strokeWidth={1} size={25} className="" />
      </button>
      <button
        onClick={() => onChange?.("justify")}
        className={cn(
          "flex items-center justify-center col-span-1 px-2 py-1 cursor-pointer border-r border-t border-b border-black rounded-r",
          isActive("justify") && "bg-gray-300",
        )}
      >
        <AlignJustify strokeWidth={1} size={25} className="" />
      </button>
    </div>
  );
}
