import { useEditorStore } from "@/stores/editor-store.ts";
import StepperInput from "@/components/ui/StepperInput.tsx";

export default function AsideMenuGeneralDefault() {
  const generalOptions = useEditorStore((state) => state.documentStyle);
  const changeDocumentStyle = useEditorStore(
    (state) => state.changeDocumentStyle,
  );

  const changeWidthHandle = (value: number) => {
    changeDocumentStyle({ ...generalOptions, width: value });
  };

  const changeBackgroundColorHandle = (value: string) => {
    changeDocumentStyle({ ...generalOptions, backgroundColor: value });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p>Content area width</p>
        <StepperInput
          value={generalOptions.width}
          min={480}
          max={900}
          step={10}
          className=""
          onChange={changeWidthHandle}
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <p>Background color</p>
        <div className="flex items-center justify-between gap-2 border border-black rounded py-1 px-2">
          <input
            type="color"
            value={generalOptions.backgroundColor}
            onChange={(event) =>
              changeBackgroundColorHandle(event.target.value)
            }
          />
          <input
            type="text"
            value={generalOptions.backgroundColor}
            className="w-20 text-center focus:outline-0"
            onChange={(event) =>
              changeBackgroundColorHandle(event.target.value)
            }
          />
        </div>
      </div>
    </>
  );
}
