import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type Child,
  type Section2,
  useEditorStore,
} from "@/stores/editor-store.ts";
import { type PropsWithChildren } from "react";
import AsideMenuSectionDefault from "@/components/AsideMenuSectionDefault";
import AsideMenuRowText from "@/components/AsideMenuRowText.tsx";
import AsideMenuRowDefault from "@/components/AsideMenuRowDefault.tsx";
import AsideMenuGeneralDefault from "@/components/AsideMenuGeneralDefault.tsx";
import AsideMenuRowImage from "@/components/AsideMenuRowImage.tsx";

type MenuSectionElementProps = {
  section: Section2 | undefined;
};

type MenuRowElementProps = {
  child: Child | undefined;
};

function MenuSectionElement({
  section,
}: PropsWithChildren<MenuSectionElementProps>) {
  return <AsideMenuSectionDefault />;
}

function MenuRowElement({ child }: PropsWithChildren<MenuRowElementProps>) {
  switch (child?.type) {
    case "text":
      return <AsideMenuRowText child={child} />;
    case "image":
      return <AsideMenuRowImage child={child} />;
    default:
      return <AsideMenuRowDefault />;
  }
}

export default function AsideMenu() {
  const focusRow = useEditorStore((state) => state.focusRow);
  const focusSection = useEditorStore((state) => state.focusSection);

  return (
    <Tabs defaultValue="sections" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="sections">Sections</TabsTrigger>
        <TabsTrigger value="rows">Rows</TabsTrigger>
        <TabsTrigger value="general">General</TabsTrigger>
      </TabsList>
      <TabsContent
        value="sections"
        className="border border-black rounded p-3 flex flex-col gap-y-2"
      >
        <MenuSectionElement section={focusSection} />
      </TabsContent>
      <TabsContent
        value="rows"
        className="border border-black rounded p-3 grid grid-cols-4 gap-3"
      >
        <MenuRowElement child={focusRow} />
      </TabsContent>
      <TabsContent
        value="general"
        className="border border-black rounded p-3 flex flex-col gap-y-2"
      >
        <AsideMenuGeneralDefault />
      </TabsContent>
    </Tabs>
  );
}
