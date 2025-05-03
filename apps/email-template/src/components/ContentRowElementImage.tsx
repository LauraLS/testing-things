import { cn } from "@/libs/utils.ts";
import type { PropsWithChildren } from "react";
import { type Child, useEditorStore } from "@/stores/editor-store.ts";

type ContentRowElementImageProps = {
  className?: string;
  child: Child;
};

export default function ContentRowElementImage({
  className,
  child,
}: PropsWithChildren<ContentRowElementImageProps>) {
  const focusRow = useEditorStore((state) => state.focusRow);
  const isFocused = focusRow?.id === child.id;

  return (
    <div
      id={`row-${child.id}`}
      className={cn(
        `${isFocused ? "border-violet-500" : "border-transparent"} flex flex-col justify-center items-center bg-gray-300 border-2`,
        className,
      )}
    >
      {child.style.url ? (
        <img src={child.style.url} alt="Imagen del block" className="" />
      ) : (
        <p className="text-center">Esto es un block de imagen</p>
      )}
    </div>
  );
}
