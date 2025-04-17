import { cn } from "@/libs/utils.ts";
import type { PropsWithChildren } from "react";

type ContentRowElementTextProps = {
  className?: string;
};

export default function ContentRowElementText({
  className,
}: PropsWithChildren<ContentRowElementTextProps>) {
  return (
    <div className={cn("hover:bg-gray-100", className)}>
      <p contentEditable={true} className="">
        New paragraph
      </p>
    </div>
  );
}
