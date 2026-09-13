import { prisma } from "../config/prisma.js";

async function main() {
  const chapter7 = await prisma.learningModule.create({
    data: {
      chapterNumber: 7,

      title: "Kenali Infeksi Menular Seksial (IMS)",

      objective:
        "Memahami apa itu IMS, beberapa jenis dan tanda yang perlu diperhatikan, serta kapan mencari bantuan tanpa menghakimi.",

      durationLabel: "±10–12 menit",

      contentVersion: 1,

      lastReviewedAt: null,

      cards: {
        create: [
          {
            order: 1,

            title: "Apa itu IMS?",

            content: [
              {
                type: "paragraph",
                text: "Infeksi Menular Seksual (IMS) adalah infeksi yang terutama dapat menular melalui kontak seksual.",
              },
              {
                type: "subheading",
                text: "Hal yang perlu kamu tahu:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "IMS dapat disebabkan oleh bakteri, virus, atau parasit.",
                  "IMS dapat memengaruhi kesehatan reproduksi dan bagian tubuh lainnya.",
                  "Beberapa IMS dapat terjadi tanpa menimbulkan gejala.",
                  "IMS adalah masalah kesehatan yang perlu diperiksa dan ditangani dengan tepat.",
                ],
              },
              {
                type: "callout",
                variant: "concept",
                title: "IMS adalah Masalah Kesehatan",
                text: "Seseorang yang mengalami IMS membutuhkan informasi, pemeriksaan, dan perawatan yang tepat, bukan penghakiman.",
              },
            ],
          },

          // card 2
          {
            order: 2,

            title: "Jenis IMS yang Umum",

            content: [
              {
                type: "paragraph",
                text: "Ada berbagai jenis IMS dengan penyebab dan dampak yang berbeda.",
              },
              {
                type: "subheading",
                text: "Beberapa contohnya:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "HPV (Human Papillomavirus) → virus yang sangat umum. Beberapa jenis HPV dapat menyebabkan kutil atau penyakit serius seperti kanker serviks.",
                  "HIV (Human Immunodeficiency Virus) → virus yang memengaruhi sistem kekebalan tubuh.",
                  "Sifilis → infeksi bakteri yang dapat dimulai dengan luka dan perlu ditangani oleh tenaga kesehatan.",
                  "Gonore → infeksi bakteri yang dapat memengaruhi area genital dan bagian tubuh lainnya.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Ingat!",
                text: "Jenis IMS berbeda-beda, sehingga pemeriksaan tenaga kesehatan penting untuk mengetahui penyebab dan penanganannya.",
              },
            ],
          },
          // card 3
          {
            order: 3,

            title: "Tanda-Tanda yang Perlu Diperhatikan",

            content: [
              {
                type: "paragraph",
                text: "Beberapa IMS dapat menimbulkan perubahan pada tubuh yang perlu diperhatikan.",
              },
              {
                type: "subheading",
                text: "Tanda yang bisa muncul:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Nyeri atau rasa tidak nyaman di area genital.",
                  "Keputihan yang tidak biasa, misalnya perubahan warna, bau, atau jumlah.",
                  "Luka, ruam, atau benjolan di area genital atau sekitarnya.",
                  "Nyeri atau rasa terbakar saat buang air kecil.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "IMS Tidak Selalu Menimbulkan Gejala",
                text: "Beberapa IMS dapat terjadi tanpa tanda yang terlihat atau dirasakan.",
              },
              {
                type: "callout",
                variant: "warning",
                title: "Jika Ada yang Terasa Tidak Biasa",
                text: "Jangan mencoba mendiagnosis sendiri. Bicaralah dengan orang dewasa yang dipercaya atau tenaga kesehatan.",
              },
            ],
          },

          // card 4
          {
            order: 4,

            title: "Tenaga Kesehatan Bisa Membantu",

            content: [
              {
                type: "paragraph",
                text: "Jika kamu memiliki pertanyaan atau khawatir tentang kesehatanmu, tenaga kesehatan dapat membantu.",
              },
              {
                type: "subheading",
                text: "Tenaga kesehatan dapat:",
              },
              {
                type: "list",
                tone: "blue",
                items: [
                  "Memberikan informasi kesehatan yang benar.",
                  "Melakukan pemeriksaan jika diperlukan.",
                  "Membantu mengetahui penyebab keluhan.",
                  "Memberikan atau menyarankan perawatan yang sesuai.",
                ],
              },
              {
                type: "callout",
                variant: "tip",
                title: "Mencari Bantuan Itu Baik",
                text: "Bertanya dan mencari bantuan ketika ada masalah kesehatan adalah langkah yang bertanggung jawab.",
              },
            ],
          },

          // card 5
          {
            order: 5,

            title: "Hindari Stigma, Tunjukkan Kepedulian",

            content: [
              {
                type: "paragraph",
                text: "Stigma adalah sikap negatif, memberi label buruk, atau menghakimi seseorang karena kondisi kesehatannya.",
              },
              {
                type: "subheading",
                text: "Stigma dapat membuat seseorang:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Takut mencari bantuan.",
                  "Merasa sendirian atau dikucilkan.",
                  "Menunda pemeriksaan.",
                  "Tidak mendapatkan perawatan yang dibutuhkan.",
                ],
              },
              {
                type: "subheading",
                text: "Sikap yang lebih baik:",
              },
              {
                type: "list",
                ordered: true,
                tone: "green",
                items: [
                  "Tidak mengejek.",
                  "Tidak menghakimi.",
                  "Menjaga privasi orang lain.",
                  "Bersikap peduli dan menghormati.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Setiap Orang Berhak Mendapat Dukungan",
                text: "Kondisi kesehatan seseorang tidak menentukan nilai dirinya.",
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
                  "IMS dapat disebabkan oleh bakteri, virus, atau parasit.",
                  "IMS terutama dapat menular melalui kontak seksual.",
                  "Beberapa IMS memiliki gejala, tetapi sebagian lainnya bisa tidak menimbulkan gejala.",
                  "Perubahan yang tidak biasa pada tubuh perlu diperhatikan.",
                  "Tenaga kesehatan dapat membantu memberikan informasi, pemeriksaan, dan perawatan.",
                  "Jangan mengejek atau menghakimi seseorang karena kondisi kesehatannya.",
                ],
              },
              {
                type: "paragraph",
                text: "Dengan pengetahuan yang benar, kamu bisa lebih peduli terhadap kesehatan diri sendiri dan orang lain.",
              },
              {
                type: "callout",
                variant: "tip",
                title: "Siap Menguji Pemahamanmu?",
                text: "Sekarang, ayo ingat kembali materi tentang Infeksi Menular Seksual melalui game Chapter 7.",
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

  console.log("Chapter 7 berhasil dibuat:", chapter7);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
