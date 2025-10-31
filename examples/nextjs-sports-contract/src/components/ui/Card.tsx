import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Card({ children, title, subtitle, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>{children}</div>;
}
