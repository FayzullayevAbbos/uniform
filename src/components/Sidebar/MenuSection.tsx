import React from 'react';

interface MenuSectionProps {
  title?: string;
  children: React.ReactNode;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-4">
      {title && (
        <h3 className="px-4 py-2 text-xs font-medium text-white/50 uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

export default MenuSection;