import { prisma } from "../config/prisma.js";

async function main() {
  const chapter4 = await prisma.learningModule.create({
    data: {
      chapterNumber: 4,

      title: "Aku Berharga: Batas & Hubungan Sehat",

      objective:
        "Mengenali batas pribadi, persetujuan, hubungan sehat dan tidak sehat, tekanan teman, serta cara menjaga diri dan mencari bantuan.",

      durationLabel: "±12–15 menit",

      contentVersion: 1,

      lastReviewedAt: null,

      cards: {
        create: [
          {
            order: 1,

            title: "Apa itu Hubungan Sehat?",

            content: [
              {
                type: "paragraph",
                text: "Hubungan sehat bisa terjadi dengan keluarga, teman, atau pacar.",
              },
              {
                type: "subheading",
                text: "Ciri hubungan sehat:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Saling menghormati.",
                  "Merasa aman dan nyaman.",
                  "Tidak dipaksa melakukan sesuatu.",
                  "Bisa menjadi diri sendiri.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Ingat!",
                text: "Hubungan yang sehat membuatmu merasa dihargai, bukan takut.",
              },
            ],
          },

          // card 2
          {
            order: 2,

            title: "Hak atas Tubuh, Privasi, dan Batas Pribadi",

            content: [
              {
                type: "paragraph",
                text: "Setiap orang memiliki batas pribadi dan berhak merasa aman serta nyaman.",
              },
              {
                type: "subheading",
                text: "Kamu berhak:",
              },
              {
                type: "list",
                tone: "blue",
                items: [
                  "Mengatakan “tidak”.",
                  "Menjaga privasi.",
                  "Memilih apa yang membuatmu nyaman.",
                ],
              },
              {
                type: "subheading",
                text: "Contoh batas pribadi:",
              },
              {
                type: "list",
                tone: "yellow",
                items: [
                  "Tidak ingin dipeluk.",
                  "Tidak ingin barang pribadimu dibuka.",
                  "Tidak ingin cerita pribadimu disebarkan.",
                ],
              },
              {
                type: "callout",
                variant: "concept",
                title: "Batas Pribadi Itu Sehat",
                text: "Menetapkan batas bukan berarti egois. Batas membantu orang lain memahami apa yang membuatmu nyaman atau tidak nyaman.",
              },
            ],
          },
          // card 3
          {
            order: 3,

            title: "Apa itu Persetujuan (Consent)?",

            content: [
              {
                type: "paragraph",
                text: "Persetujuan atau consent berarti memberikan izin dengan jelas dan sukarela terhadap sesuatu yang menyangkut tubuh, barang, atau pilihan pribadi.",
              },
              {
                type: "subheading",
                text: "Contoh dalam kehidupan sehari-hari:",
              },
              {
                type: "list",
                ordered: true,
                tone: "pink",
                items: [
                  "Meminjam barang milik orang lain → harus meminta izin.",
                  "Menyentuh seseorang → harus meminta izin.",
                  "Membagikan foto teman → harus meminta izin.",
                ],
              },
              {
                type: "subheading",
                text: "Persetujuan harus:",
              },
              {
                type: "list",
                tone: "green",
                items: [
                  "Jelas.",
                  "Diberikan secara sukarela.",
                  "Tidak diberikan karena paksaan atau tekanan.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Kamu Boleh Berkata Tidak",
                text: "Jika kamu merasa tidak nyaman, kamu berhak menolak atau mengubah keputusanmu.",
              },
            ],
          },

          // card 4
          {
            order: 4,

            title: "Tanda Hubungan Tidak Sehat",

            content: [
              {
                type: "paragraph",
                text: "Perhatikan jika hubungan dengan seseorang membuatmu sering merasa takut, tertekan, atau tidak dihargai.",
              },
              {
                type: "subheading",
                text: "Waspadai jika seseorang:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Memaksa kamu melakukan sesuatu.",
                  "Membuatmu takut.",
                  "Mengontrol kamu secara berlebihan.",
                  "Menghina atau merendahkanmu.",
                  "Membuatmu merasa bersalah terus-menerus.",
                ],
              },
              {
                type: "callout",
                variant: "warning",
                title: "Ini Bukan Hubungan yang Sehat",
                text: "Kamu pantas diperlakukan dengan baik, aman, dan penuh hormat.",
              },
            ],
          },

          // card 5
          {
            order: 5,

            title: "Menghadapi Tekanan Teman",

            content: [
              {
                type: "paragraph",
                text: "Tekanan teman sebaya terjadi ketika teman mendorong atau memaksa kamu melakukan sesuatu yang sebenarnya tidak ingin kamu lakukan.",
              },
              {
                type: "subheading",
                text: "Contohnya:",
              },
              {
                type: "list",
                tone: "yellow",
                items: [
                  "Memaksa melakukan sesuatu yang tidak kamu inginkan.",
                  "Mengolok atau mengejek ketika kamu menolak.",
                ],
              },
              {
                type: "subheading",
                text: "Cara menghadapinya:",
              },
              {
                type: "list",
                ordered: true,
                tone: "green",
                items: [
                  "Katakan “tidak” dengan jelas.",
                  "Tetap pada keputusanmu.",
                  "Cari teman yang menghargai pilihanmu.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Teman yang Baik Menghargai Pilihanmu",
                text: "Kamu tidak harus mengikuti orang lain hanya supaya diterima dalam kelompok.",
              },
            ],
          },

          {
            order: 6,

            title: "Mengenali Kekerasan dan Pelecehan",

            content: [
              {
                type: "paragraph",
                text: "Kekerasan dan pelecahan tidak selalu berupa fisik. Kekerasan dan pelecehan juga dapat terjadi melalui perkataan atau media digital.",
              },
              {
                type: "subheading",
                text: "Beberapa bentuk kekerasan / pelecehan:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Fisik: menyentuh atau menyakiti tubuh.",
                  "Verbal: mengejek, membentak, atau merendahkan.",
                  "Digital: mengambil foto (misal: bagian tubuh) tanpa izin atau mengirim pesan yang tidak pantas (sexting).",
                ],
              },
              {
                type: "callout",
                variant: "warning",
                title: "Ini Tidak Boleh Dianggap Normal",
                text: "Jika seseorang menyakiti, mengancam, atau membuatmu takut, kamu berhak mencari bantuan.",
              },
            ],
          },
          {
            order: 7,

            title: "Keamanan Digital",

            content: [
              {
                type: "paragraph",
                text: "Internet membantu kita belajar dan berkomunikasi, tetapi kita tetap perlu menjaga keamanan diri saat menggunakannya.",
              },
              {
                type: "subheading",
                text: "Saat menggunakan internet (media sosial):",
              },
              {
                type: "list",
                tone: "blue",
                items: [
                  "Jangan sembarangan membagikan data pribadi.",
                  "Berhati-hatilah terhadap orang asing yang kamu kenal secara online.",
                  "Jangan mengirim foto atau video tubuh yang bersifat pribadi.",
                ],
              },
              {
                type: "callout",
                variant: "warning",
                title: "Kalau Sesuatu Membuatmu Tidak Nyaman",
                text: "Hentikan komunikasi, jangan membalas tekanan atau ancaman, dan beri tahu orang dewasa yang kamu percaya.",
              },
            ],
          },
          {
            order: 8,

            title: "Situasi Berisiko dan Meminta Bantuan",

            content: [
              {
                type: "paragraph",
                text: "Perhatikan perasaanmu. Jika kamu merasa tidak nyaman, takut, atau terancam, segera cari bantuan.",
              },
              {
                type: "subheading",
                text: "Kamu bisa bicara dengan:",
              },
              {
                type: "list",
                tone: "green",
                items: [
                  "Orang tua atau wali.",
                  "Guru atau wali kelas.",
                  "Konselor atau orang dewasa lain yang kamu percaya.",
                ],
              },
              {
                type: "callout",
                variant: "tip",
                title: "Jangan Berhenti Mencari Bantuan",
                text: "Kalau orang pertama yang kamu beri tahu tidak membantu, cari orang dewasa lain yang kamu percaya.",
              },
              {
                type: "callout",
                variant: "remember",
                title: "Meminta Bantuan Itu Berani",
                text: "Berbicara tentang situasi yang membuatmu takut atau tidak nyaman adalah salah satu cara melindungi diri.",
              },
            ],
          },
          {
            order: 9,

            title: "Yang Perlu Kamu Ingat",

            content: [
              {
                type: "paragraph",
                text: "Menjaga diri bukan berarti kamu lemah. Itu berarti kamu menghargai dirimu sendiri.",
              },
              {
                type: "callout",
                variant: "summary",
                title: "Ringkasnya",
                items: [
                  "Hubungan sehat didasarkan pada rasa aman dan saling menghormati.",
                  "Kamu berhak memiliki batas pribadi.",
                  "Persetujuan harus jelas dan diberikan tanpa paksaan.",
                  "Tekanan, penghinaan, kontrol berlebihan, dan kekerasan bukan bagian dari hubungan yang sehat.",
                  "Jaga privasi dan keamanan saat menggunakan internet.",
                  "Jika merasa takut atau terancam, cari bantuan dari orang dewasa yang dipercaya.",
                ],
              },
              {
                type: "callout",
                variant: "tip",
                title: "Siap Menguji Pemahamanmu?",
                text: "Sekarang, ayo ingat kembali materi tentang batas pribadi, hubungan sehat, dan keamanan melalui game Chapter 4.",
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

  console.log("Chapter 4 berhasil dibuat:", chapter4);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
