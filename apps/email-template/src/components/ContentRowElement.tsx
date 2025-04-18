import { type DragEvent, type PropsWithChildren, useState } from "react";
import { type Child, useEditorStore } from "@/stores/editor-store.ts";
import ContentRowElementEmpty from "@/components/ContentRowElementEmpty.tsx";
import ContentRowElementText from "@/components/ContentRowElementText.tsx";
import ContentRowElementImage from "@/components/ContentRowElementImage.tsx";

type ContentElementRowProps = {
  child: Child;
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
  child,
}: PropsWithChildren<ContentElementRowProps>) {
  const dragRow = useEditorStore((state) => state.dragRow);
  const changeChildType = useEditorStore((state) => state.changeChildType);
  const [over, setOver] = useState<boolean>(false);

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
    changeChildType(child.id, type);
  };

  return (
    <div className={`${getGridSpan(child.column)} relative w-full`}>
      <ElementComponent
        variant={child.type}
        className={getBorderStyle(dragRow)}
      />
      {!child.type && dragRow && (
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
