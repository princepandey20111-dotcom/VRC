import React from 'react';

interface VrcLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

/**
 * Authentic VRC Construction India Ltd Logo
 * Features:
 * - Pure white background square/container
 * - Elegant red oval ring (VRC brand emblem)
 * - Distinctive bold serif "VRC" lettering in company red
 * - Crisp SVG rendering at all scales and in print
 */
export const VrcLogo: React.FC<VrcLogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubtitle = false
}) => {
  // Dimensions per size variant
  const sizeMap = {
    sm: { w: 36, h: 36, textClass: 'text-[11px]' },
    md: { w: 44, h: 44, textClass: 'text-sm' },
    lg: { w: 60, h: 60, textClass: 'text-lg' },
    xl: { w: 84, h: 84, textClass: 'text-2xl' },
  };

  const current = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Official VRC Logo Emblem */}
      <div 
        className="relative bg-white rounded-xl shadow-md border border-slate-200/90 flex items-center justify-center overflow-hidden shrink-0 transition-transform group-hover:scale-105"
        style={{ width: current.w, height: current.h }}
        title="VRC Construction India Ltd"
      >
        <svg 
          viewBox="0 0 160 160" 
          width="100%" 
          height="100%" 
          className="p-1 select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* White Background */}
          <rect width="160" height="160" rx="20" fill="#ffffff" />
          
          {/* Distinctive VRC Red Oval Emblem Ring */}
          <ellipse 
            cx="80" 
            cy="80" 
            rx="66" 
            ry="46" 
            fill="none" 
            stroke="#D32F2F" 
            strokeWidth="5.5" 
          />
          
          {/* Authentic VRC Typography - Classic Bold Serif Construction Font */}
          <text 
            x="80" 
            y="94" 
            textAnchor="middle" 
            fill="#D32F2F" 
            fontFamily="'Times New Roman', 'Playfair Display', Georgia, serif" 
            fontWeight="900" 
            fontSize="44" 
            letterSpacing="2.5"
          >
            VRC
          </text>
        </svg>
      </div>

      {showSubtitle && (
        <div className="flex flex-col">
          <span className="text-xs font-black tracking-wider text-red-600 uppercase">
            VRC
          </span>
          <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-tight">
            Construction India Ltd
          </span>
        </div>
      )}
    </div>
  );
};

export default VrcLogo;
