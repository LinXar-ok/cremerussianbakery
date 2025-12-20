import React, { ReactNode } from "react";

interface PageDecoratorProps {
  children: ReactNode;
  variant?: "default" | "gradient-border" | "full-bleed";
  className?: string;
}

export function PageDecorator({
  children,
  variant = "default",
  className = "",
}: PageDecoratorProps) {
  const variants = {
    default: <div className={`relative ${className}`}>{children}</div>,
    "gradient-border": (
      <div className={`relative ${className}`}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary-100 via-primary to-primary-300"></div>
        {children}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary-100 via-primary to-primary-300"></div>
      </div>
    ),
    "full-bleed": (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-pink-300/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-amber-300/10 rounded-full blur-3xl"></div>
        {children}
      </div>
    ),
  };

  return variants[variant];
}
