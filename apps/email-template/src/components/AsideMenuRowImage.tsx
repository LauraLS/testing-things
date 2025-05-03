import { type PropsWithChildren, useState } from "react";
import { type Child, useEditorStore } from "@/stores/editor-store.ts";

type AsideMenuSectionImageProps = {
  child: Child;
};

export default function AsideMenuRowImage({
  child,
}: PropsWithChildren<AsideMenuSectionImageProps>) {
  const changeChildStyle = useEditorStore((state) => state.changeChildStyle);
  const { style } = child;
  const { url } = style;
  const [urlState, setUrlState] = useState(url);

  const onChangeUrl = (value: string) => {
    changeChildStyle(child.id, { ...style, url: value });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 w-full col-span-4 border-b border-black pb-4">
        <p>Url</p>
        <div className="flex items-center justify-between gap-2 w-96 border border-black rounded py-1 px-2">
          <input
            className="focus:outline-0 w-full"
            type="text"
            value={urlState}
            onChange={(event) => setUrlState(event.target.value)}
            onBlur={(event) => onChangeUrl(event.target.value)}
          />
        </div>
      </div>
    </>
  );
}
