import { cn } from "@/libs/utils";
import type { PropsWithChildren } from "react";

type ContentRowElementImageProps = {
  className?: string;
};

export default function ContentRowElementImage({
  className,
}: PropsWithChildren<ContentRowElementImageProps>) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center h-20 bg-gray-300",
        className,
      )}
    >
      <p className="text-center">Esto es un block de imagen</p>
    </div>
  );
}
