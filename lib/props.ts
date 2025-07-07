export interface DocxViewerProps {
  docxUrl: string;
  pangalanNgGuro: string;
  petsaAtOras: string;
};
export interface ButtonProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  href: string;
  target?: "_self" | "_blank";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; 
};
