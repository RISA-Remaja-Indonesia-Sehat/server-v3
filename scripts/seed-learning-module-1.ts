import { prisma } from "../config/prisma.js";

async function main() {
  const chapter1 = await prisma.learningModule.create({
    data: {
      chapterNumber: 1,

      title: "Kenalan dengan Tubuhku",

      objective:
        "Mengenal organ reproduksi, perubahan pubertas, serta perubahan tubuh yang umum dan kapan perlu mencari bantuan.",

      durationLabel: "±8–10 menit",

      contentVersion: 1,

      lastReviewedAt: null,

      cards: {
        create: [
          {
            order: 1,

            title: "Apa itu Kesehatan Reproduksi?",

            content: [
              {
                type: "paragraph",
                text: "Kesehatan reproduksi berkaitan dengan menjaga organ reproduksi dan kesehatan tubuh agar tetap berfungsi dengan baik, baik secara fisik maupun emosional.",
              },

              {
                type: "subheading",
                text: "Kenapa penting untuk remaja?",
              },

              {
                type: "paragraph",
                text: "Saat memasuki masa remaja, tubuh mengalami banyak perubahan.",
              },

              {
                type: "list",
                tone: "pink",
                items: [
                  "Mengalami pubertas.",
                  "Mulai mengalami menstruasi.",
                  "Mengalami perubahan hormon.",
                  "Mengalami perubahan bentuk tubuh.",
                ],
              },

              {
                type: "subheading",
                text: "Tujuan menjaga kesehatan reproduksi:",
              },

              {
                type: "list",
                tone: "yellow",
                items: [
                  "Membantu tubuh berkembang dengan sehat.",
                  "Membantu mencegah infeksi atau masalah kesehatan.",
                  "Memahami tubuh sendiri dengan lebih baik.",
                  "Membantu membuat keputusan yang aman dan sehat.",
                ],
              },

              {
                type: "callout",
                variant: "concept",
                title: "Intinya",
                text: "Mengenal tubuh sendiri adalah langkah pertama untuk menjaganya.",
              },
            ],
          },

          // card 2
          {
            order: 2,

            title: "Kenali Organ Reproduksi Perempuan",

            content: [
              {
                type: "image",
                src: "/img/organ-education.png",
                alt: "Ilustrasi sistem reproduksi perempuan",
              },
              {
                type: "paragraph",
                text: "Organ reproduksi perempuan terdiri dari beberapa bagian yang memiliki fungsi berbeda.",
              },

              {
                type: "subheading",
                text: "A. Vulva",
              },
              {
                type: "paragraph",
                text: "Vulva adalah bagian luar organ reproduksi perempuan.",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Membantu melindungi bagian organ reproduksi di dalam tubuh.",
                  "Di area vulva terdapat lubang vagina.",
                ],
              },

              {
                type: "subheading",
                text: "B. Vagina",
              },
              {
                type: "paragraph",
                text: "Vagina adalah saluran yang menghubungkan bagian luar tubuh dengan leher rahim.",
              },
              {
                type: "list",
                tone: "blue",
                items: [
                  "Menjadi jalan keluarnya darah menstruasi.",
                  "Menjadi bagian dari jalan lahir bayi.",
                ],
              },

              {
                type: "subheading",
                text: "C. Ovarium (Indung Telur)",
              },
              {
                type: "paragraph",
                text: "Ovarium adalah dua organ kecil yang berada di sisi kiri dan kanan rahim.",
              },
              {
                type: "list",
                tone: "green",
                items: [
                  "Menghasilkan dan mematangkan sel telur.",
                  "Menghasilkan hormon reproduksi.",
                ],
              },

              {
                type: "subheading",
                text: "D. Tuba Falopi",
              },
              {
                type: "paragraph",
                text: "Tuba falopi adalah saluran yang menghubungkan area ovarium dengan rahim.",
              },
              {
                type: "list",
                tone: "yellow",
                items: ["Membantu membawa sel telur menuju rahim."],
              },

              {
                type: "subheading",
                text: "E. Rahim (Uterus)",
              },
              {
                type: "paragraph",
                text: "Rahim adalah organ berbentuk seperti buah pir terbalik.",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Menjadi tempat janin dapat tumbuh selama kehamilan.",
                  "Lapisan rahim mengalami perubahan selama siklus menstruasi.",
                ],
              },

              {
                type: "subheading",
                text: "F. Leher Rahim (Serviks)",
              },
              {
                type: "paragraph",
                text: "Serviks adalah bagian bawah rahim.",
              },
              {
                type: "list",
                tone: "blue",
                items: ["Menghubungkan rahim dengan vagina."],
              },

              {
                type: "callout",
                variant: "remember",
                title: "Ingat!",
                text: "Setiap bagian organ reproduksi memiliki fungsi yang berbeda tetapi saling bekerja sama.",
              },
            ],
          },
          // card 3
          {
            order: 3,

            title: "Perubahan saat Pubertas",

            content: [
              {
                type: "paragraph",
                text: "Pubertas adalah masa ketika tubuh mengalami perubahan menuju tubuh yang lebih dewasa.",
              },
              {
                type: "subheading",
                text: "Perubahan fisik yang bisa terjadi:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Payudara mulai tumbuh.",
                  "Pinggul mulai berubah bentuk.",
                  "Tumbuh rambut di ketiak dan area genital.",
                  "Mulai mengalami menstruasi.",
                ],
              },
              {
                type: "subheading",
                text: "Perubahan pada sistem reproduksi:",
              },
              {
                type: "list",
                tone: "blue",
                items: [
                  "Ovarium mulai mematangkan dan melepaskan sel telur.",
                  "Rahim mulai mengalami siklus menstruasi.",
                ],
              },
              {
                type: "subheading",
                text: "Perubahan emosi yang bisa terjadi:",
              },
              {
                type: "list",
                tone: "yellow",
                items: [
                  "Suasana hati atau mood lebih mudah berubah.",
                  "Menjadi lebih sensitif.",
                  "Mulai memiliki ketertarikan terhadap orang lain.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Setiap Orang Bisa Berbeda",
                text: "Perubahan pubertas tidak selalu terjadi pada waktu atau urutan yang sama pada setiap remaja.",
              },
            ],
          },

          // card 4
          {
            order: 4,

            title: "Perubahan yang Umum dan kapan Perlu Bantuan",

            content: [
              {
                type: "paragraph",
                text: "Tubuh mengalami berbagai perubahan selama masa remaja. Mengenali pola tubuh sendiri dapat membantu kamu mengetahui jika ada sesuatu yang terasa berbeda.",
              },
              {
                type: "subheading",
                text: "Keputihan yang umum biasanya:",
              },
              {
                type: "list",
                tone: "green",
                items: [
                  "Berwarna bening atau putih.",
                  "Tidak memiliki bau yang sangat menyengat.",
                  "Tidak disertai rasa gatal.",
                  "Tidak disertai rasa nyeri.",
                ],
              },
              {
                type: "callout",
                variant: "concept",
                title: "Keputihan Bisa Menjadi Bagian dari Proses Alami Tubuh",
                text: "Cairan vagina dapat berubah selama siklus dan membantu menjaga lingkungan vagina.",
              },
              {
                type: "subheading",
                text: "Tentang menstruasi:",
              },
              {
                type: "list",
                tone: "blue",
                items: [
                  "Pada remaja, siklus menstruasi bisa berkisar sekitar 21–45 hari.",
                  "Menstruasi biasanya berlangsung sekitar 3–7 hari.",
                ],
              },
              {
                type: "subheading",
                text: "Bicaralah dengan orang tua atau tenaga kesehatan jika:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Keputihan berubah menjadi hijau, kuning, atau abu-abu.",
                  "Keputihan memiliki bau yang sangat tidak sedap.",
                  "Muncul rasa gatal atau nyeri.",
                  "Ada perubahan pada tubuh yang membuatmu khawatir.",
                ],
              },
              {
                type: "callout",
                variant: "warning",
                title: "Tidak Perlu Mendiagnosis Sendiri",
                text: "Jika ada perubahan yang tidak biasa atau membuatmu khawatir, mintalah bantuan orang dewasa yang dipercaya atau tenaga kesehatan.",
              },
            ],
          },

          // card 5
          {
            order: 5,

            title: "Yang Perlu Kamu Ingat",

            content: [
              {
                type: "paragraph",
                text: "Tubuhmu adalah bagian penting dari dirimu. Mengenalnya membantu kamu merawat dan menjaganya dengan lebih baik.",
              },
              {
                type: "callout",
                variant: "summary",
                title: "Ringkasnya",
                items: [
                  "Kesehatan reproduksi adalah bagian dari kesehatan tubuh.",
                  "Organ reproduksi memiliki fungsi yang berbeda dan saling berhubungan.",
                  "Pubertas membawa perubahan fisik dan emosional.",
                  "Pengalaman pubertas setiap orang bisa berbeda.",
                  "Perhatikan perubahan pada tubuh dan cari bantuan jika ada sesuatu yang membuatmu khawatir.",
                ],
              },
              {
                type: "callout",
                variant: "tip",
                title: "Siap Menguji Pemahamanmu?",
                text: "Sekarang, ayo ingat kembali materi tentang tubuh dan kesehatan reproduksi melalui game Chapter 1.",
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

  console.log("Chapter 1 berhasil dibuat:", chapter1);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
