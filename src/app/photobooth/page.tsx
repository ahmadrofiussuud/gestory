"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, Download, RefreshCw, Check } from "lucide-react";

// ─────────────────────────────────────────────
// FRAME OPTIONS
// ─────────────────────────────────────────────
const FRAMES = [
  {
    id: "playful",
    label: "Sehat itu Nikmat!",
    emoji: "🎉",
    src: "/assets/frame_playful.jpg",
    isDefault: true,
  },
  {
    id: "batik",
    label: "Royal Batik",
    emoji: "👑",
    src: "/assets/frame_batik.jpg",
    isDefault: false,
  },
  {
    id: "modern",
    label: "Modern Gradient",
    emoji: "✨",
    src: "/assets/frame_modern.jpg",
    isDefault: false,
  },
  {
    id: "nusantara",
    label: "Nusantara Nature",
    emoji: "🌿",
    src: "/assets/frame_nusantara.jpg",
    isDefault: false,
  },
];

// ─────────────────────────────────────────────
// UTIL: Convert white pixels → transparent (alpha=0)
// Threshold: pixels with R>230 && G>230 && B>230 become fully transparent
// ─────────────────────────────────────────────
function makeWhiteTransparent(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Near-white pixels → fully transparent
        if (r > 230 && g > 230 && b > 230) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.src = src;
  });
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function PhotoboothPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
  // Processed (white→transparent) PNG data URLs, keyed by frame id
  const [processedFrames, setProcessedFrames] = useState<Record<string, string>>({});
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [frameReady, setFrameReady] = useState(false);

  // ── Start camera ──────────────────────────
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setCameraReady(true);
          setCameraError(false);
        };
      }
    } catch {
      setCameraError(true);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [startCamera]);

  // ── Process frame when selected frame changes ──
  useEffect(() => {
    const id = selectedFrame.id;
    if (processedFrames[id]) {
      setFrameReady(true);
      return;
    }
    setFrameReady(false);
    makeWhiteTransparent(selectedFrame.src).then((dataUrl) => {
      setProcessedFrames((prev) => ({ ...prev, [id]: dataUrl }));
      setFrameReady(true);
    });
  }, [selectedFrame]);

  // ── Pre-process all frames on mount ──────
  useEffect(() => {
    FRAMES.forEach((frame) => {
      makeWhiteTransparent(frame.src).then((dataUrl) => {
        setProcessedFrames((prev) => ({ ...prev, [frame.id]: dataUrl }));
      });
    });
  }, []);

  // Current processed frame src
  const currentFrameSrc = processedFrames[selectedFrame.id] ?? null;

  // ── Countdown + capture ───────────────────
  const handleCapture = useCallback(() => {
    if (!cameraReady || isCapturing || !frameReady) return;
    setIsCapturing(true);
    setCountdown(3);

    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);
        takePhoto();
        setIsCapturing(false);
      }
    }, 1000);
  }, [cameraReady, isCapturing, frameReady]);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const W = 720;
    const H = 960;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Draw mirrored video
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -W, 0, W, H);
    ctx.restore();

    // 2. Overlay the processed frame (white already transparent PNG)
    const frameSrc = processedFrames[selectedFrame.id];
    if (!frameSrc) {
      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
      setCapturedPhoto(dataUrl);
      return;
    }

    const frameImg = new window.Image();
    frameImg.onload = () => {
      // source-over: frame sits on top, transparent parts show camera through
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(frameImg, 0, 0, W, H);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
      setCapturedPhoto(dataUrl);
    };
    frameImg.src = frameSrc;
  };

  const handleDownload = () => {
    if (!capturedPhoto) return;
    const link = document.createElement("a");
    link.href = capturedPhoto;
    link.download = `gestory-photo-${Date.now()}.jpg`;
    link.click();
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b1442] via-[#29205c] to-[#352b75] text-white font-sans">
      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* ── Header ───────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold text-sm">Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#9b5dff]" />
          <h1 className="text-lg font-black tracking-tight">Gestory Photobooth</h1>
        </div>
        <img src="/assets/logo_gestory.png" alt="Logo" className="h-9 w-auto object-contain" />
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 items-start">

        {/* ── Camera / Preview Area ─────────────────── */}
        <div className="flex-1 flex flex-col items-center gap-6">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 bg-black border border-white/10">

            {/* Camera error state */}
            {cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900 z-10">
                <span className="text-5xl">📷</span>
                <p className="text-white/70 text-sm font-medium text-center px-6">
                  Tidak bisa mengakses kamera.<br />Pastikan izin kamera diaktifkan di browser.
                </p>
                <button
                  onClick={startCamera}
                  className="bg-[#9b5dff] text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#8146e5] transition-all"
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {/* Result photo */}
            {capturedPhoto ? (
              <img
                src={capturedPhoto}
                alt="Hasil foto"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <>
                {/* ① Live video (mirrored) — sits at the bottom */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                  playsInline
                  muted
                  autoPlay
                />

                {/* ② Frame overlay — white pixels are transparent, decorations fully opaque */}
                {currentFrameSrc && (
                  <img
                    src={currentFrameSrc}
                    alt="Frame"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
                    style={{ imageRendering: "auto" }}
                  />
                )}

                {/* ③ Loading indicator while frame is processing */}
                {!frameReady && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30">
                    <div className="text-white text-sm font-bold animate-pulse">Memuat frame...</div>
                  </div>
                )}

                {/* ④ Countdown overlay */}
                {countdown !== null && (
                  <div className="absolute inset-0 flex items-center justify-center z-30">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full w-28 h-28 flex items-center justify-center">
                      <span className="text-7xl font-black text-white drop-shadow-2xl">
                        {countdown}
                      </span>
                    </div>
                  </div>
                )}

                {/* ⑤ Camera status dot */}
                {cameraReady && (
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-wider">Live</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* ── Action Buttons ─────────────────────────── */}
          {capturedPhoto ? (
            <div className="flex gap-4 w-full max-w-sm">
              <button
                onClick={handleRetake}
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3.5 rounded-2xl font-bold transition-all active:scale-95"
              >
                <RefreshCw className="w-5 h-5" />
                Foto Ulang
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#9b5dff] to-[#652fcc] hover:from-[#ab72ff] hover:to-[#7a3de8] text-white px-5 py-3.5 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-purple-900/50"
              >
                <Download className="w-5 h-5" />
                Simpan Foto
              </button>
            </div>
          ) : (
            <button
              onClick={handleCapture}
              disabled={!cameraReady || isCapturing || !frameReady}
              className="w-full max-w-sm flex items-center justify-center gap-3 bg-gradient-to-r from-[#9b5dff] to-[#652fcc] hover:from-[#ab72ff] hover:to-[#7a3de8] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-lg shadow-purple-900/50"
            >
              <Camera className="w-6 h-6" />
              {isCapturing ? "Bersiap..." : "📸 Ambil Foto!"}
            </button>
          )}

          <p className="text-white/40 text-xs text-center">
            Foto akan otomatis disimpan ke perangkat kamu
          </p>
        </div>

        {/* ── Frame Selector ────────────────────────── */}
        <div className="w-full lg:w-72 flex flex-col gap-5">
          <div>
            <h2 className="text-lg font-black mb-1">Pilih Frame</h2>
            <p className="text-white/50 text-sm">Klik untuk ganti frame foto</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {FRAMES.map((frame) => {
              const isActive = selectedFrame.id === frame.id;
              return (
                <button
                  key={frame.id}
                  onClick={() => {
                    setSelectedFrame(frame);
                    if (capturedPhoto) setCapturedPhoto(null);
                  }}
                  className={`relative flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left w-full ${
                    isActive
                      ? "border-[#9b5dff] bg-[#9b5dff]/20 shadow-lg shadow-purple-900/40"
                      : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/20 bg-white">
                    <img
                      src={frame.src}
                      alt={frame.label}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{frame.emoji}</span>
                      <span className="font-bold text-sm truncate">{frame.label}</span>
                    </div>
                    {frame.isDefault && (
                      <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider bg-[#9b5dff]/30 text-[#c4a0ff] px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>

                  {/* Active check */}
                  {isActive && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#9b5dff] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tips card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-2">
            <p className="text-xs font-black text-[#c4a0ff] uppercase tracking-wider mb-2">💡 Tips Foto</p>
            <ul className="text-white/60 text-xs space-y-1.5 leading-relaxed">
              <li>• Pastikan pencahayaan cukup terang</li>
              <li>• Hadapkan wajah ke kamera</li>
              <li>• Tunggu hitung mundur 3 detik</li>
              <li>• Foto bisa langsung diunduh ke perangkat</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
