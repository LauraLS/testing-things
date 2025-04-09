import { type DragEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ContentMainRow from "@/components/ContentMainRow.tsx";
import { useEditorStore } from "@/stores/editor-store.ts";

export default function ContentMain() {
  const generalOptions = useEditorStore((state) => state.generalOptions);
  const [rows, setRows] = useState([{ id: uuidv4(), type: "1" }]);

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    id: string,
    direction: string,
  ) => {
    event.preventDefault();
    const type = JSON.parse(event.dataTransfer.getData("object"))
      .type as string;
    const index = rows.findIndex((row) => row.id === id);
    const newRows = [...rows];

    if (direction === "up") newRows.splice(index, 0, { id: uuidv4(), type });
    if (direction === "down")
      newRows.splice(index + 1, 0, { id: uuidv4(), type });

    setRows(newRows);
  };

  return (
    <div
      style={{ backgroundColor: generalOptions.backgroundColor }}
      className="overflow-scroll w-full h-full"
    >
      {rows.map(({ id, type }) => (
        <ContentMainRow key={id} id={id} variant={type} onDrop={handleDrop} />
      ))}
    </div>
  );
}
