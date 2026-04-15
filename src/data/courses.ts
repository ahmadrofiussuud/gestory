export interface QuizQuestion {
  id: number;
  question: string;
  options: { A: string; B: string };
  correctAnswer: string;
  explanation: string;
}

export interface MaterialSection {
  type: "pdf" | "text" | "video" | "quiz";
  title: string;
  content?: string;
  url?: string;
}

export interface CourseDetail {
  id: string;
  title: string;
  breadcrumb: string;
  description: string;
  image: string;
  status?: string;
  sections: MaterialSection[];
  questions: QuizQuestion[];
}

export const courses: CourseDetail[] = [
  {
    id: "bab-1",
    title: "Bab 1: Sejarah Kemerdekaan Indonesia - Menuju Proklamasi",
    breadcrumb: "Bab 1: Sejarah Kemerdekaan Indonesia",
    description: "Pelajari perjalanan panjang bangsa Indonesia menuju kemerdekaan, mulai dari latar belakang penjajahan hingga detik-detik proklamasi pada 17 Agustus 1945.",
    image: "/assets/bab1_thumb.png",
    status: "Terakhir Dilihat",
    sections: [
      {
        type: "pdf",
        title: "Materi PDF - Bab 1: Sejarah Kemerdekaan Indonesia",
        url: "/material/sejarahkemerdekaan.pdf"
      },
      {
        type: "text",
        title: "Materi Teks - Ringkasan Sejarah Kemerdekaan",
        content: "Sejarah kemerdekaan Indonesia mencakup beberapa fase krusial: 1. Latar Belakang Penjajahan yang memicu semangat perlawanan. 2. Masa Pendudukan Jepang yang berakhir setelah kekalahan Jepang di Perang Pasifik. 3. Peristiwa Rengasdengklok, di mana para pemuda mendesak Soekarno-Hatta agar proklamasi segera dilaksanakan. 4. Proklamasi 17 Agustus 1945 di Jakarta."
      },
      {
        type: "video",
        title: "Materi Video - Detik-detik Proklamasi",
        url: "#"
      },
      {
        type: "quiz",
        title: "Pre Test - Sejarah Kemerdekaan"
      }
    ],
    questions: [
      {
        id: 1,
        question: "Di mana proklamasi kemerdekaan Indonesia dibacakan?",
        options: { A: "Jl. Pegangsaan Timur 56", B: "Lapangan IKADA" },
        correctAnswer: "A",
        explanation: "Proklamasi dibacakan di kediaman Soekarno, Jl. Pegangsaan Timur 56, Jakarta."
      },
      {
        id: 2,
        question: "Peristiwa apa yang terjadi sebelum proklamasi?",
        options: { A: "Peristiwa Rengasdengklok", B: "Sumpah Pemuda" },
        correctAnswer: "A",
        explanation: "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945, di mana golongan muda menculik Soekarno-Hatta untuk mendesak proklamasi."
      },
      {
        id: 3,
        question: "Siapa yang mengetik teks proklamasi?",
        options: { A: "Sayuti Melik", B: "Sukarni" },
        correctAnswer: "A",
        explanation: "Teks proklamasi diketik oleh Sayuti Melik setelah disusun oleh Soekarno, Hatta, dan Ahmad Soebardjo."
      }
    ]
  },
  {
    id: "bab-2",
    title: "Bab 2: Misi Investigasi - Menguak Tokoh Pergerakan",
    breadcrumb: "Bab 2: Misi Investigasi - Menguak Tokoh Pergerakan",
    description: "Bacalah materi terkait bagaimana peran para Tokoh Pergerakan Nasional dalam membangun pondasi kemerdekaan.",
    image: "/assets/bab2_thumb.png",
    sections: [],
    questions: []
  },
  {
    id: "bab-3",
    title: "Bab 3: Momen Krusial - Menjelajahi Kongres Pemuda",
    breadcrumb: "Bab 3: Momen Krusial - Menjelajahi Kongres Pemuda",
    description: "Bacalah materi tentang proses kongres pemuda dan hasil dari kongres tersebut yang menjadi tonggak persatuan.",
    image: "/assets/bab3_thumb.png",
    sections: [],
    questions: []
  },
  {
    id: "bab-4",
    title: "Bab 4: Proyek Akhir - Sintesis Perjalanan",
    breadcrumb: "Bab 4: Proyek Akhir - Sintesis Perjalanan",
    description: "Sebagai tahap akhir, mari kita buat sebuah sintesis pemahaman tentang seluruh perjalanan sejarah ini.",
    image: "/assets/bab4_thumb.png",
    sections: [],
    questions: []
  },
];
