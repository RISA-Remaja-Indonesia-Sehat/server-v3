import { prisma } from "../config/prisma.js";

async function main() {
  const chapter6 = await prisma.learningModule.create({
    data: {
      chapterNumber: 6,

      title: "Kenali HPV & Vaksinnya",

      objective:
        "Memahami apa itu HPV, cara penularannya, risikonya, serta bagaimana vaksin membantu melindungi kesehatan.",

      durationLabel: "±10–12 menit",

      contentVersion: 1,

      lastReviewedAt: null,

      cards: {
        create: [
          {
            order: 1,

            title: "Apa itu HPV?",

            content: [
              {
                type: "paragraph",
                text: "HPV adalah singkatan dari Human Papillomavirus.",
              },
              {
                type: "paragraph",
                text: "HPV adalah virus yang sangat umum dan bisa menginfeksi laki-laki maupun perempuan.",
              },
              {
                type: "subheading",
                text: "Hal yang perlu diketahui:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Infeksi HPV sering tidak menimbulkan gejala sehingga seseorang bisa tidak menyadarinya.",
                  "Ada banyak jenis HPV.",
                  "Sebagian besar infeksi HPV dapat hilang dengan sendirinya.",
                  "Beberapa jenis HPV dapat menyebabkan masalah kesehatan.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Ingat!",
                text: "Tidak semua jenis HPV menyebabkan penyakit serius, tetapi beberapa jenis perlu dicegah karena dapat menyebabkan masalah kesehatan.",
              },
            ],
          },

          // card 2
          {
            order: 2,

            title: "Cara HPV Menular",

            content: [
              {
                type: "paragraph",
                text: "HPV terutama dapat menular melalui kontak seksual atau kontak kulit-ke-kulit di area genital.",
              },
              {
                type: "subheading",
                text: "Penularan dapat terjadi melalui:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Kontak kulit-ke-kulit yang sangat dekat di area genital.",
                  "Kontak seksual.",
                  "Dalam kondisi tertentu, dari ibu ke bayi saat proses kelahiran.",
                ],
              },
              {
                type: "subheading",
                text: "HPV tidak menular karena:",
              },
              {
                type: "list",
                tone: "blue",
                items: [
                  "Berjabat tangan.",
                  "Berbagi makanan.",
                  "Duduk berdekatan.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Kenapa Pencegahan Penting?",
                text: "Karena HPV sangat umum, perlindungan sebelum seseorang terpapar virus menjadi penting.",
              },
            ],
          },
          // card 3
          {
            order: 3,

            title: "Risiko HPV bagi Kesehatan Perempuan",

            content: [
              {
                type: "paragraph",
                text: "Beberapa jenis HPV dapat menyebabkan masalah kesehatan.",
              },
              {
                type: "subheading",
                text: "Contohnya:",
              },
              {
                type: "list",
                ordered: true,
                tone: "pink",
                items: [
                  "Kanker serviks, yaitu kanker pada leher rahim.",
                  "Kutil di area genital.",
                ],
              },
              {
                type: "subheading",
                text: "Hal penting:",
              },
              {
                type: "list",
                tone: "yellow",
                items: [
                  "Beberapa jenis HPV berisiko tinggi dapat menyebabkan perubahan sel pada serviks.",
                  "Perubahan tersebut biasanya membutuhkan waktu yang lama sebelum berkembang menjadi kanker.",
                  "Pencegahan sejak usia muda dapat membantu mengurangi risiko di masa depan.",
                ],
              },
              {
                type: "callout",
                variant: "concept",
                title: "Vaksin Membantu Melindungi",
                text: "Vaksin HPV membantu melindungi tubuh dari jenis HPV tertentu yang dapat menyebabkan penyakit serius.",
              },
            ],
          },

          // card 4
          {
            order: 4,

            title: "Mengapa Remaja Perlu Vaksin HPV?",

            content: [
              {
                type: "paragraph",
                text: "Vaksin HPV membantu tubuh membangun perlindungan terhadap jenis HPV tertentu.",
              },
              {
                type: "subheading",
                text: "Manfaat vaksin HPV:",
              },
              {
                type: "list",
                tone: "green",
                items: [
                  "Membantu melindungi dari jenis HPV yang berisiko menyebabkan penyakit.",
                  "Membantu mengurangi risiko kanker serviks di masa depan.",
                  "Membantu tubuh membentuk perlindungan sebelum terpapar virus.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Vaksin untuk Pencegahan",
                text: "Vaksin HPV digunakan sebagai langkah pencegahan, bukan untuk mengobati infeksi HPV yang sudah terjadi.",
              },
            ],
          },

          // card 5
          {
            order: 5,

            title: "Umur dan Jadwal Pemberian Vaksin",

            content: [
              {
                type: "paragraph",
                text: "Vaksin HPV paling baik diberikan sejak usia muda, sebelum seseorang terpapar virus HPV.",
              },
              {
                type: "subheading",
                text: "Kelompok usia yang perlu kamu tahu:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Usia 9–14 tahun → merupakan kelompok utama yang dianjurkan untuk mendapatkan vaksin HPV karena tubuh dapat membentuk perlindungan dengan sangat baik.",
                  "Usia 15–26 tahun → jika belum mendapatkan vaksin HPV, vaksinasi masih dapat bermanfaat. Jadwal dan jumlah dosis dapat berbeda sesuai usia, kondisi kesehatan, jenis vaksin, dan pedoman yang digunakan.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Bagaimana dengan Program di Indonesia?",
                text: "Program imunisasi HPV di Indonesia memiliki sasaran dan jadwal tersendiri. Sejak 2025, program pemerintah menggunakan satu dosis untuk kelompok sasaran tertentu.",
                items: [
                  "Tanyakan kepada orang tua, puskesmas, atau tenaga kesehatan untuk mengetahui jadwal yang sesuai untukmu.",
                ],
              },
              {
                type: "link",
                label:
                  "Lihat informasi terbaru tentang vaksin HPV dari Kemenkes",
                href: "https://ayosehat.kemkes.go.id/apa-itu-vaksin-hpv",
              },
            ],
          },
          {
            order: 6,

            title: "Efek Samping yang Umum",

            content: [
              {
                type: "paragraph",
                text: "Setelah vaksin HPV, beberapa orang dapat mengalami efek samping ringan.",
              },
              {
                type: "subheading",
                text: "Efek ringan yang bisa terjadi:",
              },
              {
                type: "list",
                tone: "yellow",
                items: [
                  "Nyeri di area suntikan.",
                  "Kemerahan ringan di area suntikan.",
                  "Merasa lelah.",
                ],
              },
              {
                type: "paragraph",
                text: "Efek ringan ini biasanya akan membaik dalam waktu singkat.",
              },
              {
                type: "callout",
                variant: "remember",
                title: "Vaksin Tidak Menyebabkan HPV",
                text: "Vaksin HPV tidak menyebabkan seseorang terkena penyakit HPV.",
              },
              {
                type: "callout",
                variant: "tip",
                title: "Jika Kamu Merasa Tidak Nyaman",
                text: "Beristirahatlah dan beri tahu orang tua, wali, atau tenaga kesehatan jika kamu merasa tidak nyaman setelah vaksinasi.",
              },
            ],
          },
          {
            order: 7,

            title: "Yang Perlu Kamu Ingat",

            content: [
              {
                type: "callout",
                variant: "summary",
                title: "Ringkasnya",
                items: [
                  "HPV adalah virus yang sangat umum.",
                  "Beberapa jenis HPV dapat menyebabkan penyakit serius.",
                  "Vaksin HPV membantu melindungi tubuh dari jenis HPV tertentu.",
                  "Vaksin paling bermanfaat jika diberikan sebelum seseorang terpapar HPV.",
                  "Jadwal vaksin dapat berbeda sesuai usia, kondisi kesehatan, dan program yang berlaku.",
                  "Efek samping vaksin biasanya ringan.",
                ],
              },
              {
                type: "paragraph",
                text: "Dengan informasi yang benar, kamu bisa membuat keputusan kesehatan yang lebih baik bersama orang tua, wali, dan tenaga kesehatan.",
              },
              {
                type: "callout",
                variant: "tip",
                title: "Siap Menguji Pemahamanmu?",
                text: "Sekarang, ayo ingat kembali materi tentang HPV dan vaksin melalui game Chapter 6.",
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

  console.log("Chapter 6 berhasil dibuat:", chapter6);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
