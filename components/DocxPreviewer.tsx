"use client";

import { useRef, useEffect, useState } from "react";
import { renderAsync } from "docx-preview";
import { DocxPreviewerProps } from "@/lib/props";

export default function DocxPreviewer({ blob }: DocxPreviewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const mmToPx = (mm: number) => mm * 3.779527559;

  const updateScale = () => {
    if (!containerRef.current) return;

    const viewportWidth = window.innerWidth;
    const maxDocWidth = mmToPx(297);
    const padding = 40;
    const availableWidth = viewportWidth - padding;

    const newScale = Math.min(1, availableWidth / maxDocWidth);
    setScale(newScale);
  };

  useEffect(() => {
    updateScale();

    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    async function render() {
      if (!containerRef.current) return;

      try {
        containerRef.current.innerHTML = "";

        await renderAsync(blob, containerRef.current, undefined, {
          ignoreWidth: false,
          ignoreHeight: true,
          breakPages: false,
          renderHeaders: true,
          renderFooters: true,
          renderFootnotes: true,
          renderEndnotes: true,
          ignoreLastRenderedPageBreak: false,
          ignoreFonts: false,
          useBase64URL: true,
          experimental: true,
          className: "docx",
          inWrapper: true,
          trimXmlDeclaration: true,
          debug: false,
        });

        const naturalHeight = containerRef.current.scrollHeight;
        const bottomMargin = 50;
        const scaledHeight = (naturalHeight + bottomMargin) * scale;

        containerRef.current.style.width = `${mmToPx(297)}px`;
        containerRef.current.style.maxWidth = "none";
        containerRef.current.style.margin = "0 auto 20px";
        containerRef.current.style.padding = "20px 0";
        containerRef.current.style.backgroundColor = "#f5f5f5";
        containerRef.current.style.transform = `scale(${scale})`;
        containerRef.current.style.transformOrigin = "top center";
        containerRef.current.style.overflow = "visible";

        const parentContainer = containerRef.current.parentElement;
        if (parentContainer) {
          parentContainer.style.height = `${scaledHeight + 40}px`;
          parentContainer.style.minHeight = "auto";
        }
      } catch (err) {
        console.error("Rendering error:", err);
        setError("Failed to render document preview");
      }
    }

    render().catch((err) => {
      console.error("Render error:", err);
      setError("Failed to render document");
    });
  }, [blob, scale]);

  if (error) {
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded w-full text-center min-h-screen">
        {error}
      </div>
    );
  }

  return (
    <div
      className="docx-render-container w-full flex justify-center overflow-hidden"
      style={{
        background: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      <div
        ref={containerRef}
        className="docx-wrapper"
        style={{
          width: `${mmToPx(297)}px`,
        }}
      />
    </div>
  );
} 