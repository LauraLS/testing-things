import { type PropsWithChildren } from "react";
import { type Child } from "@/stores/editor-store.ts";
import ContentRowElementEmpty from "@/components/ContentRowElementEmpty.tsx";
import ContentRowElementText from "@/components/ContentRowElementText.tsx";
import ContentRowElementImage from "@/components/ContentRowElementImage.tsx";
import ContentRowElementHeading from "@/components/ContentRowElementHeading.tsx";

type ContentElementRowProps = {
  child: Child;
};

const getGridSpan = (variant: any) => {
  if (variant === "2") return "col-span-6";
  if (variant === "3") return "col-span-4";
  if (variant === "4") return "col-span-3";
  return "col-span-12";
};

function ElementComponent({
  child,
  className,
}: PropsWithChildren<{ child: Child; className: string }>) {
  const { type } = child;

  switch (type) {
    case "text":
      return <ContentRowElementText child={child} className={className} />;
    case "image":
      return <ContentRowElementImage child={child} className={className} />;
    case "heading":
      return <ContentRowElementHeading child={child} className={className} />;
    default:
      return <ContentRowElementEmpty child={child} className={className} />;
  }
}

export default function ContentRowElement({
  child,
}: PropsWithChildren<ContentElementRowProps>) {
  return (
    <ElementComponent
      child={child}
      className={`${getGridSpan(child.column)} relative w-full`}
    />
  );
}
