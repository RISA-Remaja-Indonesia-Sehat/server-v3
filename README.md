## API Documentation

Dokumentasi endpoint RISA tersedia melalui Postman:

([View RISA API Dcumentation](https://documenter.getpostman.com/view/58428062/2sBYB2qSzx))

Dokumentasi tersebut mencakup:

- daftar endpoint;
- metode dan URL request;
- kebutuhan autentikasi;
- request body dan parameter;
- contoh response berhasil;
- kemungkinan response error;
- contoh penggunaan melalui Postman dan beberapa bahasa pemrograman.

### Authentication

RISA menggunakan dua mekanisme autentikasi:

| Pengguna | Mekanisme |
|---|---|
| Wali | Supabase Bearer access token |
| Anak | Cookie HttpOnly `risa_child_session` |

Token wali dikirim melalui header:

```http
Authorization: Bearer <access_token>

Gunakan environment variable berikut:

Variable	        Description
baseUrl	            Base URL backend RISA
guardianToken	    Supabase access token wali
consentRequestId	ID consent yang sedang diuji
chapterNumber	    Nomor chapter
postId	            ID postingan Temanku
commentId	        ID komentar
contentVersion	    Versi konten post-test
postTestAnswers	    Jawaban post-test yang dihasilkan dari daftar pertanyaan


## Backend API

Frontend RISA berkomunikasi dengan backend Express melalui REST API.

- [Backend Repository](https://github.com/RISA-Remaja-Indonesia-Sehat/server-v3)
- [RISA API Documentation](https://documenter.getpostman.com/view/58428062/2sBYB2qSzx)

Autentikasi wali menggunakan Supabase access token, sedangkan autentikasi anak menggunakan cookie HttpOnly `risa_child_session`.