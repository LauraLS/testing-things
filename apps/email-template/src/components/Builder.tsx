import Row from "@/components/ui/Row.tsx";
import { useEditorStore } from "@/stores/editor-store.ts";
import Column from "@/components/ui/Column.tsx";
import { ButtonAddElement } from "@/components/ButtonAddElement.tsx";

const colSpanVariants = {
  "100%": "col-span-12",
  "66.67%": "col-span-8",
  "50%": "col-span-6",
  "33.33%": "col-span-4",
  "25%": "col-span-3",
} as const;

export default function Builder() {
  const sections = useEditorStore((state) => state.sections);
  const addSection = useEditorStore((state) => state.addSection);

  const handleAddElement = (id: string) => {
    addSection(id);
  };

  return (
    <div className="bg-white">
      {sections.map((child: any) => {
        const { section } = child;
        return section.children.map((child: any) => {
          const { row } = child;
          const { id } = row;
          return (
            <Row
              className="grid grid-cols-12 gap-4 px-4 pt-4 relative bg-indigo-400"
              key={id}
            >
              {row.children.map((child: any) => {
                const { column } = child;
                const { style: stileColumn, id } = column;
                const { width } = stileColumn;
                return (
                  <Column
                    className={`relative ${colSpanVariants[width as keyof typeof colSpanVariants] ?? "col-span-12"} flex 
                  justify-center items-center h-[92px] bg-indigo-200 border border-dashed border-indigo-600 rounded 
                  text-center text-indigo-600 font-extralight text-xs hover:border-solid`}
                    key={id}
                  />
                );
              })}
              <ButtonAddElement className="h-full w-full border-solid border-2 border-black absolute top-0 left-0" />
            </Row>
          );
        });
      })}
    </div>
  );
}
