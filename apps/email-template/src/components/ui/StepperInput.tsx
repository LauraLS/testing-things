import { type PropsWithChildren } from "react";
import { cn } from "@/libs/utils.ts";

type StepperInputProps = {
  className?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export default function StepperInput({
  className = "",
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: PropsWithChildren<StepperInputProps>) {
  const calculateValue = (value: number) => {
    const newValue = +(Math.round(value * 10) / 10).toFixed(1);
    if (newValue > max) return max;
    if (newValue < min) return min;
    return newValue;
  };

  return (
    <div className={cn("grid grid-cols-4", className)}>
      <button
        onClick={() => onChange?.(calculateValue(value - step))}
        className="col-span-1 flex items-center justify-center border-l border-t border-b border-black px-2 py-1 rounded-l cursor-pointer"
      >
        -
      </button>
      <input
        className="col-span-2 text-center border border-black"
        id="number"
        type="number"
        value={value}
        onChange={(event) => onChange?.(event.target.valueAsNumber)}
        min={min}
        max={max}
        step={step}
      />
      <button
        onClick={() => onChange?.(calculateValue(value + step))}
        className="col-span-1 flex items-center justify-center border-r border-t border-b border-black px-2 py-1 rounded-r cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
