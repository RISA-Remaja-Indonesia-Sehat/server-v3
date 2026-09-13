import { prisma } from "../config/prisma.js";

async function main() {
  const chapter5 = await prisma.learningModule.create({
    data: {
      chapterNumber: 5,

      title: "Kebiasaan Sehat untuk Tubuhku",

      objective:
        "Memahami peran gizi, aktivitas fisik, tidur, stres, dan perawatan diri dalam menjaga kesehatan tubuh dan reproduksi.",

      durationLabel: "±10–12 menit",

      contentVersion: 1,

      lastReviewedAt: null,

      cards: {
        create: [
          {
            order: 1,

            title: "Gizi untuk Remaja Perempuan",

            content: [
              {
                type: "paragraph",
                text: "Makanan yang kamu konsumsi membantu tubuh tumbuh dan berfungsi dengan baik, termasuk organ reproduksi.",
              },
              {
                type: "subheading",
                text: "Beberapa gizi penting:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Zat besi → membantu mencegah lemas saat menstruasi. Contoh: daging, telur, dan bayam.",
                  "Vitamin D → membantu penyerapan kalsium. Contoh: ikan, telur, dan susu.",
                  "Folat (vitamin B9) → penting untuk produksi sel darah. Contoh: sayuran hijau dan kacang-kacangan.",
                ],
              },
              {
                type: "callout",
                variant: "tip",
                title: "Tips Sederhana",
                items: [
                  "Jangan melewatkan waktu makan.",
                  "Minum air putih yang cukup.",
                  "Hindari terlalu banyak makanan manis atau cepat saji.",
                ],
              },
              {
                type: "paragraph",
                text: "Tubuh yang mendapat nutrisi cukup akan bekerja lebih sehat.",
              },
            ],
          },

          // card 2
          {
            order: 2,

            title: "Olahraga untuk Kesehatan Hormon",

            content: [
              {
                type: "paragraph",
                text: "Olahraga membantu menjaga tubuh tetap aktif dan bugar.",
              },
              {
                type: "subheading",
                text: "Manfaat olahraga:",
              },
              {
                type: "list",
                tone: "green",
                items: [
                  "Membantu menjaga kesehatan tubuh.",
                  "Membantu mengurangi nyeri haid.",
                  "Membantu meningkatkan mood.",
                  "Membuat tubuh lebih bugar.",
                ],
              },
              {
                type: "subheading",
                text: "Contoh olahraga ringan:",
              },
              {
                type: "list",
                ordered: true,
                tone: "pink",
                items: ["Jalan kaki.", "Bersepeda.", "Senam.", "Peregangan."],
              },
              {
                type: "callout",
                variant: "tip",
                title: "Tidak Harus Berat",
                text: "Kamu bisa melakukan aktivitas ringan secara rutin. Tidak perlu langsung melakukan olahraga yang berat.",
              },
            ],
          },
          // card 3
          {
            order: 3,

            title: "Tidur dan Kesehatan Tubuh",

            content: [
              {
                type: "paragraph",
                text: "Tidur adalah waktu bagi tubuh untuk beristirahat dan memperbaiki diri.",
              },
              {
                type: "callout",
                variant: "remember",
                title: "Berapa Lama Remaja Perlu Tidur?",
                text: "Remaja membutuhkan sekitar 8–10 jam tidur setiap malam.",
              },
              {
                type: "subheading",
                text: "Kurang tidur dapat membuat:",
              },
              {
                type: "list",
                tone: "blue",
                items: [
                  "Tubuh mudah lelah.",
                  "Mood berubah.",
                  "Tubuh lebih sulit beristirahat dengan baik.",
                ],
              },
              {
                type: "callout",
                variant: "tip",
                title: "Tips Tidur Sehat",
                items: [
                  "Cobalah tidur dan bangun pada waktu yang hampir sama setiap hari.",
                  "Kurangi penggunaan gadget sebelum tidur.",
                ],
              },
            ],
          },

          // card 4
          {
            order: 4,

            title: "Stres dan Kesehatan Tubuh",

            content: [
              {
                type: "paragraph",
                text: "Stres adalah bagian dari kehidupan, tetapi stres berlebihan dapat memengaruhi tubuh.",
              },
              {
                type: "subheading",
                text: "Dampaknya bisa berupa:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Menstruasi terlambat.",
                  "Mood berubah.",
                  "Tubuh terasa lelah.",
                ],
              },
              {
                type: "subheading",
                text: "Cara mengelola stres:",
              },
              {
                type: "list",
                ordered: true,
                tone: "green",
                items: [
                  "Cerita dengan orang yang dipercaya.",
                  "Melakukan hobi.",
                  "Istirahat cukup.",
                  "Menarik napas dalam-dalam.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Pikiran Juga Perlu Dijaga",
                text: "Menjaga kesehatan pikiran sama pentingnya dengan menjaga kesehatan tubuh.",
              },
            ],
          },

          // card 5
          {
            order: 5,

            title: "Merawat Diri (Self-Care)",

            content: [
              {
                type: "paragraph",
                text: "Self-care berarti merawat diri sendiri dan memperhatikan kebutuhan tubuh maupun pikiran.",
              },
              {
                type: "subheading",
                text: "Contoh sederhana:",
              },
              {
                type: "list",
                tone: "yellow",
                items: [
                  "Istirahat saat lelah.",
                  "Makan secara teratur.",
                  "Menjaga kebersihan tubuh.",
                  "Melakukan hal yang disukai.",
                ],
              },
              {
                type: "callout",
                variant: "concept",
                title: "Self-Care Bukan Hal Mewah",
                text: "Merawat diri adalah bagian dari menjaga kesehatan dan kenyamanan diri.",
              },
            ],
          },
          {
            order: 6,

            title: "Memperhatikan Kesehatan Tubuh",

            content: [
              {
                type: "paragraph",
                text: "Memperhatikan kondisi tubuh membantu kamu mengenali perubahan dan mengetahui kapan perlu meminta bantuan.",
              },
              {
                type: "subheading",
                text: "Hal yang bisa kamu lakukan:",
              },
              {
                type: "list",
                tone: "blue",
                items: [
                  "Memperhatikan siklus menstruasi.",
                  "Memperhatikan perubahan pada tubuh.",
                  "Berkonsultasi jika ada keluhan.",
                ],
              },
              {
                type: "callout",
                variant: "warning",
                title: "Kalau Ada yang Membuatmu Khawatir",
                text: "Kamu bisa bicara dengan orang tua, orang dewasa yang dipercaya, atau tenaga kesehatan.",
              },
              {
                type: "callout",
                variant: "tip",
                title: "Mencari Bantuan adalah Bagian dari Merawat Diri",
                text: "Kamu tidak harus menghadapi kekhawatiran tentang kesehatan sendirian.",
              },
            ],
          },
          {
            order: 7,

            title: "Yang Perlu Kamu Ingat",

            content: [
              {
                type: "paragraph",
                text: "Gaya hidup sehat membantu tubuh bekerja dengan baik, termasuk kesehatan reproduksi.",
              },
              {
                type: "callout",
                variant: "summary",
                title: "Ringkasnya",
                items: [
                  "Makan makanan bergizi.",
                  "Aktif bergerak secara teratur.",
                  "Tidur cukup.",
                  "Mengelola stres.",
                  "Merawat diri sendiri.",
                  "Memperhatikan kesehatan tubuh.",
                ],
              },
              {
                type: "paragraph",
                text: "Perubahan kecil yang dilakukan setiap hari dapat membuat perbedaan besar.",
              },
              {
                type: "paragraph",
                text: "Tubuhmu adalah bagian penting dari dirimu. Menjaganya adalah bentuk kepedulian terhadap diri sendiri.",
              },
              {
                type: "callout",
                variant: "tip",
                title: "Siap Menguji Pemahamanmu?",
                text: "Sekarang, ayo ingat kembali materi tentang gaya hidup sehat melalui game Chapter 5.",
              },
            ],
          },
        ],
      },
    },

    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  console.log("Chapter 5 berhasil dibuat:", chapter5);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
