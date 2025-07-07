import React from "react";
import Link from "next/link";
import { ButtonProps } from "@/lib/props";

const Button = ({
  title,
  icon,
  className = "",
  href,
  target = "_self",
  onClick,
}: ButtonProps) => (
  <Link
    href={href}
    target={target}
    onClick={onClick}
    className={`inline-flex items-center gap-2 
    bg-blue-400 text-white text-base font-semibold 
    px-8 py-3 rounded-lg
    transition hover:bg-blue-500 ${className}`}
    rel={target === "_blank" ? "noopener noreferrer" : undefined}
  >
    <span>{title}</span>
    {icon && <span className="text-md">{icon}</span>}
  </Link>
);

export default Button;
