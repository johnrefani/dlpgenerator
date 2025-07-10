"use client"

import { useRef, useEffect } from "react";
import { renderAsync } from "docx-preview";
import { DocxPreviewerProps } from "@/lib/props";

export default function DocxPreviewer({ blob }: DocxPreviewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function render() {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = "";
      await renderAsync(blob, containerRef.current, undefined, {
        ignoreWidth: false,
        ignoreHeight: false,
        breakPages: true,
        renderHeaders: true,
        renderFooters: true,
        renderFootnotes: true,
        renderEndnotes: true,
        renderComments: false,
        ignoreFonts: false,
        useBase64URL: false,
        debug: false,
      });

      const pages = containerRef.current.querySelectorAll('.page');
      pages.forEach(page => {
        (page as HTMLElement).style.width = '297mm';
        (page as HTMLElement).style.height = '210mm';
        (page as HTMLElement).style.margin = '10px auto';
        (page as HTMLElement).style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
      });
    }
    render().catch(console.error);
  }, [blob]);

  return (
    <div 
      ref={containerRef} 
      className="docx-render-container w-full"
    />
  );
}