import { cn } from "@/libs/utils.ts";
import { type Child, useEditorStore } from "@/stores/editor-store";
import { type PropsWithChildren, useState } from "react";

type ContentRowElementTextProps = {
  className?: string;
  child: Child;
};

export default function ContentRowElementText({
  className,
  child,
}: PropsWithChildren<ContentRowElementTextProps>) {
  const focusRow = useEditorStore((state) => state.focusRow);
  const isFocused = focusRow?.id === child.id;

  return (
    <div
      id={`row-${child.id}`}
      className={cn(
        `${isFocused ? "border-violet-500" : "border-transparent"} hover:bg-red-100 w-full p-2.5 border-2`,
        className,
      )}
    >
      <p
        style={{
          fontSize: child.style.fontSize,
          color: child.style.color,
          fontWeight: child.style.fontWeight,
        }}
        contentEditable={true}
        className="focus-visible:outline-none"
        suppressContentEditableWarning={true}
      >
        New paragraph
      </p>
    </div>
  );
}
