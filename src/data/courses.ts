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
    title: "Bab 1: Mengenal Penyakit Kardiovaskular (Jantung & Pembuluh Darah)",
    breadcrumb: "Bab 1: Penyakit Kardiovaskular",
    description: "Pelajari apa itu penyakit kardiovaskular, faktor risikonya, bagaimana penyumbatan pembuluh darah memengaruhi jantung, serta langkah pencegahan utamanya.",
    image: "/assets/bab1_thumb.png",
    status: "Terakhir Dilihat",
    sections: [
      {
        type: "pdf",
        title: "Materi PDF - Bab 1: Kesehatan Kardiovaskular",
        url: "#"
      },
      {
        type: "text",
        title: "Materi Teks - Ringkasan Penyakit Jantung Koroner",
        content: "Penyakit kardiovaskular mencakup gangguan pada jantung dan pembuluh darah. Penyakit Jantung Koroner (PJK) terjadi ketika pembuluh darah utama yang menyuplai jantung mengeras dan menyempit akibat penumpukan plak kolesterol. Faktor risiko utama meliputi gaya hidup tidak aktif, merokok, hipertensi, dan konsumsi makanan tinggi lemak jenuh. Pencegahan efektif dapat dilakukan melalui diet sehat seimbang dan olahraga teratur secara konsisten."
      },
      {
        type: "video",
        title: "Materi Video - Mekanisme Penyakit Jantung Koroner",
        url: "#"
      },
      {
        type: "quiz",
        title: "Pre Test - Penyakit Kardiovaskular"
      }
    ],
    questions: [
      {
        id: 1,
        question: "Apa penyebab utama Penyakit Jantung Koroner (PJK)?",
        options: { A: "Penyumbatan plak kolesterol", B: "Infeksi bakteri di jantung" },
        correctAnswer: "A",
        explanation: "Penyakit Jantung Koroner terutama disebabkan oleh penumpukan plak kolesterol (aterosklerosis) yang menyumbat arteri koroner."
      },
      {
        id: 2,
        question: "Mana yang merupakan cara pencegahan penyakit kardiovaskular yang efektif?",
        options: { A: "Olahraga teratur & diet seimbang", B: "Mengonsumsi makanan tinggi lemak" },
        correctAnswer: "A",
        explanation: "Gaya hidup sehat dengan olahraga teratur dan diet seimbang adalah pilar utama pencegahan penyakit jantung."
      },
      {
        id: 3,
        question: "Organ tubuh mana yang paling terpengaruh oleh kardiovaskular?",
        options: { A: "Jantung dan pembuluh darah", B: "Paru-paru dan ginjal" },
        correctAnswer: "A",
        explanation: "Istilah kardiovaskular merujuk langsung pada sistem peredaran darah, terutama jantung (kardio) dan pembuluh darah (vaskular)."
      }
    ]
  },
  {
    id: "bab-2",
    title: "Bab 2: Mengenal Penyakit Menular dan Mekanisme Penularannya",
    breadcrumb: "Bab 2: Penyakit Menular",
    description: "Pelajari rute perjalanan kuman (kontak, droplet, airborne, waterborne, foodborne, vektor, cairan tubuh) dan 4 senjata ampuh untuk memutus rantai infeksinya.",
    image: "/assets/bab2_thumb.png",
    sections: [
      {
        type: "pdf",
        title: "Materi PDF - Bab 2: Cara Penularan Penyakit Menular (Edisi Edukatif)",
        url: "/material/Cara%20Penularan%20Penyakit%20Menular%20-%20Edisi%20Edukatif.pdf"
      },
      {
        type: "text",
        title: "Materi Teks - Ringkasan 6 Jalur Penularan Kuman & Senjata Pelindung",
        content: "Kuman nakal menyebar melalui 6 rute utama: (1) Kontak Fisik Langsung (seperti gatal Skabies), (2) Percikan Droplet (>5 µm jatuh <1m saat bersin/batuk seperti Virus Influenza), (3) Udara Airborne (<5 µm melayang lama seperti Bakteri TB), (4) Air Waterborne (tercemar kuman Kolera), (5) Makanan Foodborne (tercemar bakteri Salmonellosis), (6) Vektor Serangga (gigitan nyamuk Aedes aegypti pembawa Virus Dengue/DBD dan Anopheles pembawa Malaria), serta Cairan Tubuh/Darah (Hepatitis B). Empat senjata ampuh melawannya: Cuci tangan dengan sabun 20 detik, gunakan masker & etika batuk, lengkapi imunisasi (BCG & Hep B), serta jaga kebersihan lingkungan dengan 3M Plus."
      },
      {
        type: "quiz",
        title: "Pre Test - Penyakit Menular & Rute Kuman"
      }
    ],
    questions: [
      {
        id: 1,
        question: "Mikroorganisme patogen apa yang menyebabkan penyakit Influenza?",
        options: { A: "Virus Influenza (Tipe A, B, C)", B: "Bakteri Salmonella" },
        correctAnswer: "A",
        explanation: "Influenza disebabkan oleh infeksi virus Influenza (Tipe A, B, C) yang menyebar melalui percikan droplet saat batuk/bersin."
      },
      {
        id: 2,
        question: "Apa perbedaan utama penularan Droplet dan Airborne (Udara Jauh)?",
        options: { A: "Droplet >5 µm jatuh <1m, Airborne <5 µm melayang lama", B: "Droplet ditularkan nyamuk, Airborne lewat makanan" },
        correctAnswer: "A",
        explanation: "Droplet berukuran besar (>5 µm) jatuh cepat dalam jarak 1 meter, sedangkan partikel Airborne sangat ringan (<5 µm) melayang lama di udara seperti bakteri TB."
      },
      {
        id: 3,
        question: "Berapa lama waktu minimal yang direkomendasikan saat mencuci tangan dengan sabun agar kuman tergelincir pergi?",
        options: { A: "20 Detik", B: "5 Detik" },
        correctAnswer: "A",
        explanation: "Menggosok sela-sela jari dengan air mengalir dan sabun selama minimal 20 detik terbukti ilmiah efektif meluruhkan lapisan dinding kuman."
      },
      {
        id: 4,
        question: "Penyakit Tuberkulosis (TB) disebabkan oleh kuman apa dan menyebar melalui jalur apa?",
        options: { A: "Bakteri Mycobacterium tuberculosis via Airborne", B: "Virus Dengue via Gigitan Nyamuk" },
        correctAnswer: "A",
        explanation: "TB disebabkan oleh bakteri Mycobacterium tuberculosis yang melayang lama di udara (Airborne), sehingga rumah butuh ventilasi dan sinar matahari yang cukup."
      }
    ]
  },
  {
    id: "bab-3",
    title: "Bab 3: Hipertensi - Menguak Faktor Risiko Tekanan Darah Tinggi",
    breadcrumb: "Bab 3: Hipertensi",
    description: "Pahami apa itu hipertensi yang sering dijuluki 'silent killer', gejalanya, serta bagaimana tekanan darah tinggi memicu komplikasi berat.",
    image: "/assets/bab3_thumb.png",
    sections: [
      {
        type: "text",
        title: "Materi Teks - Mengenal Tekanan Darah Tinggi",
        content: "Hipertensi terjadi ketika tekanan darah sistolik seseorang berada di atas 140 mmHg atau tekanan diastolik di atas 90 mmHg secara konsisten. Kondisi ini sering tidak menunjukkan gejala klinis yang khas namun secara perlahan merusak pembuluh darah arteri dan meningkatkan risiko stroke, serangan jantung, dan gagal ginjal kronis."
      }
    ],
    questions: []
  },
  {
    id: "bab-4",
    title: "Bab 4: Strategi Promosi Kesehatan & Pencegahan Penyakit di Masyarakat",
    breadcrumb: "Bab 4: Promosi Kesehatan",
    description: "Pelajari konsep pencegahan primer, sekunder, dan tersier serta pentingnya edukasi PHBS (Perilaku Hidup Bersih dan Sehat) di masyarakat.",
    image: "/assets/bab4_thumb.png",
    sections: [],
    questions: []
  },
];
