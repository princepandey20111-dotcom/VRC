import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, X, Check, RefreshCw, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { SAMPLE_DEFECT_PHOTOS } from '../data/machineryData';

interface PhotoCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoCaptured: (photoDataUrl: string) => void;
  itemName: string;
}

export const PhotoCaptureModal: React.FC<PhotoCaptureModalProps> = ({
  isOpen,
  onClose,
  onPhotoCaptured,
  itemName,
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'samples'>('camera');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [annotationColor, setAnnotationColor] = useState<'#ef4444' | '#f59e0b' | '#38bdf8'>('#ef4444');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access not supported on this browser. Use file upload or sample photos.');
        setActiveTab('samples');
        return;
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' }, // Back camera for machinery inspection
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.warn('Camera error:', err);
      setCameraError('Could not access device camera. Permissions may be denied. Try File Upload or Samples.');
      setActiveTab('samples');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Add timestamp watermark
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, canvas.height - 36, canvas.width, 36);
    ctx.fillStyle = '#f59e0b';
    ctx.font = '14px monospace';
    ctx.fillText(`DEFECT AUDIT: ${new Date().toLocaleString()} | ${itemName}`, 14, canvas.height - 13);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setCapturedImage(dataUrl);
    stopCamera();
    initAnnotationCanvas(dataUrl);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCapturedImage(result);
      initAnnotationCanvas(result);
    };
    reader.readAsDataURL(file);
  };

  const selectSamplePhoto = (sampleUrl: string) => {
    // Load image onto canvas to watermark
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = 'rgba(0,0,0,0.65)';
        ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`EQUIPCHECK VERIFIED: ${new Date().toLocaleDateString()} | ${itemName}`, 16, canvas.height - 15);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedImage(dataUrl);
        initAnnotationCanvas(dataUrl);
      }
    };
    img.src = sampleUrl;
  };

  const initAnnotationCanvas = (imgSrc: string) => {
    setIsAnnotating(true);
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = imgSrc;
    }, 100);
  };

  // Simple marker drawing on defect image
  const [isDrawing, setIsDrawing] = useState(false);

  const getCanvasPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    } else if ('clientX' in e) {
      return {
        x: ((e as React.MouseEvent).clientX - rect.left) * scaleX,
        y: ((e as React.MouseEvent).clientY - rect.top) * scaleY,
      };
    }
    return { x: 0, y: 0 };
  };

  const startMarker = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.strokeStyle = annotationColor;
    setIsDrawing(true);
  };

  const drawMarker = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopMarker = () => {
    setIsDrawing(false);
  };

  const handleConfirmPhoto = () => {
    if (canvasRef.current) {
      const annotated = canvasRef.current.toDataURL('image/jpeg', 0.85);
      onPhotoCaptured(annotated);
    } else if (capturedImage) {
      onPhotoCaptured(capturedImage);
    }
    stopCamera();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Defect Photo Documentation</h3>
              <p className="text-[11px] text-slate-400 truncate max-w-[280px]">{itemName}</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!capturedImage ? (
            <>
              {/* Tab Selector */}
              <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('camera')}
                  className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                    activeTab === 'camera' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  Live Camera
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                    activeTab === 'upload' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  Device File
                </button>
                <button
                  onClick={() => setActiveTab('samples')}
                  className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                    activeTab === 'samples' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Defect Vault
                </button>
              </div>

              {/* Tab 1: Live Camera Feed */}
              {activeTab === 'camera' && (
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden bg-black border border-slate-800 aspect-video flex items-center justify-center">
                    {cameraError ? (
                      <div className="p-4 text-center">
                        <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                        <p className="text-xs text-slate-300">{cameraError}</p>
                      </div>
                    ) : (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        {/* Crosshair Overlay */}
                        <div className="absolute inset-0 pointer-events-none border-2 border-amber-400/30 m-4 rounded-lg flex items-center justify-center">
                          <div className="w-8 h-0.5 bg-amber-400/60" />
                          <div className="h-8 w-0.5 bg-amber-400/60 -ml-4" />
                        </div>
                      </>
                    )}
                  </div>

                  {!cameraError && (
                    <button
                      type="button"
                      onClick={takeSnapshot}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition"
                    >
                      <Camera className="w-5 h-5" />
                      Capture Defect Photo
                    </button>
                  )}
                </div>
              )}

              {/* Tab 2: Upload File / Gallery */}
              {activeTab === 'upload' && (
                <div className="space-y-3">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-700 hover:border-amber-400/70 rounded-xl p-8 text-center cursor-pointer bg-slate-950/40 transition flex flex-col items-center justify-center gap-2"
                  >
                    <Upload className="w-10 h-10 text-amber-400" />
                    <p className="text-sm font-semibold text-white">Tap to upload photo from phone gallery</p>
                    <p className="text-xs text-slate-400">JPEG, PNG, HEIC up to 15MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Pre-loaded Construction Defect Vault */}
              {activeTab === 'samples' && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-300">
                    Select a realistic field photo to document this defect:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {SAMPLE_DEFECT_PHOTOS.map((sample, idx) => (
                      <div
                        key={idx}
                        onClick={() => selectSamplePhoto(sample.url)}
                        className="group relative rounded-xl overflow-hidden border border-slate-700 bg-slate-800 cursor-pointer hover:border-amber-400 transition"
                      >
                        <img
                          src={sample.url}
                          alt={sample.title}
                          className="w-full h-24 object-cover group-hover:scale-105 transition"
                        />
                        <div className="p-2 bg-slate-900/90 border-t border-slate-800">
                          <p className="text-[11px] font-bold text-amber-400 line-clamp-1">{sample.title}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{sample.subsystem}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Annotation / Review Stage */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Draw with finger/mouse to highlight defect area:
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400">Color:</span>
                  <button
                    onClick={() => setAnnotationColor('#ef4444')}
                    className={`w-5 h-5 rounded-full bg-rose-500 border-2 ${annotationColor === '#ef4444' ? 'border-white scale-110' : 'border-transparent'}`}
                    title="Red Hazard"
                  />
                  <button
                    onClick={() => setAnnotationColor('#f59e0b')}
                    className={`w-5 h-5 rounded-full bg-amber-500 border-2 ${annotationColor === '#f59e0b' ? 'border-white scale-110' : 'border-transparent'}`}
                    title="Amber Caution"
                  />
                  <button
                    onClick={() => setAnnotationColor('#38bdf8')}
                    className={`w-5 h-5 rounded-full bg-sky-400 border-2 ${annotationColor === '#38bdf8' ? 'border-white scale-110' : 'border-transparent'}`}
                    title="Cyan Marker"
                  />
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-black shadow-inner">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startMarker}
                  onMouseMove={drawMarker}
                  onMouseUp={stopMarker}
                  onMouseLeave={stopMarker}
                  onTouchStart={startMarker}
                  onTouchMove={drawMarker}
                  onTouchEnd={stopMarker}
                  className="w-full max-h-72 object-contain cursor-crosshair touch-none block"
                />
              </div>

              <div className="flex items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCapturedImage(null);
                    setIsAnnotating(false);
                    if (activeTab === 'camera') startCamera();
                  }}
                  className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retake Photo
                </button>

                <button
                  type="button"
                  onClick={handleConfirmPhoto}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition active:scale-98"
                >
                  <Check className="w-4 h-4" />
                  Attach to Defect Ticket
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
