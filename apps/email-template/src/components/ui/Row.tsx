import { useState, type PropsWithChildren, useRef, useCallback } from "react";

type RowProps = {
  className?: string;
};

export default function Row({
  children,
  className,
}: PropsWithChildren<RowProps>) {
  const [isHovered, setIsHovered] = useState(false);
  const parentRef = useRef(null);

  const handleMouseOver = useCallback((e: any) => {
    const isHovered = e.target === parentRef.current;
    setIsHovered(isHovered);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={parentRef}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={`${className} ${isHovered ? "bg-red-400" : ""} relative`}
    >
      {children}
    </div>
  );
}
