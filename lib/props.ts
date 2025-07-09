export interface ButtonProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  href: string;
  target?: "_self" | "_blank";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; 
};
export interface DocxPreviewerProps {
  blob: Blob;
}
export interface DocxViewerProps {
  cloudUrl: string;
  paaralan: string;
  pangalanNgGuro: string;
  petsaAtOras: string;
  code: string;
}
export interface LoadingPopupProps {
  isOpen: boolean;
}
export interface DLLData {
  code: string;
  baitang: string;
  asignatura: string;
  markahan: string;
  dllLink: string;
}
