"use client"

import { useRef, useEffect, useState, useCallback } from "react";
import { renderAsync } from "docx-preview";
import { DocxPreviewerProps } from "@/lib/props";

export default function DocxPreviewer({ blob }: DocxPreviewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 297, height: 210 });
  const [scale, setScale] = useState(1); // Initialize scale
  const [error, setError] = useState<string | null>(null);

  const mmToPx = useCallback((mm: number) => mm * 3.779527559, []); // Memoize mmToPx

  useEffect(() => {
    async function render() {
      if (!containerRef.current) return;

      try {
        // Clear container safely
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }

        await renderAsync(blob, containerRef.current, undefined, {
          ignoreWidth: false,
          ignoreHeight: false,
          breakPages: true,
          renderHeaders: true,
          renderFooters: true,
          renderFootnotes: true,
          renderEndnotes: true,
          ignoreLastRenderedPageBreak: true,
          ignoreFonts: false,
          useBase64URL: true,
          experimental: true,
          className: "docx",
          inWrapper: true,
          trimXmlDeclaration: true,
          debug: false,
        });

        const firstPage = containerRef.current.querySelector(".page");
        if (firstPage instanceof HTMLElement) {
          const computedStyle = window.getComputedStyle(firstPage);
          setDimensions({
            width: parseFloat(computedStyle.width),
            height: parseFloat(computedStyle.height),
          });
        }

        const pages = containerRef.current.querySelectorAll(".page");
        pages.forEach((page) => {
          if (page instanceof HTMLElement) {
            page.style.width = `${dimensions.width}px`;
            page.style.height = `${dimensions.height}px`;
            page.style.margin = "0 auto";
            page.style.padding = "0";
            page.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
            page.style.overflow = "hidden";
            page.style.backgroundColor = "white";
            page.style.position = "relative";
          }
        });

        if (containerRef.current) {
          containerRef.current.style.width = "100%";
          containerRef.current.style.maxWidth = `${dimensions.width}px`;
          containerRef.current.style.margin = "0 auto";
          containerRef.current.style.padding = "20px 0";
          containerRef.current.style.backgroundColor = "#f5f5f5";
        }

      } catch (err: unknown) {
        console.error("Rendering error:", err);
        setError("Failed to render document preview");
      }
    }

    render().catch((err: unknown) => {
      console.error("Render error:", err);
      setError("Failed to render document");
    });
  }, [blob]);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;

      const windowWidth = window.innerWidth;
      const documentWidth = mmToPx(dimensions.width);

      const newScale = windowWidth < documentWidth ? windowWidth / documentWidth : 1;
      setScale(newScale);

      containerRef.current.style.transform = `scale(${newScale})`;
      containerRef.current.style.transformOrigin = "top center";
      containerRef.current.style.height = newScale < 1 ? `${mmToPx(dimensions.height) / newScale}px` : "auto";
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, [dimensions, mmToPx]); // Add mmToPx to dependencies

  if (error) {
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded w-full text-center min-h-screen">
        {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="docx-render-container w-full"
      style={{
        background: "#f5f5f5",
        transition: "transform 0.2s ease",
      }}
    />
  );
}
