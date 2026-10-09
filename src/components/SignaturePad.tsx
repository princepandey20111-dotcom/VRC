import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Check, PenTool } from 'lucide-react';

interface SignaturePadProps {
  label: string;
  inspectorName: string;
  badgeNumber?: string;
  onSave: (dataUrl: string) => void;
  initialSignature?: string;
  required?: boolean;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  label,
  inspectorName,
  badgeNumber,
  onSave,
  initialSignature,
  required = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high DPI resolution
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Baseline rule
    ctx.strokeStyle = '#334155';
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, rect.height - 35);
    ctx.lineTo(rect.width - 20, rect.height - 35);
    ctx.stroke();
    ctx.setLineDash([]);

    // Watermark text
    ctx.fillStyle = '#475569';
    ctx.font = '11px monospace';
    ctx.fillText(`SIGNATORY: ${inspectorName.toUpperCase()} ${badgeNumber ? `[${badgeNumber}]` : ''}`, 22, rect.height - 15);

    if (initialSignature) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        setHasDrawn(true);
      };
      img.src = initialSignature;
    }
  }, [inspectorName, badgeNumber, initialSignature]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#38bdf8'; // Safety blue-cyan signature stroke
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas && hasDrawn) {
      const dataUrl = canvas.toDataURL('image/png');
      onSave(dataUrl);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Baseline rule
    ctx.strokeStyle = '#334155';
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, rect.height - 35);
    ctx.lineTo(rect.width - 20, rect.height - 35);
    ctx.stroke();
    ctx.setLineDash([]);

    // Watermark text
    ctx.fillStyle = '#475569';
    ctx.font = '11px monospace';
    ctx.fillText(`SIGNATORY: ${inspectorName.toUpperCase()} ${badgeNumber ? `[${badgeNumber}]` : ''}`, 22, rect.height - 15);

    setHasDrawn(false);
    onSave('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase flex items-center gap-1.5">
          <PenTool className="w-3.5 h-3.5 text-amber-400" />
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
        {hasDrawn && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full">
            <Check className="w-3 h-3" /> Signed & Verified
          </span>
        )}
      </div>

      <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-inner">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-36 cursor-crosshair touch-none block"
        />

        <div className="absolute top-2 right-2 flex items-center gap-1">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 text-xs bg-slate-800/90 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition active:scale-95"
            title="Clear Signature"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>
      <p className="text-[11px] text-slate-400">
        By signing on this digital screen, I verify all equipment pre-shift inspection points were physically checked under OSHA / ISO standard.
      </p>
    </div>
  );
};
