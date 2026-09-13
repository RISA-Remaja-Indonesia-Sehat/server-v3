import { prisma } from "../config/prisma.js";

async function main() {
  const chapter3 = await prisma.learningModule.create({
    data: {
      chapterNumber: 3,

      title: "Kebersihan & Perawatan Diri",

      objective:
        "Belajar merawat vulva, menjaga kebersihan saat menstruasi, dan menghindari kebiasaan atau produk yang dapat menyebabkan iritasi.",

      durationLabel: "±8–10 menit",

      contentVersion: 1,

      lastReviewedAt: null,

      cards: {
        create: [
          {
            order: 1,

            title: "Kebiasaan Bersih Sehari-hari",

            content: [
              {
                type: "paragraph",
                text: "Menjaga kebersihan tubuh adalah bagian penting dari kesehatan.",
              },
              {
                type: "subheading",
                text: "Beberapa kebiasaan sederhana yang bisa dilakukan setiap hari:",
              },
              {
                type: "list",
                tone: "green",
                items: [
                  "Mandi secara teratur, terutama setelah banyak berkeringat.",
                  "Membersihkan vulva (bagian luar organ genital) dengan air bersih.",
                  "Mengeringkan area tersebut dengan lembut menggunakan handuk bersih.",
                  "Mencuci tangan sebelum dan sesudah dari toilet.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Penting Diingat",
                text: "Vagina memiliki sistem alami untuk menjaga kebersihannya. Bagian luar, yaitu vulva, cukup dibersihkan dengan lembut menggunakan air bersih.",
              },
            ],
          },

          // card 2
          {
            order: 2,

            title: "Cara Merawat Vulva dengan Benar",

            content: [
              {
                type: "subheading",
                text: "Yang bisa dilakukan:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Bersihkan vulva dengan air bersih.",
                  "Tidak perlu menggunakan sabun khusus, terutama yang memiliki pewangi.",
                  "Bersihkan dari depan ke belakang setelah buang air kecil atau besar.",
                ],
              },
              {
                type: "paragraph",
                text: "Membersihkan dari depan ke belakang membantu mencegah kuman dari area belakang berpindah ke area depan.",
              },
              {
                type: "subheading",
                text: "Hindari:",
              },
              {
                type: "list",
                tone: "yellow",
                items: [
                  "Sabun dengan pewangi kuat.",
                  "Cairan pembersih khusus tanpa anjuran tenaga kesehatan.",
                ],
              },
              {
                type: "callout",
                variant: "warning",
                title: "Kenapa Perlu Dihindari?",
                text: "Produk yang tidak diperlukan atau memiliki pewangi kuat dapat menyebabkan iritasi.",
              },
            ],
          },
          // card 3
          {
            order: 3,

            title: "Kebersihan Pakaian Dalam",

            content: [
              {
                type: "paragraph",
                text: "Pakaian dalam yang bersih membantu menjaga kesehatan dan kenyamanan.",
              },
              {
                type: "subheading",
                text: "Hal yang perlu diperhatikan:",
              },
              {
                type: "list",
                tone: "blue",
                items: [
                  "Ganti pakaian dalam setiap hari dan segera ganti jika terasa lembap, basah, atau kotor.",
                  "Gunakan bahan yang menyerap keringat, seperti katun.",
                  "Hindari pakaian dalam yang terlalu ketat.",
                ],
              },
              {
                type: "callout",
                variant: "remember",
                title: "Jaga Tetap Bersih dan Kering",
                text: "Pakaian dalam yang bersih dan tidak terlalu lembap membantu mengurangi rasa tidak nyaman dan iritasi.",
              },
            ],
          },

          // card 4
          {
            order: 4,

            title: "Kebersihan Saat Menstruasi",

            content: [
              {
                type: "paragraph",
                text: "Saat menstruasi, kebersihan perlu lebih diperhatikan.",
              },
              {
                type: "subheading",
                text: "Hal yang perlu dilakukan:",
              },
              {
                type: "list",
                tone: "pink",
                items: [
                  "Ganti pembalut setiap 3–4 jam atau saat sudah penuh.",
                  "Cuci tangan sebelum dan sesudah mengganti pembalut.",
                  "Bersihkan vulva dengan air bersih.",
                  "Buang pembalut bekas ke tempat sampah.",
                ],
              },
              {
                type: "callout",
                variant: "warning",
                title: "Jangan Memakai Pembalut Terlalu Lama",
                text: "Menggunakan pembalut terlalu lama dapat membuat area menjadi lembap dan menyebabkan iritasi.",
              },
            ],
          },

          // card 5
          {
            order: 5,

            title: "Tetap Bersih Saat Banyak Beraktivitas",

            content: [
              {
                type: "paragraph",
                text: "Saat berolahraga atau melakukan aktivitas berat, tubuh akan lebih banyak berkeringat.",
              },
              {
                type: "subheading",
                text: "Hal yang bisa dilakukan:",
              },
              {
                type: "list",
                tone: "green",
                items: [
                  "Gunakan pakaian yang nyaman dan menyerap keringat.",
                  "Ganti pakaian setelah berolahraga.",
                  "Mandi setelah aktivitas berat.",
                  "Ganti pakaian dalam jika sudah lembap.",
                ],
              },
              {
                type: "callout",
                variant: "tip",
                title: "Jangan Biarkan Tubuh Terlalu Lama Lembap",
                text: "Area yang lembap terlalu lama bisa menyebabkan rasa tidak nyaman.",
              },
            ],
          },

          {
            order: 6,

            title: "Yang Perlu Kamu Ingat",

            content: [
              {
                type: "paragraph",
                text: "Menjaga kebersihan vulva dan tubuh adalah bagian penting dari merawat diri sendiri.",
              },
              {
                type: "callout",
                variant: "summary",
                title: "Ringkasnya",
                items: [
                  "Bersihkan vulva dengan air bersih.",
                  "Gunakan pakaian dalam yang bersih dan nyaman.",
                  "Jaga kebersihan saat menstruasi.",
                  "Hindari produk yang tidak perlu atau berpewangi kuat.",
                  "Ganti pakaian setelah banyak berkeringat.",
                ],
              },
              {
                type: "paragraph",
                text: "Tubuhmu berharga, dan merawatnya adalah bentuk menghargai diri sendiri.",
              },
              {
                type: "paragraph",
                text: "Dengan kebiasaan sederhana setiap hari, kamu bisa menjaga kesehatan dan merasa lebih nyaman dalam beraktivitas.",
              },
              {
                type: "callout",
                variant: "tip",
                title: "Siap Menguji Pemahamanmu?",
                text: "Sekarang, ayo ingat kembali materi tentang kebersihan dan perawatan diri melalui game Chapter 3.",
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

  console.log("Chapter 3 berhasil dibuat:", chapter3);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
