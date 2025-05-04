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
        "border-2",
        isFocused ? "border-violet-500" : "border-transparent",
        child.value ? "" : "bg-gray-300",
        className,
      )}
      style={{ textAlign: child.style.textAlign }}
    >
      {child.value ? (
        <img
          width={`${child.width}%`}
          src={child.value}
          alt="Imagen del block"
          className="inline-block"
        />
      ) : (
        <p className="text-center">Esto es un block de imagen</p>
      )}
    </div>
  );
}
