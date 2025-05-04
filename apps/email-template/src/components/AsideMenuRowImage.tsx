import { type PropsWithChildren, useState } from "react";
import { type Child, useEditorStore } from "@/stores/editor-store.ts";
import StepperInput from "@/components/ui/StepperInput.tsx";
import ImageAlign from "@/components/ui/ImageAlign.tsx";

type AsideMenuSectionImageProps = {
  child: Child;
};

export default function AsideMenuRowImage({
  child,
}: PropsWithChildren<AsideMenuSectionImageProps>) {
  const { value, width, style } = child;
  const { textAlign } = style;
  const changeChildValue = useEditorStore((state) => state.changeChildValue);
  const changeChildWidth = useEditorStore((state) => state.changeChildWidth);
  const changeChildStyle = useEditorStore((state) => state.changeChildStyle);
  const [inputUrlValue, setInputUrlValue] = useState<string>(value ?? "");

  const onBlurUrlHandle = () => {
    changeChildValue(child.id, inputUrlValue);
  };

  const onChangeUrlHandle = (value: string) => {
    setInputUrlValue(value);
  };

  const onChangeWidthHandle = (value: number) => {
    changeChildWidth(child.id, value);
  };

  const onChangeAlignHandle = (value: "left" | "right" | "center") => {
    changeChildStyle(child.id, { ...style, textAlign: value });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 w-full col-span-4 border-b border-black pb-4">
        <p>Url</p>
        <div className="flex items-center justify-between gap-2 w-96 border border-black rounded py-1 px-2">
          <input
            className="focus:outline-0 w-full"
            type="text"
            value={inputUrlValue}
            onChange={(event) => onChangeUrlHandle(event.target.value)}
            onBlur={onBlurUrlHandle}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 w-full col-span-4 border-b border-black pb-4">
        <p>Width</p>
        <StepperInput
          value={width}
          min={1}
          max={100}
          step={10}
          onChange={(event) => onChangeWidthHandle(event)}
        />
      </div>
      <div className="flex items-center justify-between gap-4 w-full col-span-4 border-b border-black pb-4">
        <p>Align</p>
        <ImageAlign
          value={textAlign as "center" | "left" | "right"}
          onChange={onChangeAlignHandle}
        />
      </div>
    </>
  );
}
