import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { PropsWithChildren } from "react";

type ButtonAddElementProps = {
  className?: string;
};

export const ButtonAddElement = ({
  className,
}: PropsWithChildren<ButtonAddElementProps>) => {
  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild className="bottom-0 -left-12 absolute">
          <Button variant="outline"> + </Button>
        </PopoverTrigger>
        <PopoverContent className="">
          <span>Add element</span>
        </PopoverContent>
      </Popover>
    </div>
  );
};
