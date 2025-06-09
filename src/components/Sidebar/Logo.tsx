import React from 'react';

interface LogoProps {
  collapsed?: boolean;
}

const Logo: React.FC<LogoProps> = ({ collapsed = false }) => {
  return (
    <div className="flex items-center justify-center p-4 mb-2">
      <div className={`bg-white/20 rounded-full p-2 w-full flex items-center justify-center ${
        collapsed ? 'aspect-square' : ''
      }`}>
        <span className="text-white font-semibold text-xl">
          {collapsed ? 'L' : 'Logo'}
        </span>
      </div>
    </div>
  );
};

export default Logo;