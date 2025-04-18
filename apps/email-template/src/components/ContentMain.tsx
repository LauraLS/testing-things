import { type DragEvent } from "react";
import ContentMainRow from "@/components/ContentMainRow.tsx";
import { useEditorStore } from "@/stores/editor-store.ts";

export default function ContentMain() {
  const generalOptions = useEditorStore((state) => state.generalOptions);
  const addSection2 = useEditorStore((state) => state.addSection2);
  const sections2 = useEditorStore((state) => state.sections2);

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    id: string,
    direction: string,
  ) => {
    event.preventDefault();
    const type = JSON.parse(event.dataTransfer.getData("object"))
      .type as string;

    addSection2(id, direction, type);
  };

  return (
    <div
      style={{ backgroundColor: generalOptions.backgroundColor }}
      className="w-full"
    >
      {sections2.map((section: any) => {
        const { id } = section;
        return (
          <ContentMainRow
            key={id}
            id={id}
            section={section}
            onDrop={handleDrop}
          />
        );
      })}
    </div>
  );
}
