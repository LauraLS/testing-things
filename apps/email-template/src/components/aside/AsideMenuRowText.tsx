import { type Child, useEditorStore } from "@/stores/editor-store.ts";
import type { PropsWithChildren } from "react";
import StepperInput from "@/components/ui/StepperInput.tsx";
import TextAlign from "@/components/ui/TextAlign.tsx";

type AsideMenuSectionTextProps = {
  child: Child;
};

export default function AsideMenuRowText({
  child,
}: PropsWithChildren<AsideMenuSectionTextProps>) {
  const changeChildStyle = useEditorStore((state) => state.changeChildStyle);
  const { style } = child;
  const { fontSize, color, lineHeight, textAlign } = style;

  const onChangeFontSize = (value: number) => {
    changeChildStyle(child.id, { ...style, fontSize: value });
  };

  const onChangeColor = (value: string) => {
    changeChildStyle(child.id, { ...style, color: value });
  };

  const onChangeFontWeight = (value: string) => {
    changeChildStyle(child.id, { ...style, fontWeight: value });
  };

  const onChangeParagraphSpacing = (value: number) => {
    changeChildStyle(child.id, { ...style, lineHeight: value });
  };

  const onChangeTextAlign = (
    value: "left" | "right" | "center" | "justify",
  ) => {
    changeChildStyle(child.id, { ...style, textAlign: value });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 w-full col-span-4 border-b border-black pb-4">
        <p>Font size</p>
        <StepperInput
          value={fontSize}
          min={6}
          max={42}
          step={0.2}
          className="w-32"
          onChange={(value) => onChangeFontSize(value)}
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
      <div className="flex items-center justify-between gap-4 w-full col-span-4 border-b border-black pb-4">
        <p>Paragraph spacing</p>
        <StepperInput
          value={lineHeight}
          min={0.5}
          max={3}
          step={0.1}
          className="w-32"
          onChange={(value) => onChangeParagraphSpacing(value)}
        />
      </div>
      <div className="flex items-center justify-between gap-4 w-full col-span-4 border-b border-black pb-4">
        <p>Text align</p>
        <TextAlign className={textAlign} onChange={onChangeTextAlign} />
      </div>
    </>
  );
}
