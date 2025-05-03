import { cn } from "@/libs/utils.ts";
import type { PropsWithChildren } from "react";
import type { Child } from "@/stores/editor-store.ts";

type ContentRowElementImageProps = {
  className?: string;
  child: Child;
};

export default function ContentRowElementImage({
  className,
  child,
}: PropsWithChildren<ContentRowElementImageProps>) {
  return (
    <div
      id={`row-${child.id}`}
      className={cn(
        "flex flex-col justify-center items-center h-20 bg-gray-300",
        className,
      )}
    >
      <p className="text-center">Esto es un block de imagen</p>
    </div>
  );
}
