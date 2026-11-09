import profileData from "@/data/profile-data.json";

/**
 * Local RAG (Retrieval-Augmented Generation) Engine
 * Directly retrieves and synthesizes answers from profile-data.json in <5ms
 * so recruiter questions about Ramdani's CV and projects respond instantaneously.
 */
export function retrieveFromCV(rawQuery: string): string | null {
  const q = rawQuery.toLowerCase().trim();
  const isIndonesian =
    /\b(apa|siapa|dimana|kapan|kenapa|mengapa|bagaimana|ceritakan|tentang|pengalaman|kerja|proyek|kontak|kuliah|pendidikan|bisa|kelebihan|tahun|tolong|jelaskan)\b/.test(
      q
    );

  const {
    personal,
    summary,
    coreSkills,
    experience,
    education,
    courses,
  } = profileData;

  // 1. Greeting / Name / Who are you / Intro / Summary
  if (
    /^(hi|hello|halo|hai|hey|pagi|siang|sore|malam|assalamualaikum|test|tes|ping|p)\b/.test(
      q
    ) ||
    /\b(what is your name|what's your name|your name|siapa nama|nama kamu|who are you|who you are|siapa kamu|siapa anda|perkenalkan|kenalan|tentang ramdani|about ramdani|who is ramdani|siapa itu ramdani|siapa muhamad ramdani|summary|ringkasan|profil|profile|introduce|tell me about yourself)\b/.test(
      q
    )
  ) {
    if (isIndonesian) {
      return `Halo! Saya asisten AI representasi dari **${personal.name}** (**${personal.title}**), berdomisili di ${personal.location}.\n\n**Ringkasan Profesional:**\n${summary}\n\n**Status Saat Ini:** ${personal.availability}\n\nSilakan tanyakan seputar project **BRI Enterprise Portal**, **AXA Mandiri**, **SMA PGRI Cibadak**, **PharmaStock**, **pengalaman kerja**, atau **tech stack**!`;
    }
    return `Hello! I am the AI assistant representing **${personal.name}** (**${personal.title}**), based in ${personal.location}.\n\n**Professional Summary:**\n${summary}\n\n**Current Status:** ${personal.availability}\n\nFeel free to ask me about the **BRI Enterprise Portal**, **AXA Mandiri Enterprise Platform**, **SMA PGRI Cibadak School System**, **PharmaStock**, or my **tech stack**!`;
  }

  // 2. Specific Project: BRI Enterprise Portal
  if (/\b(bri|bank rakyat indonesia)\b/.test(q)) {
    if (isIndonesian) {
      return `**BRI Enterprise Portal** — *Building enterprise web portal for Indonesia's largest bank.*\n\n- **Deskripsi:** Mengembangkan dan mengoptimalkan arsitektur frontend untuk portal web enterprise Bank Rakyat Indonesia (BRI). Berfokus pada pembuatan komponen UI yang reusable, integrasi API kompleks, serta memastikan performa tinggi, skalabilitas, dan responsivitas untuk jutaan pengguna.\n- **Peran & Kontribusi:** Berperan sebagai *Core Frontend Developer* yang membangun fondasi utama portal web enterprise BRI. Mengembangkan custom themes, integrasi CMS, struktur template, dan arsitektur HTML/CSS yang kokoh dari nol (*from scratch*).\n- **Tech Stack:** Liferay CMS, Bootstrap, REST APIs, HTML5, CSS3, JavaScript, jQuery, FreeMarker, Velocity\n- **Live URL:** https://bri.co.id/web/guest`;
    }
    return `**BRI Enterprise Portal** — *Building enterprise web portal for Indonesia's largest bank.*\n\n- **Overview:** Developed and optimized the frontend architecture for Bank Rakyat Indonesia's enterprise web portal. Focused on building reusable UI components, integrating complex APIs, and ensuring high performance, scalability, and responsiveness for millions of users.\n- **How Ramdani Contributed:** Served as the **core Frontend Developer** responsible for building the core foundation of the enterprise web portal. Developed custom themes, CMS integrations, template structures, and robust HTML/CSS architectures from scratch to ensure a scalable, high-performing UI.\n- **Tech Stack:** Liferay CMS, Bootstrap, REST APIs, HTML5, CSS3, JavaScript, jQuery, FreeMarker, Velocity\n- **Live URL:** https://bri.co.id/web/guest`;
  }

  // 3. Specific Project: AXA Mandiri Enterprise Platform
  if (/\b(axa|mandiri|dplk|emma)\b/.test(q)) {
    if (isIndonesian) {
      return `**AXA Mandiri Enterprise Platform** — *Building scalable insurance and financial web portals.*\n\n- **Deskripsi:** Berperan sebagai *Core Frontend Developer* yang membangun arsitektur dasar platform enterprise AXA Mandiri. Merancang custom themes, struktur CMS, dan sistem template yang reusable dari nol untuk memastikan performa tinggi, keamanan, dan responsivitas.\n- **Tanggung Jawab Utama:** Merancang template utama frontend, mengimplementasikan custom themes, mengonfigurasi layout CMS, dan memelihara struktur komponen HTML/CSS yang scalable (termasuk DPLK AXA Mandiri, AXA Mandiri Financial Services, dan Emma by AXA).\n- **Peran & Kontribusi:** Membangun fondasi utama portal enterprise dari nol dengan custom themes, integrasi CMS, struktur template, dan arsitektur HTML/CSS yang kokoh.\n- **Tech Stack:** Liferay CMS, HTML5, CSS3, Bootstrap, jQuery, JavaScript, Velocity, FreeMarker, REST APIs\n- **Live URL:** https://www.axa-mandiri.co.id`;
    }
    return `**AXA Mandiri Enterprise Platform** — *Building scalable insurance and financial web portals.*\n\n- **Overview:** Served as the core Frontend Developer responsible for building the foundational architecture of AXA Mandiri's enterprise platform. Engineered custom themes, CMS structures, and reusable template systems from scratch to ensure high performance, security, and responsiveness.\n- **Key Responsibilities:** Architected core frontend templates, implemented custom themes, configured CMS layouts, and maintained clean, scalable HTML/CSS and component structures across DPLK AXA Mandiri, AXA Mandiri Financial Services, and Emma by AXA.\n- **How Ramdani Contributed:** Served as the **core Frontend Developer** responsible for building the core foundation of the enterprise web portal. Developed custom themes, CMS integrations, template structures, and robust HTML/CSS architectures from scratch to ensure a scalable, high-performing UI.\n- **Tech Stack:** Liferay CMS, HTML5, CSS3, Bootstrap, jQuery, JavaScript, Velocity, FreeMarker, REST APIs\n- **Live URL:** https://www.axa-mandiri.co.id`;
  }

  // 4. Specific Project: SMA PGRI Cibadak School Management System
  if (
    /\b(school|sekolah|smapgri|sma pgri|cibadak|ujian|absensi|rapor|lms|cbt|face|facial|nuxt|laravel)\b/.test(
      q
    )
  ) {
    if (isIndonesian) {
      return `**SMA PGRI Cibadak School Management System** — *End-to-end school web portal.*\n\n- **Deskripsi:** Sistem web end-to-end komprehensif untuk SMA PGRI Cibadak guna mendigitalisasi administrasi sekolah dan kegiatan akademik.\n- **Fitur Utama:** Sistem absensi pengenalan wajah (*face detection attendance*), portal siswa & guru, ujian online berbasis komputer (CBT), manajemen rapor digital, PPDB online, dan Learning Management System (LMS).\n- **Peran & Kontribusi:** Merancang dan mengembangkan seluruh arsitektur sistem dari nol sebagai **Lead Full-Stack Developer** (Nuxt.js & Laravel), menangani setup dan deployment server **Linux VPS**, manajemen database MySQL, serta pemeliharaan tahunan (*ongoing annual maintenance*).\n- **Tech Stack:** Nuxt.js, Vue.js, Laravel, MySQL, Linux VPS, REST APIs\n- **Live URL:** https://smapgricibadak.sch.id/`;
    }
    return `**SMA PGRI Cibadak School Management System** — *End-to-end school web portal.*\n\n- **Overview:** Developed a comprehensive end-to-end web system for SMA PGRI Cibadak, designed to digitize school administration and academic activities. Built robust modules including online admissions, facial recognition attendance tracking, digital report cards, online examinations (CBT), and a Learning Management System (LMS) for students and teachers.\n- **Key Features:** Face detection attendance system, student/teacher portals, CBT online exams, digital report card management, and LMS.\n- **How Ramdani Contributed:** Designed and developed the entire system architecture from scratch as the **lead Full-Stack Developer**. Handled both frontend and backend development, deployed and managed the Linux VPS hosting environment, and currently oversee the ongoing annual maintenance and platform reliability.\n- **Key Responsibilities:** Full-stack development (Nuxt.js & Laravel), Linux VPS server setup & deployment, database management, and long-term website maintenance.\n- **Tech Stack:** Nuxt.js, Vue.js, Laravel, MySQL, Linux VPS, REST APIs\n- **Live URL:** https://smapgricibadak.sch.id/`;
  }

  // 5. Specific Project: PharmaStock
  if (
    /\b(pharmastock|pharma stock|inventory|inventori|apotek|obat|nestjs|postgresql|swagger|docker)\b/.test(
      q
    )
  ) {
    if (isIndonesian) {
      return `**PharmaStock** — *Full-stack inventory management web application.*\n\n- **Deskripsi:** Aplikasi web manajemen inventori full-stack yang dibangun menggunakan Next.js, NestJS, dan PostgreSQL. Di-deploy menggunakan Docker di atas Linux VPS dan dilengkapi dokumentasi API interaktif dengan Swagger.\n- **Peran & Kontribusi:** Merancang dan membangun aplikasi secara end-to-end mulai dari frontend Next.js, REST API backend NestJS, desain database PostgreSQL, hingga containerization dengan Docker di Linux VPS.\n- **Tech Stack:** Next.js, React, TypeScript, NestJS, PostgreSQL, Docker, Linux VPS, Swagger\n- **Live Demo:** https://pharmastock.muhramdani.com/\n- **API Docs:** https://pharmastock.muhramdani.com/api/docs/`;
    }
    return `**PharmaStock** — *Full-stack inventory management web application.*\n\n- **Overview:** Inventory web application built using Next.js, NestJS, and PostgreSQL. Deployed with Docker on a Linux VPS, complete with interactive Swagger API documentation.\n- **How Ramdani Contributed:** Architected and developed the full-stack application end-to-end, covering the Next.js frontend, NestJS RESTful backend, PostgreSQL database schema, Swagger documentation, and Docker container deployment on a Linux VPS.\n- **Tech Stack:** Next.js, React, TypeScript, NestJS, PostgreSQL, Docker, Linux VPS, Swagger\n- **Live Demo:** https://pharmastock.muhramdani.com/\n- **Swagger API Docs:** https://pharmastock.muhramdani.com/api/docs/`;
  }

  // 6. Enterprise Projects / All Projects / Portfolio
  if (
    /\b(enterprise|terbesar|biggest|client|klien|emc|sew\+|pln|pdam|rakuten|icon\+|project|proyek|portofolio|portfolio|aplikasi|karya|demo|live)\b/.test(
      q
    )
  ) {
    if (isIndonesian) {
      return `Berikut adalah **Proyek Enterprise & Portofolio Utama** Muhamad Ramdani:\n\n- **BRI Enterprise Portal:** Membangun fondasi frontend portal web Bank Rakyat Indonesia dengan Liferay CMS, Bootstrap, HTML5/CSS3, FreeMarker, Velocity (https://bri.co.id/web/guest)\n- **AXA Mandiri Enterprise Platform:** Membangun arsitektur template & custom theme Liferay CMS untuk portal asuransi dan finansial AXA Mandiri (https://www.axa-mandiri.co.id)\n- **SMA PGRI Cibadak School Management System:** Lead Full-Stack Developer untuk sistem manajemen sekolah end-to-end (absensi face detection, CBT, LMS, e-rapor) menggunakan Nuxt.js, Laravel, MySQL di Linux VPS (https://smapgricibadak.sch.id/)\n- **PharmaStock:** Aplikasi inventori full-stack menggunakan Next.js, NestJS, PostgreSQL, Docker, Swagger (https://pharmastock.muhramdani.com/)\n- **SEW+ (EMC Singapore):** Pengembangan frontend dan deployment JBoss untuk platform energi Singapura (https://sewplus.emcsg.com/)`;
    }
    return `Here are **Muhamad Ramdani's Featured Enterprise & Full-Stack Projects**:\n\n- **BRI Enterprise Portal:** Core Frontend Developer building the enterprise web portal foundation for Indonesia's largest bank using Liferay CMS, Bootstrap, HTML5/CSS3, and REST APIs (https://bri.co.id/web/guest)\n- **AXA Mandiri Enterprise Platform:** Core Frontend Developer engineering custom themes, CMS structures, and reusable template systems for AXA Mandiri (https://www.axa-mandiri.co.id)\n- **SMA PGRI Cibadak School Management System:** Lead Full-Stack Developer for an end-to-end school system (face detection attendance, CBT online exams, digital report cards, LMS) built with Nuxt.js, Laravel, MySQL on Linux VPS (https://smapgricibadak.sch.id/)\n- **PharmaStock:** Full-stack inventory web app built with Next.js, NestJS, PostgreSQL, Docker, and Swagger (https://pharmastock.muhramdani.com/)\n- **SEW+ (EMC Singapore):** Enterprise frontend development and JBoss deployment at Cxrus Solutions (https://sewplus.emcsg.com/)`;
  }

  // 7. Tech Stack / Skills / Keahlian
  if (
    /\b(tech|stack|skill|keahlian|kemampuan|bahasa|framework|teknologi|react|vue|nextjs|next\.js|angular|typescript|javascript|frontend|front-end|backend|back-end|fullstack|full-stack|database|mysql|php|yii2|liferay|tailwind|css|html|tools|bisa apa)\b/.test(
      q
    )
  ) {
    if (isIndonesian) {
      return `Berikut adalah **Tech Stack & Keahlian Utama** Muhamad Ramdani:\n\n- **Frontend:** ${coreSkills.frontend.join(", ")}\n- **Backend & Database:** ${coreSkills.backend.join(", ")}\n- **Delivery, CMS & DevOps:** ${coreSkills.delivery.join(", ")}\n\nRamdani memiliki spesialisasi kuat di **Enterprise Frontend** (React, Next.js, Vue.js, Nuxt.js, TypeScript, Liferay CMS) sekaligus berpengalaman sebagai **Full-Stack Engineer** (NestJS, Laravel, PHP/Yii2, PostgreSQL, MySQL, Docker, Linux VPS).`;
    }
    return `Here is **Muhamad Ramdani's Core Tech Stack**:\n\n- **Frontend:** ${coreSkills.frontend.join(", ")}\n- **Backend & Database:** ${coreSkills.backend.join(", ")}\n- **Delivery, CMS & DevOps:** ${coreSkills.delivery.join(", ")}\n\nHe specialises in enterprise frontend architecture (**React, Next.js, Vue.js, Nuxt.js, TypeScript, Liferay CMS**) while also delivering end-to-end full-stack systems (**NestJS, Laravel, Yii2, PostgreSQL, MySQL, Docker, Linux VPS**).`;
  }

  // 8. Specific Company: Cxrus Solutions / Last experience
  if (/\b(cxrus|terakhir|terbaru|latest|recent work|current|lead|sekarang)\b/.test(q)) {
    const cx = experience[0];
    if (isIndonesian) {
      return `Pengalaman kerja terakhir Ramdani adalah sebagai **${cx.role}** di **${cx.company}** (${cx.period}, ${cx.location}):\n\n- Memimpin pengembangan frontend untuk aplikasi enterprise dan melakukan *code review* anggota tim.\n- Mengembangkan antarmuka web dan integrasi REST API untuk klien sektor jasa keuangan, asuransi, dan energi.\n- Berkontribusi pada platform **SEW+ untuk EMC Singapore** (https://sewplus.emcsg.com/).\n- Menangani proyek **DPLK AXA Mandiri, AXA Mandiri Financial Services, dan Emma by AXA** (https://www.axa-mandiri.co.id).\n\n**Teknologi:** ${cx.technologies.join(", ")}`;
    }
    return `Ramdani's most recent role is **${cx.role}** at **${cx.company}** (${cx.period}, ${cx.location}):\n\n${cx.highlights.map((h) => `- ${h}`).join("\n")}\n\n- **Technologies:** ${cx.technologies.join(", ")}\n- **Client Platforms:** https://sewplus.emcsg.com/ | https://www.axa-mandiri.co.id`;
  }

  // 9. Full Work Experience / Riwayat Kerja / Berapa tahun
  if (
    /\b(pengalaman|experience|riwayat|karir|career|kerja|work history|perusahaan|company|webarq|pragma|perdana|asia|berapa lama|berapa tahun|years of experience)\b/.test(
      q
    )
  ) {
    if (isIndonesian) {
      return `Berikut adalah **Riwayat Pengalaman Kerja Muhamad Ramdani** (Total **12+ Tahun** sejak 2012):\n\n- **Cxrus Solutions** — *Lead Front End Programmer* (Apr 2021 – Okt 2026)\n  Memimpin tim frontend, code review, dan menangani klien EMC Singapore (SEW+) serta AXA Mandiri.\n- **WEBARQ** — *Front End Developer* (Jan 2018 – Mar 2021)\n  Core Frontend Developer untuk website enterprise Bank BRI (https://bri.co.id/web/guest) dengan Liferay CMS, React, Vue.js, dan Gatsby.\n- **PT Asia e-Services** — *Full Stack Engineer* (Nov 2014 – Des 2017)\n  Membangun aplikasi full-stack PHP/Yii2 & MySQL, termasuk SIMPEG PDAM Ciamis dan Custom ERP.\n- **Pragma Informatika** — *Full Stack Engineer* (Mei 2013 – Okt 2014)\n  Membangun aplikasi untuk ICON+ dan PLN (Makassar & Pontianak).\n- **PT Perdana IMMG Indonesia** — *Web Developer* (Mar 2012 – Mar 2013)\n  Membangun halaman web responsif untuk Rakuten Cool Japan Indonesia.`;
    }
    return `**Muhamad Ramdani's Professional Experience (12+ Years since 2012):**\n\n- **Cxrus Solutions** — *Lead Front End Programmer* (Apr 2021 – Oct 2026)\n  Led enterprise frontend teams, code reviews, and projects for EMC Singapore (SEW+) & AXA Mandiri.\n- **WEBARQ** — *Front End Developer* (Jan 2018 – Mar 2021)\n  Core Frontend Developer for enterprise portals including Bank BRI (https://bri.co.id/web/guest) using Liferay CMS, React, Vue.js, Gatsby.\n- **PT Asia e-Services** — *Full Stack Engineer* (Nov 2014 – Dec 2017)\n  Built SIMPEG PDAM Ciamis and custom ERP systems using PHP/Yii2 and MySQL.\n- **Pragma Informatika** — *Full Stack Engineer* (May 2013 – Oct 2014)\n  Built web apps for ICON+ and PLN (Makassar & Pontianak).\n- **PT Perdana IMMG Indonesia** — *Web Developer* (Mar 2012 – Mar 2013)\n  Developed responsive web pages for Rakuten Cool Japan Indonesia.`;
  }

  // 10. Contact / Hire / Availability / Location / Salary
  if (
    /\b(contact|kontak|hubungi|email|wa|whatsapp|phone|telepon|nomor|linkedin|lokasi|location|alamat|domisili|bogor|hire|rekrut|available|ketersediaan|salary|gaji|rate|remote|onsite|wfo|wfh)\b/.test(
      q
    )
  ) {
    if (isIndonesian) {
      return `**Kontak & Ketersediaan Muhamad Ramdani:**\n\n- **Status:** ${personal.availability} (Terbuka untuk Full-time, Contract, Remote/Hybrid/Onsite)\n- **Email:** ${personal.email}\n- **LinkedIn:** ${personal.linkedin}\n- **Website:** ${personal.portfolio}\n- **Domisili:** ${personal.location}`;
    }
    return `**Contact & Availability:**\n\n- **Status:** ${personal.availability} (Open to remote, hybrid, or onsite opportunities)\n- **Email:** ${personal.email}\n- **LinkedIn:** ${personal.linkedin}\n- **Portfolio:** ${personal.portfolio}\n- **Location:** ${personal.location}`;
  }

  // 11. Education & Certifications
  if (
    /\b(education|pendidikan|kuliah|kampus|universitas|terbuka|smk|wikrama|sertifikat|sertifikasi|course|credential|gelar|degree|lulusan)\b/.test(
      q
    )
  ) {
    if (isIndonesian) {
      return `**Pendidikan & Sertifikasi Muhamad Ramdani:**\n\n- **${education[0].institution}:** ${education[0].degree} (${education[0].period})\n- **${education[1].institution}:** ${education[1].degree} (${education[1].period})\n- **Kursus & Kredensial:** ${courses.join(", ")}`;
    }
    return `**Education & Credentials:**\n\n- **${education[0].institution}:** ${education[0].degree} (${education[0].period})\n- **${education[1].institution}:** ${education[1].degree} (${education[1].period})\n- **Courses & Certifications:** ${courses.join(" | ")}`;
  }

  // 12. Why hire / Strengths / Contribution
  if (
    /\b(kenapa harus|why hire|strength|kelebihan|keunggulan|value|nilai tambah|cocok|spesialisasi|contribute|kontribusi)\b/.test(
      q
    )
  ) {
    return `**Why work with Muhamad Ramdani?**\n\n- **12+ Years of Proven Experience:** From Full Stack Engineer to **Lead Front End Programmer** leading enterprise teams.\n- **Enterprise-Grade Architecture:** Core Frontend Developer behind **BRI Enterprise Portal** (https://bri.co.id/web/guest), **AXA Mandiri Enterprise Platform** (https://www.axa-mandiri.co.id), and **EMC Singapore (SEW+)**.\n- **End-to-End Full-Stack Delivery:** Lead Full-Stack Developer for **SMA PGRI Cibadak School Management System** (Nuxt.js, Laravel, face detection attendance, CBT, LMS on Linux VPS) and **PharmaStock** (Next.js, NestJS, PostgreSQL, Docker).\n- **Code Quality & Leadership:** Experienced in team code reviews, reusable component systems, Liferay CMS themes, and Linux VPS deployment.`;
  }

  return null;
}

/**
 * Fallback response when external LLM API is overloaded (503) or unreachable,
 * ensuring the user NEVER sees an error message.
 */
export function buildFallbackRAGResponse(rawQuery: string): string {
  const { personal, summary, coreSkills } = profileData;
  const q = rawQuery.toLowerCase();
  const isIndonesian =
    /\b(apa|siapa|bagaimana|ceritakan|tentang|pengalaman|proyek|kontak)\b/.test(q);

  if (isIndonesian) {
    return `Berdasarkan profil **${personal.name}** (**${personal.title}**):\n\n${summary}\n\n- **Proyek Utama:** BRI Enterprise Portal (https://bri.co.id/web/guest), AXA Mandiri Enterprise Platform (https://www.axa-mandiri.co.id), SMA PGRI Cibadak School System (https://smapgricibadak.sch.id/), dan PharmaStock (https://pharmastock.muhramdani.com/)\n- **Tech Stack Utama:** ${coreSkills.frontend.slice(0, 8).join(", ")}, ${coreSkills.backend.slice(0, 5).join(", ")}\n- **Kontak:** ${personal.email} | ${personal.linkedin}\n\nSilakan tanyakan detail mengenai proyek **BRI**, **AXA Mandiri**, **SMA PGRI Cibadak**, **PharmaStock**, atau **riwayat kerja**!`;
  }

  return `Based on **${personal.name}'s** profile (**${personal.title}**):\n\n${summary}\n\n- **Featured Projects:**\n  - **BRI Enterprise Portal:** https://bri.co.id/web/guest\n  - **AXA Mandiri Enterprise Platform:** https://www.axa-mandiri.co.id\n  - **SMA PGRI Cibadak School System:** https://smapgricibadak.sch.id/\n  - **PharmaStock Inventory App:** https://pharmastock.muhramdani.com/\n- **Core Tech Stack:** ${coreSkills.frontend.slice(0, 8).join(", ")}, ${coreSkills.backend.slice(0, 5).join(", ")}\n- **Contact:** ${personal.email} | ${personal.linkedin}\n\nFeel free to ask specifically about any of the projects above, how Ramdani contributed, or his work experience!`;
}
