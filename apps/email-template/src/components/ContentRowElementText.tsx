import { cn } from "@/libs/utils.ts";
import type { Child } from "@/stores/editor-store";
import type { PropsWithChildren } from "react";

type ContentRowElementTextProps = {
  className?: string;
  child: Child;
};

export default function ContentRowElementText({
  className,
  child,
}: PropsWithChildren<ContentRowElementTextProps>) {
  const f = () => {
    console.log("Focus");
  };

  return (
    <div className={cn("hover:bg-gray-100", className)}>
      <p
        onFocus={f}
        contentEditable={true}
        className=""
        suppressContentEditableWarning={true}
      >
        New paragraph
      </p>
    </div>
  );
}
