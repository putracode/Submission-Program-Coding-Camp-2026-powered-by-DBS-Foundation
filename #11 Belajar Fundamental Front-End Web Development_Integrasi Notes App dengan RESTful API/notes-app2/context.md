ini lanjutan tugas sebelumnya

Sejauh ini, Anda telah belajar hal-hal berikut.

Pengelolaan JavaScript packages dengan package manager.
Melakukan bundel terhadap seluruh kode-kode JavaScript dengan module bundler.
Mendapatkan data dari penyedia data secara daring menggunakan teknik Asynchronous JavaScript Request.
Semua modul ini menjadi kebutuhan kita dalam menjadi front-end web developer yang andal. Tidak serta merta Anda dinyatakan lulus atau paham seluruh materi di atas. Untuk mengujinya, kami akan melakukan asesmen dengan memberikan tugas kepada Anda untuk membangun kembali aplikasi web yang telah dibangun sebelumnya. Nantinya, reviewer kami akan memeriksa pekerjaan Anda dan memberikan hasil reviu pada proyek yang dibuat.

Tujuan Akhir
Submission ini meminta Anda melanjutkan lagi pengembangan aplikasi pencatatan. Sebelumnya, kita telah berhasil membangun tampilan dari dasar, menerapkan teknik layouting dengan CSS Grid, dan mengadopsi konsep reusable UI dengan Web Component pada Notes App. Kami ucapkan selamat!

Pada pengerjaan submission proyek akhir ini, pengembangan lebih lanjut dari Notes App akan Anda butuhkan sebagai salah satu syarat untuk lulus dari kelas ini. Anda akan diminta untuk menerapkan tiga materi yang telah kita dalami bersama. Dalam membangun aplikasi ini, dibutuhkan pemahaman tentang pengelolaan libraries, penerapan webpack sebagai module bundler, dan mengonsumsi data dari aplikasi back-end (RESTful API).

Jika Anda bingung, objektif yang didapat selama membuat aplikasi Club Finder App akan membantu dalam pengerjaan submission ini. Tentunya kami mengedepankan kreativitas Anda dalam membangun aplikasi, tetapi pastikan aplikasi yang dibuat memenuhi kriteria yang akan kami jelaskan.

Dalam mengerjakan proyek ini, ada beberapa kriteria yang perlu Anda penuhi. Kriteria-kriteria ini diperlukan agar Anda dapat lulus dari tugas ini.

Berikut adalah daftar kriteria dari proyek submission yang harus Anda penuhi.

Kriteria Wajib 1: Pertahankan Kriteria Submission Sebelumnya
Ini adalah lanjutan dari submission sebelumnya. Pastikan proyek yang telah Anda bangun masih memenuhi seluruh kriteria dari submission sebelumnya.

Kriteria Wajib 2: Memanfaatkan RESTful API sebagai Sumber Data
Aplikasi harus memanfaatkan RESTful API yang telah kami sediakan sebagai sumber data. RESTful API yang digunakan adalah https://notes-api.dicoding.dev/v2. Dokumentasi API bisa Anda akses pada tautan tersebut.

Dicoding Notes API (No Authentication)
API untuk menyimpan catatan publik secara online. Digunakan untuk latihan kelas Dicoding Academy.

Endpoint
https://notes-api.dicoding.dev/v2

Notes
Create Note
URL
/notes
Method
POST
Request Body
title as string
body as string
Response
{
  "status": "success",
  "message": "Note created",
  "data": {
      "id": "notes-_O6A6TJcCYUWO7t4",
      "title": "Hello, Notes!",
      "body": "My new notes.",
      "archived": false,
      "createdAt": "2022-07-28T10:12:12.396Z"
  }
}
Get Notes (non-archived)
URL
/notes
Method
GET
Response
{
  "status": "success",
  "message": "Notes retrieved",
  "data": [
      {
          "id": "notes-jT-jjsyz61J8XKiI",
          "title": "Welcome to Notes, Dimas!",
          "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
          "createdAt": "2022-07-28T10:03:12.594Z",
          "archived": false
      }
  ]
}
Get Archived Notes
URL
/notes/archived
Method
GET
Response
{
  "status": "success",
  "message": "Notes retrieved",
  "data": [
      {
          "id": "notes-jT-jjsyz61J8XKiI",
          "title": "Welcome to Notes, Dimas!",
          "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
          "createdAt": "2022-07-28T10:03:12.594Z",
          "archived": true
      }
  ]
}
Get Single Note
URL
/notes/{note_id}
Method
GET
Response
{
  "status": "success",
  "message": "Note retrieved",
  "data": {
      "id": "notes-jT-jjsyz61J8XKiI",
      "title": "Welcome to Notes, Dimas!",
      "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
      "createdAt": "2022-07-28T10:03:12.594Z",
      "archived": false
  }
}
Archive Note
URL
/notes/{note_id}/archive
Method
POST
Response
{
  "status": "success",
  "message": "Note archived"
}
Unarchive Note
URL
/notes/{note_id}/unarchive
Method
POST
Response
{
  "status": "success",
  "message": "Note unarchived"
}
Delete Note
URL
/notes/{note_id}
Method
DELETE
Response
{
  "status": "success",
  "message": "Note deleted"
}

Catatan
Jika alamat di atas tidak dapat di akses, Anda bisa gunakan alternatif dokumentasi di tautan berikut: Dokumentasi Notes API V2 (Alternatif).

Ada beberapa fitur yang wajib Anda adopsi dengan API di atas.

Membuat atau menambahkan catatan baru.
Mendapatkan dan menampilkan daftar catatan.
Menghapus catatan yang tersimpan.
Catatan:
Kriteria ini juga menyebabkan data local (data dumi) sudah tidak digunakan lagi. Silakan manfaatkan Notes API sebagai data utama aplikasi notesapp Anda.



Kriteria Wajib 3: Menggunakan webpack sebagai Module Bundler
Pengembangan aplikasi Notes App harus menggunakan webpack sebagai module bundler dengan spesifikasi berikut:

Aplikasi harus menerapkan html-webpack-plugin dalam konfigurasinya.
Aplikasi harus dapat dijalankan untuk fase development dengan perintah npm run start-dev dan memanfaatkan webpack-dev-server.
Aplikasi harus dapat di-build untuk fase production dengan perintah npm run build.
Kriteria Wajib 4: Menggunakan Fetch API
Menggunakan Fetch API untuk melakukan Asynchronous JavaScript Request dalam berinteraksi dengan API https://notes-api.dicoding.dev/v2.

Kriteria Wajib 5: Memiliki Indikator Loading
Anda diwajibkan untuk menampilkan indikator loading saat melakukan proses request HTTP dalam menunggu hasilnya. Contohnya menampilkan indikator loading saat user sedang masuk aplikasi atau buat akun baru.

Sebagai tips, Anda juga dapat membangun indikator loading menggunakan Web component.

Selain kriteria wajib, ada kriteria opsional yang dapat Anda patuhi agar mendapat nilai yang lebih tinggi.

Kriteria Opsional 1: Memiliki Fitur Arsip Catatan
Disarankan menerapkan fitur arsip (archive) catatan dalam aplikasi. Dokumentasi penerapannya dapat Anda simak di https://notes-api.dicoding.dev/v2.

Kriteria Opsional 2: Menampilkan Feedback Saat Terjadi Error
Proses request ke network ada kalanya terjadi kegagalan. Kami sangat menyarankan Anda untuk menampilkan pesan jika terjadi kegagalan. Anda dapat memanfaatkan Browser API seperti alert() method untuk menampilkan pesan gagal. Jika ingin, Anda dapat memanfaatkan library seperti sweetalert2.

Kriteria Opsional 3: Memiliki Efek Pergerakan Halus atau Animasi
Bagi user, aplikasi yang memiliki animasi yang halus akan menghilangkan rasa bosan. Anda dapat menerapkan efek ini dengan berbagai macam library pihak ketiga seperti animejs.com, motion.dev, gsap.com, atau lainnya.

Kriteria Opsional 4: Menerapkan Prettier sebagai Code Formatter
Anda disarankan untuk mengimplementasikan code formatter untuk merapikan karya tulisan kode Anda. Salah satu code formatter yang terkenal adalah Prettier. Cara pemasangan dan penggunaannya sangat mudah. Anda bisa menemukan panduannya di Prettier Install. Berikut contoh kode yang sudah dirapikan oleh Prettier.
Jika ingin bereksplorasi konfigurasinya, silakan kunjungi Prettier Options. Pastikan prettier terdaftar dalam package.json dan Anda memiliki berkas konfigurasinya yang bernama .prettierrc sebagai bukti Anda mengerjakan kriteria ini.

Submission Anda akan dinilai oleh reviewer dengan penilaian bintang berskala 1-5. Penilaian ini akan diukur berdasarkan parameter yang akan kita jelaskan. Anda dapat menerapkan beberapa saran untuk mendapatkan nilai tinggi. Berikut daftarnya.

Menerapkan kriteria opsional pertama: Memiliki Fitur Arsip Catatan.
Menerapkan kriteria opsional kedua: Menampilkan Feedback Saat Terjadi Error.
Menerapkan kriteria opsional ketiga: Memiliki Efek Pergerakan Halus atau Animasi.
Menerapkan kriteria opsional keempat: Menerapkan Prettier sebagai Code Formatter.



contoh dengan menggunakan struktur folder yang ada di folder contoh2

jangan dibuat terlihat mewah anggap saja ini buatan amatir