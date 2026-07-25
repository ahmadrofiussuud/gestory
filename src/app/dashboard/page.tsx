import React from "react";
import Link from "next/link";
import { ChevronRight, PlayCircle, Clock, Camera } from "lucide-react";
import { courses } from "@/data/courses";

export default function Dashboard() {
  const lastCourse = courses[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Halo Vicent!</h1>
            <p className="text-slate-500 mt-1">Selamat datang kembali di beranda belajar Gestory</p>
          </div>
          <img src="/assets/logo_gestory.png" alt="Gestory Logo" className="h-16 w-auto object-contain" />
        </header>

        {/* Continue Learning - Big Card */}
        <section className="mb-12">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 to-blue-500 rounded-[24px] p-8 lg:p-12 text-white shadow-xl shadow-blue-900/10">
            <div className="absolute right-0 bottom-0 w-80 h-full opacity-100 pointer-events-none z-0">
              <img src="/assets/group_126.png" alt="Pattern Batik" className="w-full h-full object-contain object-right-bottom mix-blend-overlay" />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full text-xs font-bold mb-4">
                <Clock className="w-3 h-3" />
                Terakhir Dilihat
              </div>
              <h2 className="text-2xl lg:text-4xl font-black mb-6 leading-tight">
                {lastCourse.title}
              </h2>
              <Link
                href={`/course/${lastCourse.id}`}
                className="inline-flex items-center gap-2 bg-white text-blue-800 px-6 py-3 rounded-full font-bold transition-all hover:bg-slate-100 active:scale-95"
              >
                <PlayCircle className="w-5 h-5" />
                Lanjutkan
              </Link>
            </div>
          </div>
        </section>

        {/* Course List */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Kursus tersedia</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-blue-600 transition-all">
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-4">
                    {course.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-blue-600">
                    <span className="text-xs font-bold uppercase tracking-wider">Buka Materi</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Photobooth Banner */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-6">Fitur Seru</h2>
          <Link
            href="/photobooth"
            className="group relative flex items-center gap-6 overflow-hidden bg-gradient-to-r from-[#352b75] to-[#9b5dff] rounded-[24px] p-8 text-white shadow-xl shadow-purple-900/20 hover:shadow-2xl hover:shadow-purple-900/30 transition-all duration-300 active:scale-[0.99]"
          >
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-[#9b5dff]/30 rounded-full blur-2xl pointer-events-none" />

            {/* Frame thumbnail */}
            <div className="relative flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <img src="/assets/frame_playful.jpg" alt="Frame Photobooth" className="w-full h-full object-cover" />
            </div>

            {/* Text */}
            <div className="relative z-10 flex-1">
              <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
                <Camera className="w-3 h-3" />
                Baru!
              </div>
              <h3 className="text-2xl lg:text-3xl font-black leading-tight mb-1">
                📸 Gestory Photobooth
              </h3>
              <p className="text-white/80 font-medium text-sm lg:text-base">
                Foto selfie seru dengan frame Gestory! Pilih 4 frame unik dan simpan kenangan belajarmu.
              </p>
            </div>

            <ChevronRight className="relative z-10 w-8 h-8 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 hidden sm:block" />
          </Link>
        </section>
      </div>
    </div>
  );
}
