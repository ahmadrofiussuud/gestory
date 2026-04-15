"use client";

import dynamic from "next/dynamic";
import React from "react";

// We load the heavy game component with SSR disabled.
// This prevents Vercel from trying to pre-render the MediaPipe/Webcam 
// logic on the server, which causes the 'This page couldn't load' error.
const GameClient = dynamic(() => import("./GameClient"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen bg-slate-900 flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-blue-500/20 rounded-full animate-ping" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin" />
        </div>
      </div>
      <p className="mt-8 text-blue-400 font-black tracking-widest animate-pulse uppercase">
        Inisialisasi Game...
      </p>
    </div>
  ),
});

export default function Page() {
  return <GameClient />;
}
