/* =========================================================
   Data Library — edit file ini untuk menambah sertifikat / proyek.
   Gambar sertifikat  -> library/sertifikat/
   Gambar portofolio  -> library/portofolio/
   Urutan: yang terbaru di paling atas.
   ========================================================= */
window.LIBRARY = {
  certs: [
    {
      id: 'ibm-ai-literacy',
      title: 'AI Literacy',
      issuer: 'IBM SkillsBuild',
      date: '2026-07-24',
      credential: 'PLAN-18EB492D5259',
      category: 'AI',
      img: 'sertifikat/ibm-ai-literacy.png',
      desc: 'Credential digital dari IBM SkillsBuild tentang literasi Artificial Intelligence.'
    },
    {
      id: 'ibm-exploring-ai',
      title: 'Exploring Artificial Intelligence',
      issuer: 'IBM SkillsBuild',
      date: '2026-07-23',
      credential: 'ALM-COURSE_3825248',
      category: 'AI',
      img: 'sertifikat/ibm-exploring-ai.png',
      desc: 'Kursus pengenalan Artificial Intelligence dengan durasi belajar 1 jam 30 menit.'
    },
    {
      id: 'revou-intro-software-engineering',
      title: 'Intro to Software Engineering',
      issuer: 'RevoU Coding Camp',
      date: '2025-11-14',
      credential: 'CCSE 101125-01-1-00109',
      category: 'Pemrograman',
      img: 'sertifikat/revou-intro-software-engineering.png',
      desc: 'Sertifikat kehadiran untuk kursus online Software Engineering selama 1 minggu.'
    },
    {
      id: 'dicoding-belajar-dasar-ai',
      title: 'Belajar Dasar AI',
      issuer: 'Dicoding Indonesia',
      date: '2025-09-30',
      credential: 'JLX152D25Z72',
      category: 'AI',
      img: 'sertifikat/dicoding-belajar-dasar-ai.png',
      desc: 'Sertifikat kompetensi kelulusan, berlaku hingga 30 September 2028.',
      url: 'https://www.dicoding.com/certificates/JLX152D25Z72'
    },
    {
      id: 'pertamuda-workshop-series-4',
      title: 'Pertamuda Workshop Series #4',
      issuer: 'Pertamuda Seed and Scale (Pertamina)',
      date: '2025-09-04',
      credential: '',
      category: 'Lainnya',
      img: 'sertifikat/pertamuda-workshop-series-4.png',
      desc: 'Peserta workshop yang diselenggarakan secara daring.'
    },
    {
      id: 'ilo-keselamatan-kesehatan-kerja',
      title: 'Keselamatan dan Kesehatan Kerja',
      issuer: 'International Labour Organization',
      date: '2025-08-24',
      credential: '',
      category: 'Lainnya',
      img: 'sertifikat/ilo-keselamatan-kesehatan-kerja.png',
      desc: 'Sertifikat penyelesaian e-learning Keselamatan dan Kesehatan Kerja (K3).'
    }
  ],

  projects: [
    {
      id: 'patungan',
      title: 'Patungan',
      issuer: 'Aplikasi patungan dan split bill',
      category: 'Web Application',
      imgs: ['portofolio/Screenshot 2026-11-26 075904.png'],
      imgLabels: ['Desktop'],
      desc: 'Aplikasi untuk membuat grup patungan dan mengelola aktivitas split bill serta belanja bersama.',
      role: 'Merancang antarmuka dan alur utama aplikasi patungan.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 'ai-study-vault',
      title: 'AI Study Vault',
      issuer: 'Dashboard belajar dan flashcard',
      category: 'Web Application',
      imgs: ['portofolio/Screenshot 2026-11-26 075550.png'],
      imgLabels: ['Desktop'],
      desc: 'Dashboard belajar untuk mengelola materi, flashcard, dan kuis serta melihat ringkasan progres belajar.',
      role: 'Merancang antarmuka dashboard dan fitur belajar.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 'kostmate',
      title: 'KostMate',
      issuer: 'Aplikasi manajemen kos',
      category: 'Web Application',
      imgs: ['portofolio/Screenshot 2026-11-26 075455.png'],
      imgLabels: ['Desktop'],
      desc: 'Aplikasi untuk membantu pemilik kos mengelola kamar, tagihan, pembayaran, pengumuman, dan laporan perbaikan.',
      role: 'Merancang antarmuka dan alur pengelolaan kos.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 'acakin',
      title: 'Acakin',
      issuer: 'Wheel pengacak nama dan kelompok',
      category: 'Web Application',
      imgs: ['portofolio/Screenshot 2026-11-26 075104.png'],
      imgLabels: ['Desktop'],
      desc: 'Aplikasi interaktif untuk mengacak nama menggunakan wheel atau membagi peserta ke dalam kelompok.',
      role: 'Merancang antarmuka dan interaksi pengacakan.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 'ebooks',
      title: 'Ebooks',
      issuer: 'Katalog dan toko buku digital',
      category: 'Web Application',
      imgs: ['portofolio/Screenshot 2026-11-26 074904.png'],
      imgLabels: ['Desktop'],
      desc: 'Tampilan toko buku digital dengan pencarian dan kategori, paket langganan, serta daftar buku terbaru.',
      role: 'Merancang antarmuka katalog dan toko buku digital.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 'artkey',
      title: 'ArtKey',
      issuer: 'Landing page jasa desain',
      category: 'Web Application',
      imgs: ['portofolio/artkey-desktop.png', 'portofolio/artkey-mobile.png'],
      imgLabels: ['Desktop', 'Mobile'],
      desc: 'Landing page jasa desain digital premium bertema gelap dengan aksen emas. Fokus pada hero section yang kuat, navigasi yang jelas, dan call-to-action yang mudah ditemukan.',
      role: 'Merancang tampilan halaman (hero, navigasi, CTA) serta menyusun struktur HTML dan CSS-nya.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 'applygo',
      title: 'ApplyGo',
      issuer: 'Landing page resume builder',
      category: 'Web Application',
      imgs: ['portofolio/applygo.png'],
      imgLabels: ['Desktop'],
      desc: 'Landing page platform pembuatan resume berbantuan AI. Tampilan clean dan minimalis dengan alur yang jelas: tulis, sesuaikan dengan deskripsi pekerjaan, lalu ekspor.',
      role: 'Merancang struktur halaman dan tampilan visual (hero, section fitur, CTA).',
      tech: ['HTML', 'CSS', 'JavaScript']
    }
  ]
};
