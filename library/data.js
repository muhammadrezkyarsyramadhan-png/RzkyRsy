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
      id: 'artkey',
      title: 'ArtKey',
      issuer: 'Landing page jasa desain',
      category: 'UI/UX Design',
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
      category: 'UI/UX Design',
      imgs: ['portofolio/applygo.png'],
      imgLabels: ['Desktop'],
      desc: 'Landing page platform pembuatan resume berbantuan AI. Tampilan clean dan minimalis dengan alur yang jelas: tulis, sesuaikan dengan deskripsi pekerjaan, lalu ekspor.',
      role: 'Merancang struktur halaman dan tampilan visual (hero, section fitur, CTA).',
      tech: ['HTML', 'CSS', 'JavaScript']
    }
  ]
};
