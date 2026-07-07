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
    description: "Pelajari jenis-jenis penyakit menular akibat mikroorganisme patogen seperti virus, bakteri, dan parasit, serta cara memutus rantai infeksinya.",
    image: "/assets/bab2_thumb.png",
    sections: [
      {
        type: "pdf",
        title: "Materi PDF - Bab 2: Dasar Penyakit Menular",
        url: "#"
      },
      {
        type: "text",
        title: "Materi Teks - Metode Transmisi Penyakit Menular",
        content: "Penyakit menular disebabkan oleh agen biologi seperti virus, bakteri, jamur, atau parasit. Penularan dapat terjadi secara langsung (kontak fisik, droplet saat bersin/batuk) maupun tidak langsung (melalui air, makanan yang terkontaminasi, atau vektor pembawa seperti nyamuk Aedes aegypti pada demam berdarah). Menjaga higienitas diri seperti mencuci tangan dengan sabun merupakan metode pencegahan paling mendasar yang terbukti sangat efektif."
      },
      {
        type: "quiz",
        title: "Pre Test - Penyakit Menular"
      }
    ],
    questions: [
      {
        id: 1,
        question: "Mikroorganisme patogen apa yang menyebabkan penyakit Influenza?",
        options: { A: "Virus", B: "Bakteri" },
        correctAnswer: "A",
        explanation: "Influenza disebabkan oleh infeksi virus influenza, bukan oleh bakteri."
      },
      {
        id: 2,
        question: "Bagaimana cara penularan penyakit Tuberkulosis (TBC)?",
        options: { A: "Udara (droplet nuclei)", B: "Gigitan nyamuk" },
        correctAnswer: "A",
        explanation: "Tuberkulosis menyebar dari orang ke orang melalui udara ketika penderita TBC aktif batuk atau bersin."
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
