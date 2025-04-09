import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditorStore } from "@/stores/editor-store.ts";
import type { DragEvent } from "react";
import { Slider } from "@/components/ui/slider";
import { Image, LetterText } from "lucide-react";

export default function AsideMenu() {
  const changeDragSection = useEditorStore((state) => state.changeDragSection);
  const generalOptions = useEditorStore((state) => state.generalOptions);
  const changeGeneralWidth = useEditorStore(
    (state) => state.changeGeneralWidth,
  );
  const changeGeneralBackgroundColor = useEditorStore(
    (state) => state.changeGeneralBackgroundColor,
  );

  const handleDragSectionStart = (event: DragEvent<HTMLDivElement>) => {
    changeDragSection(true);
    const target = event.target as HTMLDivElement;
    event.dataTransfer.setData(
      "object",
      JSON.stringify({ type: target.dataset.type }),
    );
  };

  const handleDragSectionEnd = (event: DragEvent<HTMLDivElement>) => {
    changeDragSection(false);
  };

  const handleDragRowStart = (event: DragEvent<HTMLDivElement>) => {};

  const handleDragRowEnd = (event: DragEvent<HTMLDivElement>) => {};

  return (
    <Tabs defaultValue="rows" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="sections">Sections</TabsTrigger>
        <TabsTrigger value="rows">Rows</TabsTrigger>
        <TabsTrigger value="general">General</TabsTrigger>
      </TabsList>
      <TabsContent
        value="sections"
        className="border border-black rounded p-3 flex flex-col gap-y-2"
      >
        <div
          data-type="1"
          className="h-20 w-full bg-pink-50 py-4 px-8"
          draggable="true"
          onDragStart={handleDragSectionStart}
          onDragEnd={handleDragSectionEnd}
        >
          <div className="h-full w-full bg-gray-300 border border-black/20 border-dashed"></div>
        </div>
        <div
          data-type="2"
          className="h-20 w-full bg-pink-50 py-4 px-8 grid grid-cols-12 gap-x-3"
          draggable="true"
          onDragStart={handleDragSectionStart}
          onDragEnd={handleDragSectionEnd}
        >
          <div className="h-full w-full bg-gray-300 col-span-6 border border-black/20 border-dashed"></div>
          <div className="h-full w-full bg-gray-300 col-span-6 border border-black/20 border-dashed"></div>
        </div>
        <div
          data-type="3"
          className="h-20 w-full bg-pink-50 py-4 px-8 grid grid-cols-12 gap-x-3"
          draggable="true"
          onDragStart={handleDragSectionStart}
          onDragEnd={handleDragSectionEnd}
        >
          <div className="h-full w-full bg-gray-300 col-span-4 border border-black/20 border-dashed"></div>
          <div className="h-full w-full bg-gray-300 col-span-4 border border-black/20 border-dashed"></div>
          <div className="h-full w-full bg-gray-300 col-span-4 border border-black/20 border-dashed"></div>
        </div>
        <div
          data-type="4"
          className="h-20 w-full bg-pink-50 py-4 px-8 grid grid-cols-12 gap-x-3"
          draggable="true"
          onDragStart={handleDragSectionStart}
          onDragEnd={handleDragSectionEnd}
        >
          <div className="h-full w-full bg-gray-300 col-span-3 border border-black/20 border-dashed"></div>
          <div className="h-full w-full bg-gray-300 col-span-3 border border-black/20 border-dashed"></div>
          <div className="h-full w-full bg-gray-300 col-span-3 border border-black/20 border-dashed"></div>
          <div className="h-full w-full bg-gray-300 col-span-3 border border-black/20 border-dashed"></div>
        </div>
      </TabsContent>
      <TabsContent
        value="rows"
        className="border border-black rounded p-3 grid grid-cols-4 gap-3"
      >
        <div
          data-type="1"
          className="w-full aspect-square bg-pink-50 flex justify-center items-center"
          draggable="true"
          onDragStart={handleDragRowStart}
          onDragEnd={handleDragRowEnd}
        >
          <Image strokeWidth={1} size={40} className="" />
        </div>
        <div
          data-type="1"
          className="w-full aspect-square bg-pink-50 flex justify-center items-center"
          draggable="true"
          onDragStart={handleDragRowStart}
          onDragEnd={handleDragRowEnd}
        >
          <LetterText strokeWidth={1} size={40} className="" />
        </div>
        <div
          data-type="1"
          className="w-full aspect-square bg-pink-50 flex justify-center items-center"
          draggable="true"
          onDragStart={handleDragRowStart}
          onDragEnd={handleDragRowEnd}
        >
          <Image strokeWidth={1} size={40} className="" />
        </div>
        <div
          data-type="1"
          className="w-full aspect-square bg-pink-50 flex justify-center items-center"
          draggable="true"
          onDragStart={handleDragRowStart}
          onDragEnd={handleDragRowEnd}
        >
          <LetterText strokeWidth={1} size={40} className="" />
        </div>
        <div
          data-type="1"
          className="w-full aspect-square bg-pink-50 flex justify-center items-center"
          draggable="true"
          onDragStart={handleDragRowStart}
          onDragEnd={handleDragRowEnd}
        >
          <Image strokeWidth={1} size={40} className="" />
        </div>
        <div
          data-type="1"
          className="w-full aspect-square bg-pink-50 flex justify-center items-center"
          draggable="true"
          onDragStart={handleDragRowStart}
          onDragEnd={handleDragRowEnd}
        >
          <LetterText strokeWidth={1} size={40} className="" />
        </div>
        <div
          data-type="1"
          className="w-full aspect-square bg-pink-50 flex justify-center items-center"
          draggable="true"
          onDragStart={handleDragRowStart}
          onDragEnd={handleDragRowEnd}
        >
          <Image strokeWidth={1} size={40} className="" />
        </div>
        <div
          data-type="1"
          className="w-full aspect-square bg-pink-50 flex justify-center items-center"
          draggable="true"
          onDragStart={handleDragRowStart}
          onDragEnd={handleDragRowEnd}
        >
          <LetterText strokeWidth={1} size={40} className="" />
        </div>
      </TabsContent>
      <TabsContent
        value="general"
        className="border border-black rounded p-3 flex flex-col gap-y-2"
      >
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
      </TabsContent>
    </Tabs>
  );
}
