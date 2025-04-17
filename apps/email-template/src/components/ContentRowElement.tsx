import { type DragEvent, type PropsWithChildren, useState } from "react";
import { useEditorStore } from "@/stores/editor-store.ts";
import ContentRowElementEmpty from "@/components/ui/ContentRowElementEmpty.tsx";
import ContentRowElementText from "@/components/ui/ContentRowElementText.tsx";
import ContentRowElementImage from "@/components/ui/ContentRowElementImage.tsx";

type ContentElementRowProps = {
  variant: string;
};

const getGridSpan = (variant: any) => {
  if (variant === "2") return "col-span-6";
  if (variant === "3") return "col-span-4";
  if (variant === "4") return "col-span-3";
  return "col-span-12";
};

const getBorderStyle = (isDragging: boolean) => {
  if (isDragging) return "border-2 border-solid border-gray-500";
  return "border border-dashed border-gray-500";
};

const getDragOverColor = (isDragging: boolean) => {
  if (isDragging) return "bg-indigo-400";
  return "bg-transparent";
};

function ElementComponent({
  variant,
  className,
}: PropsWithChildren<{ variant: string | undefined; className: string }>) {
  switch (variant) {
    case "text":
      return <ContentRowElementText />;
    case "image":
      return <ContentRowElementImage />;
    default:
      return <ContentRowElementEmpty className={className} />;
  }
}

export default function ContentRowElement({
  variant,
}: PropsWithChildren<ContentElementRowProps>) {
  const dragRow = useEditorStore((state) => state.dragRow);
  const [over, setOver] = useState<boolean>(false);
  const [component, setComponent] = useState<string | undefined>(undefined);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOver(false);
    const type = JSON.parse(event.dataTransfer.getData("object"))
      .type as string;
    setComponent(type);
  };

  return (
    <div className={`${getGridSpan(variant)} relative w-full`}>
      <ElementComponent
        variant={component}
        className={getBorderStyle(dragRow)}
      />
      {!component && dragRow && (
        <div
          className={`${getDragOverColor(over)} absolute top-0 left-0 w-full h-full flex gap-2 items-center justify-center bg-indigo-400/60`}
          onDragOver={(event) => handleDragOver(event)}
          onDragLeave={(event) => handleDragLeave(event)}
          onDrop={(event) => handleDrop(event)}
        ></div>
      )}
    </div>
  );
}
