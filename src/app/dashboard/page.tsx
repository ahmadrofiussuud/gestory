import React from "react";
import Link from "next/link";
import { ChevronRight, PlayCircle, BookOpen, Clock } from "lucide-react";
import { courses } from "@/data/courses";

export default function Dashboard() {
  const lastCourse = courses[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Banner / Welcome */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Halo Vicent!</h1>
          <p className="text-slate-500 mt-1">Selamat datang kembali di beranda</p>
        </header>

        {/* Continue Learning - Big Card */}
        <section className="mb-12">
          <div className="relative overflow-hidden bg-[#0077B6] rounded-[24px] p-8 lg:p-12 text-white shadow-xl">
            {/* Background pattern/blobs */}
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
                className="inline-flex items-center gap-2 bg-white text-[#0077B6] px-6 py-3 rounded-full font-bold transition-all hover:bg-slate-100 active:scale-95"
              >
                <PlayCircle className="w-5 h-5" />
                Lanjutkan
              </Link>
            </div>
          </div>
        </section>

        {/* Course List */}
        <section>
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
      </div>
    </div>
  );
}
