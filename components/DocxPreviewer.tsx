"use client"

import { useRef, useEffect, useState } from "react";
import { renderAsync } from "docx-preview";
import { DocxPreviewerProps } from "@/lib/props";

export default function DocxPreviewer({ blob }: DocxPreviewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: '297mm', height: '210mm' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function render() {
      if (!containerRef.current) return;
      
      try {
        containerRef.current.innerHTML = "";
        
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

        const firstPage = containerRef.current.querySelector('.page');
        if (firstPage) {
          const computedStyle = window.getComputedStyle(firstPage);
          setDimensions({
            width: computedStyle.width,
            height: computedStyle.height
          });
        }

        const pages = containerRef.current.querySelectorAll('.page');
        pages.forEach(page => {
          const pageElement = page as HTMLElement;
          pageElement.style.width = dimensions.width;
          pageElement.style.height = dimensions.height;
          pageElement.style.margin = '0 auto';
          pageElement.style.padding = '0';
          pageElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
          pageElement.style.overflow = 'hidden';
          pageElement.style.backgroundColor = 'white';
          pageElement.style.position = 'relative';
        });

        // Adjust container to fit document
        containerRef.current.style.width = '100%';
        containerRef.current.style.maxWidth = dimensions.width;
        containerRef.current.style.margin = '0 auto';
        containerRef.current.style.padding = '20px 0';
        containerRef.current.style.backgroundColor = '#f5f5f5';

      } catch (err) {
        console.error("Rendering error:", err);
        setError("Failed to render document preview");
      }
    }

    render().catch(err => {
      console.error("Render error:", err);
      setError("Failed to render document");
    });
  }, [blob, dimensions]);

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
        background: '#f5f5f5',
      }}
    />
  );
}