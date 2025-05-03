import { Slider } from "@/components/ui/slider.tsx";
import { useEditorStore } from "@/stores/editor-store.ts";

export default function AsideMenuGeneralDefault() {
  const generalOptions = useEditorStore((state) => state.generalOptions);
  const changeGeneralWidth = useEditorStore(
    (state) => state.changeGeneralWidth,
  );
  const changeGeneralBackgroundColor = useEditorStore(
    (state) => state.changeGeneralBackgroundColor,
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <p>Content area width</p>
        <Slider
          value={[generalOptions.width]}
          min={480}
          max={900}
          step={1}
          className=""
          onValueChange={(value) => changeGeneralWidth(value[0])}
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <p>Background color</p>
        <div className="flex items-center justify-between gap-2 border border-black rounded py-1 px-2">
          <input
            type="color"
            value={generalOptions.backgroundColor}
            onChange={(event) =>
              changeGeneralBackgroundColor(event.target.value)
            }
          />
          <input
            type="text"
            value={generalOptions.backgroundColor}
            className="w-20 text-center focus:outline-0"
            onChange={(event) =>
              changeGeneralBackgroundColor(event.target.value)
            }
          />
        </div>
      </div>
    </>
  );
}
