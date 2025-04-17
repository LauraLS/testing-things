import { cn } from "@/libs/utils.ts";
import type { PropsWithChildren } from "react";

type ContentRowElementEmptyProps = {
  className?: string;
};

export default function ContentRowElementEmpty({
  className,
}: PropsWithChildren<ContentRowElementEmptyProps>) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center h-20 bg-gray-300",
        className,
      )}
    >
      <p className="text-center">Drop content blocks here</p>
    </div>
  );
}
