"use client";

import dynamic from "next/dynamic";
import React from "react";

// Load the heavy game component with SSR disabled.
const GameClient = dynamic(() => import("./GameClient"), { ssr: false });

export default function Page() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-slate-900 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-blue-500/20 rounded-full animate-ping" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin" />
          </div>
        </div>
        <p className="mt-8 text-blue-400 font-black tracking-widest animate-pulse uppercase">
          Memuat Gestory...
        </p>
      </div>
    );
  }

  return <GameClient />;
}
