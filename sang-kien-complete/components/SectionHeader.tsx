import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="border-b-4 border-emerald-100 pb-6 mb-8">
      <h2 className="text-3xl font-black text-slate-800 mb-2">{title}</h2>
      {description && (
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
