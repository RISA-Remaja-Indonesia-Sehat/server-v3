import { prisma } from "../config/prisma.js";

const CONTENT_VERSION = 1;

type SeedQuestion = {
  order: number;
  chapterNumber: number;
  type: "SINGLE_CHOICE" | "TRUE_FALSE";
  prompt: string;
  options: Array<{
    id: string;
    label: string;
  }>;
  correctOptionId: string;
  explanation: string;
};

const questions: SeedQuestion[] = [
  {
    order: 1,
    chapterNumber: 1,
    type: "SINGLE_CHOICE",
    prompt:
      "Sel telur matang dan beberapa hormon reproduksi dihasilkan oleh organ bernama...",
    options: [
      { id: "A", label: "Vagina" },
      { id: "B", label: "Ovarium" },
      { id: "C", label: "Serviks" },
      { id: "D", label: "Vulva" },
    ],
    correctOptionId: "B",
    explanation:
      "Ovarium merupakan tempat sel telur matang dan menghasilkan hormon.",
  },
  {
    order: 2,
    chapterNumber: 1,
    type: "TRUE_FALSE",
    prompt:
      "Semua remaja mengalami perubahan pubertas pada usia dan urutan yang sama.",
    options: [
      { id: "A", label: "Benar" },
      { id: "B", label: "Salah" },
    ],
    correctOptionId: "B",
    explanation:
      "Waktu dan urutan perubahan pubertas dapat berbeda pada setiap orang.",
  },
  {
    order: 3,
    chapterNumber: 1,
    type: "SINGLE_CHOICE",
    prompt:
      "Naya melihat keputihannya berwarna kehijauan, berbau kuat, dan terasa gatal. Apa tindakan yang paling tepat?",
    options: [
      { id: "A", label: "Membiarkannya karena semua keputihan pasti normal" },
      { id: "B", label: "Memakai cairan pembersih sebanyak mungkin" },
      {
        id: "C",
        label: "Bercerita kepada orang dewasa tepercaya atau tenaga kesehatan",
      },
      { id: "D", label: "Mencari diagnosis sendiri dari media sosial" },
    ],
    correctOptionId: "C",
    explanation:
      "Perubahan warna, bau kuat, gatal, atau nyeri perlu dibicarakan dengan orang dewasa tepercaya atau tenaga kesehatan.",
  },
  {
    order: 4,
    chapterNumber: 2,
    type: "SINGLE_CHOICE",
    prompt:
      "Manakah urutan empat tahap utama siklus menstruasi yang benar?",
    options: [
      { id: "A", label: "Ovulasi → luteal → menstruasi → folikuler" },
      { id: "B", label: "Menstruasi → folikuler → ovulasi → luteal" },
      { id: "C", label: "Folikuler → menstruasi → luteal → ovulasi" },
      { id: "D", label: "Luteal → ovulasi → folikuler → menstruasi" },
    ],
    correctOptionId: "B",
    explanation:
      "Siklus dimulai dari menstruasi, dilanjutkan fase folikuler, ovulasi, lalu luteal.",
  },
  {
    order: 5,
    chapterNumber: 2,
    type: "SINGLE_CHOICE",
    prompt:
      "Saat menstruasi, Sari lebih mudah lelah dan sensitif. Apa pilihan yang paling membantu?",
    options: [
      { id: "A", label: "Tidak tidur agar tugas cepat selesai" },
      { id: "B", label: "Menyimpan semua perasaan sendiri" },
      {
        id: "C",
        label:
          "Istirahat, melakukan kegiatan yang disukai, dan bercerita kepada orang tepercaya",
      },
      { id: "D", label: "Melewatkan waktu makan" },
    ],
    correctOptionId: "C",
    explanation:
      "Istirahat, relaksasi, dan dukungan orang tepercaya dapat membantu mengelola perubahan mood.",
  },
  {
    order: 6,
    chapterNumber: 2,
    type: "SINGLE_CHOICE",
    prompt:
      "Nyeri menstruasi membuat Tika tidak mampu mengikuti aktivitas sehari-hari. Apa yang sebaiknya dilakukan?",
    options: [
      { id: "A", label: "Menahannya tanpa memberi tahu siapa pun" },
      { id: "B", label: "Memberi tahu orang tua, wali, atau tenaga kesehatan" },
      { id: "C", label: "Menganggap dirinya lemah" },
      { id: "D", label: "Meminum obat apa saja tanpa arahan" },
    ],
    correctOptionId: "B",
    explanation:
      "Nyeri yang sangat mengganggu aktivitas perlu dibicarakan dengan orang dewasa atau tenaga kesehatan.",
  },
  {
    order: 7,
    chapterNumber: 3,
    type: "SINGLE_CHOICE",
    prompt: "Bagaimana cara merawat vulva yang tepat?",
    options: [
      { id: "A", label: "Membersihkannya dengan lembut menggunakan air bersih" },
      { id: "B", label: "Membersihkan bagian dalam vagina dengan sabun wangi" },
      { id: "C", label: "Menggunakan cairan pembersih setiap beberapa jam" },
      { id: "D", label: "Menggosoknya kuat-kuat agar lebih bersih" },
    ],
    correctOptionId: "A",
    explanation:
      "Vulva cukup dibersihkan lembut dengan air bersih. Produk berpewangi dapat menyebabkan iritasi.",
  },
  {
    order: 8,
    chapterNumber: 3,
    type: "SINGLE_CHOICE",
    prompt:
      "Setelah berolahraga, pakaian dan pakaian dalam Lala terasa lembap. Apa tindakan terbaik?",
    options: [
      { id: "A", label: "Tetap memakainya hingga malam" },
      { id: "B", label: "Menutupinya dengan jaket" },
      {
        id: "C",
        label: "Mandi, mengeringkan tubuh, lalu mengganti pakaian yang lembap",
      },
      { id: "D", label: "Menyemprotkan pewangi pada pakaian" },
    ],
    correctOptionId: "C",
    explanation:
      "Mengganti pakaian lembap membantu menjaga kenyamanan dan mengurangi risiko iritasi.",
  },
  {
    order: 9,
    chapterNumber: 3,
    type: "SINGLE_CHOICE",
    prompt: "Kapan pembalut sebaiknya diganti?",
    options: [
      { id: "A", label: "Sekali sehari" },
      { id: "B", label: "Setiap 3–4 jam atau ketika sudah penuh" },
      { id: "C", label: "Hanya jika terasa gatal" },
      { id: "D", label: "Setelah menstruasi selesai" },
    ],
    correctOptionId: "B",
    explanation:
      "Pembalut sebaiknya diganti setiap 3–4 jam atau saat penuh, serta tangan dicuci sebelum dan sesudah menggantinya.",
  },
  {
    order: 10,
    chapterNumber: 4,
    type: "SINGLE_CHOICE",
    prompt:
      "Dina mengambil foto temannya lalu ingin mengunggahnya. Temannya belum memberikan jawaban. Apakah Dina sudah mendapat consent?",
    options: [
      { id: "A", label: "Ya, karena mereka berteman" },
      { id: "B", label: "Ya, karena temannya belum berkata tidak" },
      {
        id: "C",
        label: "Belum, karena persetujuan harus diberikan dengan jelas dan sukarela",
      },
      { id: "D", label: "Sudah, jika fotonya terlihat bagus" },
    ],
    correctOptionId: "C",
    explanation:
      "Diam bukan berarti setuju. Membagikan foto orang lain memerlukan izin yang jelas.",
  },
  {
    order: 11,
    chapterNumber: 4,
    type: "SINGLE_CHOICE",
    prompt: "Manakah tanda hubungan yang sehat?",
    options: [
      { id: "A", label: "Kamu merasa takut untuk berkata tidak" },
      { id: "B", label: "Pilihan dan batas pribadimu dihormati" },
      { id: "C", label: "Teman selalu membuka pesan pribadimu" },
      { id: "D", label: "Kamu dibuat merasa bersalah setiap hari" },
    ],
    correctOptionId: "B",
    explanation:
      "Hubungan sehat membuat seseorang merasa aman, dihargai, dan bebas menjadi dirinya sendiri.",
  },
  {
    order: 12,
    chapterNumber: 4,
    type: "SINGLE_CHOICE",
    prompt:
      "Teman-teman mengejek Rani karena ia menolak melakukan sesuatu yang membuatnya tidak nyaman. Apa respons yang paling tepat?",
    options: [
      { id: "A", label: "Mengikuti mereka agar tetap diterima" },
      {
        id: "B",
        label:
          "Berkata tidak dengan jelas, tetap pada keputusan, dan mencari teman yang menghargainya",
      },
      { id: "C", label: "Meminta maaf karena mempunyai batas pribadi" },
      { id: "D", label: "Menyalahkan diri sendiri" },
    ],
    correctOptionId: "B",
    explanation:
      "Menolak tekanan bukanlah tindakan egois. Teman yang baik menghargai keputusanmu.",
  },
  {
    order: 13,
    chapterNumber: 4,
    type: "SINGLE_CHOICE",
    prompt:
      "Seseorang yang dikenal melalui internet meminta foto pribadi dan mulai mengancam ketika ditolak. Apa langkah paling aman?",
    options: [
      { id: "A", label: "Mengirim foto agar ancaman berhenti" },
      { id: "B", label: "Membalas ancamannya" },
      {
        id: "C",
        label: "Menghentikan komunikasi dan memberi tahu orang dewasa tepercaya",
      },
      { id: "D", label: "Menemui orang tersebut sendirian" },
    ],
    correctOptionId: "C",
    explanation:
      "Jangan menuruti tekanan atau ancaman. Hentikan komunikasi dan segera cari bantuan.",
  },
  {
    order: 14,
    chapterNumber: 5,
    type: "SINGLE_CHOICE",
    prompt:
      "Kombinasi makanan mana yang menjadi contoh sumber zat besi dalam materi RISA?",
    options: [
      { id: "A", label: "Daging, telur, dan bayam" },
      { id: "B", label: "Permen, keripik, dan minuman bersoda" },
      { id: "C", label: "Es krim, kue, dan sirup" },
      { id: "D", label: "Mi instan, permen, dan biskuit" },
    ],
    correctOptionId: "A",
    explanation:
      "Zat besi membantu mencegah tubuh terasa lemas, termasuk saat menstruasi.",
  },
  {
    order: 15,
    chapterNumber: 5,
    type: "SINGLE_CHOICE",
    prompt:
      "Mira sering tidur lima jam karena bermain gadget. Ia mudah lelah dan mood-nya berubah. Kebiasaan mana yang paling baik dicoba?",
    options: [
      { id: "A", label: "Minum lebih banyak minuman manis" },
      { id: "B", label: "Tidur sekitar 8–10 jam dan mengurangi gadget sebelum tidur" },
      { id: "C", label: "Tidak berolahraga sama sekali" },
      { id: "D", label: "Tidur hanya saat akhir pekan" },
    ],
    correctOptionId: "B",
    explanation:
      "Remaja membutuhkan sekitar 8–10 jam tidur setiap malam.",
  },
  {
    order: 16,
    chapterNumber: 6,
    type: "SINGLE_CHOICE",
    prompt:
      "Ayu duduk berdekatan dan berbagi makanan dengan seseorang yang memiliki HPV. Berdasarkan materi, manakah pernyataan yang tepat?",
    options: [
      { id: "A", label: "HPV pasti menular melalui makanan" },
      { id: "B", label: "HPV pasti menular karena duduk berdekatan" },
      {
        id: "C",
        label: "HPV tidak menular melalui berbagi makanan atau duduk berdekatan",
      },
      { id: "D", label: "HPV menular melalui berjabat tangan" },
    ],
    correctOptionId: "C",
    explanation:
      "HPV terutama menular melalui kontak seksual atau kontak kulit yang sangat dekat di area genital.",
  },
  {
    order: 17,
    chapterNumber: 6,
    type: "TRUE_FALSE",
    prompt:
      "Vaksin HPV digunakan untuk mengobati infeksi HPV yang sudah terjadi.",
    options: [
      { id: "A", label: "Benar" },
      { id: "B", label: "Salah" },
    ],
    correctOptionId: "B",
    explanation:
      "Vaksin HPV merupakan langkah pencegahan dan membantu membentuk perlindungan sebelum terpapar virus.",
  },
  {
    order: 18,
    chapterNumber: 6,
    type: "SINGLE_CHOICE",
    prompt:
      "Manakah yang termasuk efek samping ringan yang dapat terjadi setelah vaksin HPV?",
    options: [
      { id: "A", label: "Nyeri ringan atau kemerahan di area suntikan" },
      { id: "B", label: "Pasti terkena HPV" },
      { id: "C", label: "Pasti mengalami penyakit serius" },
      { id: "D", label: "Kehilangan kemampuan bergerak" },
    ],
    correctOptionId: "A",
    explanation:
      "Nyeri suntikan, kemerahan ringan, atau merasa lelah biasanya membaik dalam waktu singkat.",
  },
  {
    order: 19,
    chapterNumber: 7,
    type: "SINGLE_CHOICE",
    prompt: "Manakah pernyataan yang paling tepat tentang IMS?",
    options: [
      { id: "A", label: "Semua IMS selalu terlihat dari luar" },
      { id: "B", label: "IMS hanya disebabkan oleh bakteri" },
      {
        id: "C",
        label: "Beberapa IMS tidak menimbulkan gejala dan perlu diperiksa tenaga kesehatan",
      },
      {
        id: "D",
        label: "Seseorang dapat mengetahui jenis IMS hanya dengan menebak gejalanya",
      },
    ],
    correctOptionId: "C",
    explanation:
      "IMS dapat disebabkan oleh bakteri, virus, atau parasit, dan sebagian dapat terjadi tanpa gejala.",
  },
  {
    order: 20,
    chapterNumber: 7,
    type: "SINGLE_CHOICE",
    prompt:
      "Seorang teman khawatir memiliki masalah kesehatan yang mungkin berkaitan dengan IMS. Apa respons yang paling baik?",
    options: [
      { id: "A", label: "Menyebarkan ceritanya agar orang lain berhati-hati" },
      { id: "B", label: "Mengejeknya agar ia lebih menjaga diri" },
      {
        id: "C",
        label:
          "Menjaga privasinya, tidak menghakimi, dan mendukungnya mencari tenaga kesehatan",
      },
      { id: "D", label: "Memberikan diagnosis berdasarkan internet" },
    ],
    correctOptionId: "C",
    explanation:
      "Kondisi kesehatan seseorang tidak menentukan nilai dirinya. Ia membutuhkan dukungan dan pemeriksaan yang tepat.",
  },
];

async function main() {
  if (questions.length !== 20) {
    throw new Error("Seed Post Test harus berisi tepat 20 soal.");
  }

  await prisma.$transaction(async (tx) => {
    await tx.postTestQuestion.updateMany({
      data: {
        isActive: false,
      },
    });

    for (const question of questions) {
      await tx.postTestQuestion.upsert({
        where: {
          contentVersion_order: {
            contentVersion: CONTENT_VERSION,
            order: question.order,
          },
        },
        create: {
          ...question,
          contentVersion: CONTENT_VERSION,
          isActive: true,
        },
        update: {
          ...question,
          isActive: true,
        },
      });
    }
  });

  console.log(
    `Post Test versi ${CONTENT_VERSION} berhasil dibuat dengan ${questions.length} soal.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
