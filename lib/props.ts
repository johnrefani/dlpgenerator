
export type ButtonProps = {
    title: string; 
    icon?: React.ReactNode;
    className?: string;
    href: string;
    target?: "_self" | "_blank" | "_parent" | "_top"; 
  };

export interface DocxViewerProps {
  pangalanNgGuro: string;
  petsaAtOras: string;
  baitang: string;
  asignatura: string;
  markahan: string;
  docxUrl: string;
}