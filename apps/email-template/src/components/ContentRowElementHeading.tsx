import { cn } from "@/libs/utils.ts";
import { type Child, useEditorStore } from "@/stores/editor-store";
import { type PropsWithChildren } from "react";

type ContentRowElementHeadingProps = {
  className?: string;
  child: Child;
};

export default function ContentRowElementHeading({
  className,
  child,
}: PropsWithChildren<ContentRowElementHeadingProps>) {
  const changeChildValue = useEditorStore((state) => state.changeChildValue);
  const focusRow = useEditorStore((state) => state.focusRow);
  const isFocused = focusRow?.id === child.id;

  const { style } = child;
  const { color, fontSize, fontWeight, lineHeight, textAlign } = style;

  const onBlurHandler = (value: string) => {
    changeChildValue(child.id, value);
  };

  return (
    <div
      id={`row-${child.id}`}
      className={cn(
        `${isFocused ? "border-violet-500" : "border-transparent"} hover:bg-red-100 w-full p-2.5 border-2`,
        className,
      )}
    >
      <h1
        style={{
          fontSize: fontSize,
          color: color,
          fontWeight: fontWeight,
          lineHeight: lineHeight,
          textAlign: textAlign,
        }}
        contentEditable={true}
        className="focus-visible:outline-none"
        suppressContentEditableWarning={true}
        onBlur={(event) => onBlurHandler(event.target.innerHTML)}
      >
        New paragraph
      </h1>
    </div>
  );
}
