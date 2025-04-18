import { cn } from "@/libs/utils.ts";
import type { PropsWithChildren } from "react";

type ContentRowElementTextProps = {
  className?: string;
};

export default function ContentRowElementText({
  className,
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
