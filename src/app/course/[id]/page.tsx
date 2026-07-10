"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Video, 
  FileType, 
  ClipboardCheck, 
  Gamepad2,
  ArrowLeft
} from "lucide-react";
import { useParams } from "next/navigation";
import { courses } from "@/data/courses";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const course = courses.find((c) => c.id === courseId);

  const [openSection, setOpenSection] = useState<number | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Materi tidak ditemukan</h1>
        <Link href="/dashboard" className="text-blue-600 font-bold hover:underline">
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20 relative overflow-hidden">
      {/* Decorative corner borders */}
      <img src="/assets/group_172_1.png" alt="Ornamen Pojok Kiri" className="absolute top-0 left-0 w-24 md:w-32 opacity-100 pointer-events-none z-10" />
      <img src="/assets/group_172_1.png" alt="Ornamen Pojok Kanan" className="absolute top-0 right-0 w-24 md:w-32 opacity-100 pointer-events-none z-10 scale-x-[-1]" />

      {/* Breadcrumbs & Logo */}
      <nav className="max-w-6xl mx-auto px-6 py-6 border-b border-slate-100 flex items-center justify-between text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-bold truncate">{course.breadcrumb}</span>
        </div>
        <Link href="/dashboard" className="flex items-center gap-2">
          <img src="/assets/logo_gestory.png" alt="Logo Gestory" className="h-8 w-auto object-contain" />
          <span className="text-sm font-black text-slate-800">Gestory</span>
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 mt-8">
        {/* Course Title */}
        <h1 className="text-3xl font-black text-blue-800 mb-8 leading-tight">
          {course.title}
        </h1>

        {/* Description Box */}
        <div className="relative bg-blue-800 rounded-2xl overflow-hidden shadow-md mb-10">
          {/* Decorative Lotus Pattern */}
          <div className="absolute right-4 bottom-0 w-48 h-full opacity-100 pointer-events-none z-0">
            <img src="/assets/group_140.png" alt="Lotus Pattern" className="w-full h-full object-contain object-right-bottom mix-blend-overlay" />
          </div>

          <div className="relative z-10 bg-blue-900/60 px-6 py-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide">Deskripsi singkat</h2>
          </div>
          <div className="relative z-10 bg-white p-6 border-x border-b border-blue-50/20">
            <p className="text-slate-600 leading-relaxed font-medium">
              {course.description}
            </p>
          </div>
        </div>

        {/* Game Button */}
        <Link 
          href="/play" 
          className="group relative flex items-center justify-center gap-4 bg-gradient-to-r from-[#9b5dff] to-[#352b75] hover:from-[#ab72ff] hover:to-[#40348c] text-white p-8 rounded-[24px] shadow-lg shadow-purple-200 mb-16 transition-all active:scale-[0.98]"
        >
          <div className="bg-white/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-8 h-8 fill-white" />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-black uppercase tracking-tight">Latihan Soal Investigasi (Game)</h3>
            <p className="text-white/90 font-medium">Bermain sambil belajar dengan webcam interaktif!</p>
          </div>
        </Link>

        {/* Material & Quiz Section */}
        <section>
          <h2 className="text-2xl font-black text-slate-800 mb-6">Materi & Kuis</h2>
          
          <div className="space-y-4">
            {course.sections.map((section, idx) => {
              const isOpen = openSection === idx;
              const Icon = section.type === "pdf" ? FileType : 
                           section.type === "text" ? FileText :
                           section.type === "video" ? Video : ClipboardCheck;
              
              return (
                <div key={idx} className="border-2 border-slate-100 rounded-2xl overflow-hidden transition-all duration-300">
                  <button 
                    onClick={() => toggleSection(idx)}
                    className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors ${isOpen ? 'bg-blue-800 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={`w-6 h-6 flex-shrink-0 ${isOpen ? 'text-white' : 'text-slate-400'}`} />
                      <span className="font-bold text-lg md:text-xl leading-snug">{section.title}</span>
                    </div>
                    {isOpen ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                  </button>
                  
                  {isOpen && (
                    <div className="p-8 bg-slate-50 animate-in fade-in slide-in-from-top-2 duration-300">
                      {section.type === "text" && (
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                          {section.content}
                        </p>
                      )}
                      {section.type === "pdf" && (
                        <div className="flex flex-col items-center gap-6">
                          <p className="text-slate-500 font-medium">Materi tersedia dalam format PDF untuk dipelajari lebih mendalam.</p>
                          <a 
                            href={section.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                          >
                            <FileType className="w-5 h-5" />
                            Buka Materi PDF
                          </a>
                        </div>
                      )}
                      {(section.type === "video" || section.type === "quiz") && (
                        <div className="p-12 text-center text-slate-400 font-bold border-2 border-dashed border-slate-200 rounded-3xl">
                          Konten ini segera hadir sebagai bagian dari pembaruan materi.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
