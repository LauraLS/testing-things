import { type DragEvent } from "react";
import ContentMainRow from "@/components/ContentMainRow.tsx";
import { useEditorStore } from "@/stores/editor-store.ts";

export default function ContentMain() {
  const generalOptions = useEditorStore((state) => state.documentStyle);
  const addSection = useEditorStore((state) => state.addSection);
  const sections = useEditorStore((state) => state.sections);

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    id: string,
    direction: string,
  ) => {
    event.preventDefault();
    const type = JSON.parse(event.dataTransfer.getData("object"))
      .type as string;

    addSection(id, direction, type);
  };

  return (
    <div
      style={{ backgroundColor: generalOptions.backgroundColor }}
      className="w-full"
    >
      {sections.map((section) => {
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
