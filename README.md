# RzkyRsy Portfolio

Portofolio pribadi — HTML, CSS & JavaScript murni (tanpa build step).

## Struktur
- `index.html`, `style.css`, `script.js` — halaman utama
- `theme.js` — tema terang/gelap (tersimpan di browser)
- `library/` — halaman sertifikat & portofolio
  - `data.js` — **satu-satunya file yang diedit** untuk menambah item
  - `sertifikat/` — gambar sertifikat
  - `portofolio/` — screenshot proyek

## Menambah sertifikat
1. Taruh gambar di `library/sertifikat/`.
2. Tambahkan objek baru di `certs` pada `library/data.js` (id, title, issuer, date `YYYY-MM-DD`, category, img).
3. Isi `url` bila ada link verifikasi — tombol "Verifikasi sertifikat" muncul otomatis.

## Menambah proyek
1. Taruh screenshot di `library/portofolio/`.
2. Tambahkan objek baru di `projects` pada `library/data.js`.
3. Isi `live` / `source` bila proyek sudah publik.

Jumlah di beranda dan di Library ikut berubah otomatis.
