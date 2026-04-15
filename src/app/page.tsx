import React from "react";
import Link from "next/link";
import { Target, Hand, Pointer, Zap, ArrowRight, CheckCircle, Brain, Rocket, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestory – Asisten Sejarah Interaktif",
  description:
    "Platform edukasi interaktif berbasis gestur tangan untuk belajar sejarah dengan cara yang menyenangkan dan aktif.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* ===================== NAVBAR ===================== */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-blue-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5 group">
            <div className="relative">
              <span className="text-[34px] leading-none font-black text-blue-500 tracking-tighter drop-shadow-sm">G</span>
              <Pointer className="absolute -top-2 left-2.5 w-[18px] h-[18px] text-slate-800 fill-white -rotate-12 group-hover:scale-125 transition-transform" />
            </div>
            <span className="text-[28px] leading-none font-black text-slate-700 tracking-tight mt-0.5">estory</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#home"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="#fitur"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Fitur
            </Link>
            <Link
              href="#manfaat"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Manfaat
            </Link>
          </div>

          {/* CTA */}
          <Link
            href="/play"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95 text-sm"
          >
            Mulai Belajar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      <main className="pt-20">
        {/* ===================== HERO SECTION ===================== */}
        <section
          id="home"
          className="max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-16 lg:pb-32 grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold tracking-wide border border-blue-100">
              <Star className="w-4 h-4 fill-blue-400 text-blue-400" />
              🚀 Platform Edukasi Interaktif Berbasis Gestur
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] text-slate-900">
              Belajar Sejarah Jadi Lebih{" "}
              <span className="relative">
                <span className="text-blue-600">Seru dan Aktif!</span>
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8 Q 75 2, 150 8 Q 225 14, 298 8"
                    stroke="#BFDBFE"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              Asisten belajar berbasis sensor gerak yang siap melatih fokusmu.
              Gunakan gestur tangan untuk menaklukkan misi sejarah — tanpa
              keyboard, tanpa mouse!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/play"
                id="cta-hero"
                className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-blue-200 active:scale-95"
              >
                Mulai Misi Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#fitur"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-lg text-slate-600 border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all"
              >
                Pelajari Fitur
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {["🧒", "👦", "👧", "🧑"].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-sm"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium">
                <span className="text-slate-900 font-bold">500+</span> siswa
                sudah bergabung
              </p>
            </div>
          </div>

          {/* Right: Dancing kids illustration — floats freely, no card box */}
          <div className="relative flex items-center justify-center min-h-[480px]">
            {/* Soft blob backgrounds */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-sky-50 rounded-full blur-2xl opacity-80 pointer-events-none" />

            {/* Floating badge — Sensor */}
            <div className="absolute top-4 right-0 bg-white shadow-xl shadow-blue-100 rounded-2xl px-4 py-3 flex items-center gap-2 z-20">
              <span className="text-xl">🎯</span>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Sensor Aktif</p>
                <p className="text-sm font-black text-slate-800">Cubit untuk tembak!</p>
              </div>
            </div>

            {/* Floating badge — Score */}
            <div className="absolute top-4 left-0 bg-blue-600 shadow-xl shadow-blue-200 rounded-2xl px-4 py-3 z-20">
              <p className="text-[10px] font-black uppercase text-blue-200 tracking-widest leading-none">Skor</p>
              <p className="text-2xl font-black text-white">+100 🏆</p>
            </div>

            {/* Main illustration — plain img so backgroundColor applies directly to the element */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/kids_dancing.png"
              alt="Anak-anak belajar dengan gembira menggunakan Astra AI"
              style={{ backgroundColor: '#ffffff' }}
              className="relative z-10 w-full max-w-lg object-contain rounded-3xl"
            />
          </div>
        </section>

        {/* ===================== FEATURES SECTION ===================== */}
        <section id="fitur" className="bg-slate-50 py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                ✨ Keunggulan Platform
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900">
                Kenapa Belajar Bareng Astra?
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Dirancang khusus untuk membantu teman-teman dengan ADHD tetap
                fokus, bersemangat, dan menikmati proses belajar.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-100/60 transition-all duration-300 group hover:-translate-y-2">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-100 transition-all duration-300">
                  <Target className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">
                  Melatih Fokus
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Sistem gamifikasi yang dirancang khusus menjaga konsentrasi
                  melalui misi interaktif dan skor real-time.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 transition-all duration-300 group hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                  <Hand className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">
                  Kontrol Gerak
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Bebas bergerak! Jawab soal sejarah hanya dengan cubitan jari
                  melalui sensor kamera yang canggih.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-yellow-100/60 transition-all duration-300 group hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-yellow-100 transition-all duration-300">
                  <Zap className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">
                  Umpan Balik Instan
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Ketahui hasilnya detik itu juga tanpa perlu menunggu, menjaga
                  momentum dan semangat belajarmu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== MANFAAT SECTION ===================== */}
        <section id="manfaat" className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: text */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                  💡 Manfaat Nyata
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                  Belajar Lebih Efektif dengan{" "}
                  <span className="text-blue-600">Gerakan Tubuh</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Penelitian menunjukkan bahwa pembelajaran berbasis gerak
                  (kinesthetic learning) secara signifikan meningkatkan retensi
                  informasi dan kemampuan fokus pada anak-anak dengan ADHD.
                </p>

                <ul className="space-y-5">
                  {[
                    {
                      icon: Brain,
                      color: "blue",
                      title: "Meningkatkan Retensi Memori",
                      desc: "Melibatkan gerakan fisik saat belajar membantu otak menyimpan informasi lebih lama.",
                    },
                    {
                      icon: Zap,
                      color: "yellow",
                      title: "Mengurangi Kebosanan",
                      desc: "Elemen game dan interaksi fisik membuat sesi belajar terasa seperti bermain.",
                    },
                    {
                      icon: CheckCircle,
                      color: "green",
                      title: "Membangun Kepercayaan Diri",
                      desc: "Umpan balik positif dan skor mendorong rasa percaya diri setiap saat.",
                    },
                  ].map(({ icon: Icon, color, title, desc }) => (
                    <li key={title} className="flex gap-4 items-start group">
                      <div
                        className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center bg-${color}-50 group-hover:bg-${color}-100 transition-colors`}
                      >
                        <Icon className={`w-6 h-6 text-${color}-500`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">
                          {title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/play"
                  id="cta-manfaat"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-blue-200 active:scale-95"
                >
                  Coba Sekarang — Gratis!
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Right: Friends illustration + Stats cards */}
              <div className="space-y-8">
                {/* Friends group illustration — no card box */}
                <div className="relative flex items-center justify-center">
                  {/* Soft blob */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[32px] pointer-events-none" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/kids_friends.png"
                    alt="Teman-teman belajar bersama dengan Astra AI"
                    style={{ backgroundColor: '#ffffff' }}
                    className="relative z-10 w-full object-contain rounded-2xl"
                  />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-black text-blue-700 shadow-lg whitespace-nowrap z-20">
                    🤝 Belajar lebih menyenangkan bersama!
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    value: "3×",
                    label: "Lebih cepat memahami materi",
                    bg: "from-blue-500 to-blue-700",
                  },
                  {
                    value: "90%",
                    label: "Siswa merasa lebih bersemangat",
                    bg: "from-orange-400 to-orange-600",
                  },
                  {
                    value: "500+",
                    label: "Siswa aktif menggunakan Astra",
                    bg: "from-purple-500 to-purple-700",
                  },
                  {
                    value: "5 ⭐",
                    label: "Rating dari guru & orang tua",
                    bg: "from-green-400 to-green-600",
                  },
                ].map(({ value, label, bg }) => (
                  <div
                    key={value}
                    className={`bg-gradient-to-br ${bg} text-white p-8 rounded-3xl shadow-lg flex flex-col gap-2 hover:scale-105 transition-transform`}
                  >
                    <span className="text-4xl font-black">{value}</span>
                    <p className="text-white/80 font-medium leading-snug text-sm">
                      {label}
                    </p>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CTA BANNER ===================== */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-6 text-center text-white space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black">
              Siap Memulai Petualangan Belajar?
            </h2>
            <p className="text-blue-100 text-xl leading-relaxed max-w-2xl mx-auto">
              Tidak perlu mendaftar. Tidak perlu login. Langsung main dan belajar
              sekarang juga!
            </p>
            <Link
              href="/play"
              id="cta-banner"
              className="inline-flex items-center gap-3 bg-white text-blue-700 hover:bg-blue-50 px-10 py-5 rounded-2xl font-black text-xl transition-all hover:shadow-2xl active:scale-95"
            >
              Mulai Misi Sekarang!
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-0.5 opacity-80">
            <div className="relative">
              <span className="text-2xl leading-none font-black text-blue-500 tracking-tighter">G</span>
              <Pointer className="absolute -top-1.5 left-2 w-3.5 h-3.5 text-slate-800 fill-white -rotate-12" />
            </div>
            <span className="text-[20px] leading-none font-black text-slate-700 tracking-tight mt-0.5">estory</span>
          </div>
          <p className="text-slate-400 font-medium text-sm">
            © 2026 Gestory. Dibuat dengan ❤️ untuk masa depan pendidikan
            Indonesia.
          </p>
          <div className="flex gap-6">
            <Link
              href="#fitur"
              className="text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              Fitur
            </Link>
            <Link
              href="#manfaat"
              className="text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              Manfaat
            </Link>
            <Link
              href="/play"
              className="text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              Main
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
