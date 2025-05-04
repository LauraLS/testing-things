import ContentMain from "@/components/ContentMain";
import AsideMenu from "@/components/aside/AsideMenu.tsx";
import { useEditorStore } from "@/stores/editor-store.ts";
import { Button } from "@/components/ui/button.tsx";

export default function App() {
  const onFocusElement = useEditorStore((state) => state.onFocusElement);
  const sections = useEditorStore((state) => state.sections);
  const documentStyle = useEditorStore((state) => state.documentStyle);

  const onClickHandler = (event: any) => {
    const id = event.target.id;
    if (!id) return;
    if (!id.startsWith("row-") && !id.startsWith("section-")) return;
    const [type, ...elementId] = id.split("-");
    onFocusElement(elementId.join("-"), type);
  };

  const onMouseOverHandler = () => {};

  const onClickDownloadButton = () => {
    const body = {
      sections: sections,
      documentStyle: documentStyle,
    };

    fetch("/api/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => console.log(json.render))
      .catch(console.error);
  };

  return (
    <div
      onMouseOver={onMouseOverHandler}
      onClick={onClickHandler}
      className="grid grid-cols-12 w-full gap-2"
    >
      <header className="col-span-12 w-full bg-gray-300 p-4">
        <nav className="flex flex-row gap-2 items-center">
          <a href="/">Home</a>
          <p>Version 2</p>
          <Button onClick={onClickDownloadButton}>Download template</Button>
        </nav>
      </header>
      <section className="col-span-9">
        <ContentMain />
      </section>
      <section className="col-span-3 sticky self-start top-2">
        <AsideMenu />
      </section>
    </div>
  );
}
