import { prisma } from "../config/prisma.js";

async function main() {
  const chapter2 = await prisma.learningModule.create({
    data: {
      chapterNumber: 2,

      title: "Menstruasi & Siklusku",

      objective:
        "Memahami menstruasi dan siklusnya, perubahan yang bisa dirasakan, cara mengurangi nyeri, dan kapan perlu mencari bantuan.",

      durationLabel: "±10–12 menit",

      contentVersion: 1,

      lastReviewedAt: null,

      cards: {
        create: [
          {
            order: 1,

            title: "Apa itu Menstruasi?",

            content: [
              {
                type: "paragraph",
                text: "Menstruasi (haid) adalah proses alami ketika tubuh perempuan meluruhkan lapisan dinding rahim, yang keluar melalui vagina sebagai darah.",
              },
              {
                type: "subheading",
                text: "Kenapa ini terjadi?",
              },
              {
                type: "paragraph",
                text: "Setiap bulan, tubuh mempersiapkan rahim untuk kemungkinan kehamilan. Jika tidak terjadi kehamilan, lapisan ini tidak diperlukan sehingga tubuh akan meluruhkannya.",
              },
              {
                type: "subheading",
                text: "Hal penting:",
              },
              {
                type: "list",
                tone: "yellow",
                items: [
                  "Pada remaja, siklus menstruasi biasanya terjadi setiap 21–45 hari.",
                  "Menstruasi biasanya berlangsung sekitar 3–7 hari.",
                  "Menstruasi merupakan bagian alami dari perkembangan tubuh.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Ingat!",
                text: "Menstruasi adalah proses alami yang terjadi sebagai bagian dari siklus reproduksi.",
              },
            ],
          },

          // card 2
          {
            order: 2,

            title: "Siklus Menstruasi",

            content: [
              {
                type: "image",
                src: "/img/menstrual-cycle.png",
                alt: "Ilustrasi siklus menstruasi",
              },
              {
                type: "paragraph",
                text: "Siklus menstruasi adalah rangkaian perubahan yang terjadi dalam tubuh dari satu menstruasi ke menstruasi berikutnya.",
              },
              {
                type: "subheading",
                text: "Ada 4 tahap utama:",
              },
              {
                type: "list",
                ordered: true,
                tone: "pink",
                items: [
                  "Fase menstruasi → lapisan rahim luruh dan keluar sebagai darah.",
                  "Fase folikuler → salah satu sel telur mulai matang di ovarium.",
                  "Fase ovulasi → sel telur dilepaskan dari ovarium.",
                  "Fase luteal → rahim mempersiapkan diri. Jika tidak terjadi kehamilan, siklus kembali ke fase menstruasi.",
                ],
              },
              {
                type: "callout",
                variant: "concept",
                title: "Siklus Terus Berulang",
                text: "Tubuh menjalani tahapan-tahapan ini secara berulang, tetapi panjang siklus setiap orang bisa berbeda.",
              },
            ],
          },
          // card 3
          {
            order: 3,

            title: "Emosi & Mood saat Menstruasi",

            content: [
              {
                type: "paragraph",
                text: "Perubahan hormon selama siklus menstruasi dapat memengaruhi perasaan dan kondisi tubuh.",
              },
              {
                type: "subheading",
                text: "Kamu mungkin merasa:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Lebih sensitif.",
                  "Lebih mudah sedih.",
                  "Lebih mudah marah.",
                  "Lebih mudah lelah.",
                ],
              },
              {
                type: "paragraph",
                text: "Perubahan seperti ini bisa dialami oleh banyak remaja, meskipun pengalaman setiap orang berbeda.",
              },
              {
                type: "subheading",
                text: "Cara membantu mengelola mood:",
              },
              {
                type: "list",
                tone: "blue",
                items: [
                  "Istirahat yang cukup.",
                  "Cerita kepada orang yang dipercaya.",
                  "Melakukan aktivitas yang disukai.",
                  "Menarik napas dalam-dalam dan mencoba rileks.",
                ],
              },
              {
                type: "callout",
                variant: "tip",
                title: "Kenali Perasaanmu",
                text: "Tidak apa-apa jika perasaanmu berubah. Yang penting, perhatikan bagaimana perasaan itu memengaruhi aktivitas sehari-hari.",
              },
            ],
          },

          // card 4
          {
            order: 4,

            title: "Cara Mengatasi Nyeri Haid",

            content: [
              {
                type: "paragraph",
                text: "Sebagian remaja mengalami nyeri haid, terutama di bagian bawah perut.",
              },
              {
                type: "subheading",
                text: "Cara yang dapat membantu mengurangi nyeri:",
              },
              {
                type: "list",
                ordered: true,
                tone: "pink",
                items: [
                  "Gunakan kompres hangat pada perut bagian bawah.",
                  "Istirahat yang cukup.",
                  "Lakukan gerakan ringan seperti berjalan santai.",
                  "Minum air yang cukup.",
                ],
              },
              {
                type: "callout",
                variant: "warning",
                title: "Jika Nyeri Sangat Mengganggu",
                text: "Jika nyeri membuatmu sulit melakukan aktivitas sehari-hari, beri tahu orang tua atau tenaga kesehatan.",
              },
            ],
          },

          // card 5
          {
            order: 5,

            title: "Kapan Perlu Mencari Bantuan?",

            content: [
              {
                type: "paragraph",
                text: "Jangan ragu mencari bantuan jika ada sesuatu tentang menstruasi yang membuatmu khawatir.",
              },
              {
                type: "subheading",
                text: "Bicaralah dengan orang dewasa atau tenaga kesehatan jika mengalami:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Nyeri menstruasi yang sangat kuat.",
                  "Perdarahan menstruasi yang terasa sangat banyak.",
                  "Menstruasi tidak datang selama beberapa bulan.",
                  "Kekhawatiran atau kebingungan tentang perubahan tubuhmu.",
                ],
              },
              {
                type: "subheading",
                text: "Kamu bisa bicara dengan:",
              },
              {
                type: "list",
                tone: "blue",
                items: [
                  "Orang tua atau wali.",
                  "Guru atau orang dewasa yang dipercaya.",
                  "Tenaga kesehatan.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Meminta Bantuan Itu Baik",
                text: "Bertanya ketika ada sesuatu yang membuatmu khawatir adalah bagian dari menjaga kesehatan.",
              },
            ],
          },

          {
            order: 6,

            title: "Yang Perlu Kamu Ingat",

            content: [
              {
                type: "callout",
                variant: "summary",
                title: "Ringkasnya",
                items: [
                  "Menstruasi adalah proses alami dalam tubuh.",
                  "Siklus menstruasi terdiri dari beberapa tahap.",
                  "Perubahan mood bisa terjadi selama siklus menstruasi.",
                  "Nyeri haid ringan dapat dibantu dengan beberapa cara sederhana.",
                  "Jika ada sesuatu yang sangat mengganggu atau mengkhawatirkan, cari bantuan.",
                ],
              },
              {
                type: "paragraph",
                text: "Tubuh setiap orang bisa memiliki pengalaman menstruasi yang berbeda. Mengenali pola tubuhmu sendiri dapat membantu kamu memahami perubahan yang terjadi.",
              },
              {
                type: "callout",
                variant: "tip",
                title: "Siap Menguji Pemahamanmu?",
                text: "Sekarang, ayo ingat kembali materi tentang menstruasi dan siklusnya melalui game Chapter 2.",
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

  console.log("Chapter 2 berhasil dibuat:", chapter2);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
