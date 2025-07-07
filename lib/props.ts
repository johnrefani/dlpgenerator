export type ButtonProps = {
    title: string; 
    icon?: React.ReactNode;
    className?: string;
    href: string;
    target?: "_self" | "_blank" | "_parent" | "_top"; 
  };

export interface DocxViewerProps {
  docxUrl: string;
  pangalanNgGuro: string;
  petsaAtOras: string;

export interface ButtonProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  href: string;
  target?: "_self" | "_blank";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; 
}
