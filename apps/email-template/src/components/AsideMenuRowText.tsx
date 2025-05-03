import { type Child, useEditorStore } from "@/stores/editor-store.ts";
import type { PropsWithChildren } from "react";
import { Slider } from "@/components/ui/slider.tsx";

type AsideMenuSectionTextProps = {
  child: Child;
};

export default function AsideMenuRowText({
  child,
}: PropsWithChildren<AsideMenuSectionTextProps>) {
  const changeChildStyle = useEditorStore((state) => state.changeChildStyle);
  const { style } = child;
  const { fontSize, color } = style;

  const onChangeFontSize = (value: number) => {
    changeChildStyle(child.id, { ...style, fontSize: value });
  };

  const onChangeColor = (value: string) => {
    changeChildStyle(child.id, { ...style, color: value });
  };

  const onChangeFontWeight = (value: string) => {
    changeChildStyle(child.id, { ...style, fontWeight: value });
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full col-span-4 border-b border-black pb-4">
        <p>Font size</p>
        <Slider
          value={[fontSize]}
          min={6}
          max={42}
          step={1}
          className="w-full"
          onValueChange={(value) => onChangeFontSize(value[0])}
        />
      </div>
      <div className="flex items-center justify-between gap-4 w-full col-span-4 border-b border-black pb-4">
        <p>Text Color</p>
        <div className="flex items-center justify-between gap-2 w-40 border border-black rounded py-1 px-2">
          <input
            type="color"
            value={color}
            onChange={(event) => onChangeColor(event.target.value)}
          />
          <input
            type="text"
            value={color}
            className="w-20 text-center focus:outline-0"
            onChange={(event) => onChangeColor(event.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 w-full col-span-4 border-b border-black pb-4">
        <p>Font weight</p>
        <select
          className="w-40 border border-black rounded py-2 px-2 focus:outline-0"
          onChange={(event) => onChangeFontWeight(event.target.value)}
        >
          <option value="normal">Regular</option>
          <option value="bold">Bold</option>
        </select>
      </div>
    </>
  );
}
