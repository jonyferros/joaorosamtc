// ─────────────────────────────────────────────────────────────────────────────
// All user-facing strings for EN and PT.
// Components import from here — never hardcode EN/PT text in components.
// ─────────────────────────────────────────────────────────────────────────────

export type Language = "en" | "pt";

export const translations = {
  en: {
    // ── Nav ──────────────────────────────────────────────────────────
    nav: {
      logo: "João Rosa",
      logoSub: "MTC",
      about: "About",
      services: "Services",
      locations: "Locations",
      book: "Book",
      contact: "Contact",
    },

    // ── Hero ─────────────────────────────────────────────────────────
    hero: {
      label: "Acupuncture & Traditional Chinese Medicine",
      headline1: "Ancient Medicine.",
      headline2: "Modern Practice.",
      sub: "Treating body and mind through the wisdom of TCM, now in Cork and Quarteira.",
      cta: "Book a Session",
      location: "Cork  ·  Quarteira",
      // Editorial fact strip — right column on desktop
      stats: [
        { label: "Discipline", value: "Acupuncture & TCM" },
        { label: "Locations", value: "Cork  ·  Quarteira" },
        { label: "Consultations", value: "In-person & Online" },
      ],
      // Customer quote — displayed below the stats strip
      quote: {
        text: "After months of chronic pain and poor sleep, João's treatment changed everything. I felt results within the first two sessions.",
        author: "Sarah M.",
        location: "Cork",
      },
    },

    // ── About ────────────────────────────────────────────────────────
    about: {
      label: "About",
      heading1: "A Grounded Approach",
      heading2: "to Ancient Healing",
      body: "João Rosa is a licensed Acupuncturist and Traditional Chinese Medicine practitioner with years of clinical experience treating a wide range of physical and emotional conditions. Trained across Eastern and Western clinical environments, he brings precision, patience, and genuine curiosity to every treatment. His approach is evidence-informed, rooted in classical TCM theory, and always tailored to the individual. João currently practices at The Natural Clinic in Cork, Ireland, and at his new clinic in Quarteira, Portugal.",
    },

    // ── Services / Conditions ────────────────────────────────────────
    services: {
      label: "Conditions Treated",
      heading: "What I Treat",
      intro:
        "TCM addresses the root cause, not just the symptom. These are some of the conditions I treat regularly in clinic.",
      conditions: [
        "Anxiety",
        "Back Pain",
        "Arthritis",
        "Chronic Fatigue",
        "Depression",
        "Fertility",
        "IBS & Bowel Issues",
        "Injury Recovery",
        "Joint Pain",
        "Migraines & Headaches",
        "Mood Swings",
        "Muscular Pain",
        "Neck Pain",
        "Indigestion",
        "Phobias",
        "Social Anxiety",
      ],
    },

    // ── How It Works ─────────────────────────────────────────────────
    howItWorks: {
      label: "The Process",
      heading: "How TCM Works",
      steps: [
        {
          number: "01",
          title: "Initial Consultation",
          body: "A detailed intake of your health history, lifestyle, and goals. No rushing. Every detail matters.",
        },
        {
          number: "02",
          title: "Personalised Treatment",
          body: "Acupuncture and TCM protocols designed specifically for your pattern, not a generic protocol.",
        },
        {
          number: "03",
          title: "Ongoing Follow-up",
          body: "Regular sessions to restore balance, track progress, and support your long-term wellbeing.",
        },
      ],
    },

    // ── Locations ────────────────────────────────────────────────────
    locations: {
      label: "Locations",
      heading1: "Two Clinics,",
      heading2: "One Practice",
      ireland: {
        flag: "🇮🇪",
        clinic: "The Natural Clinic",
        address: "The Old Firehouse, 23 Sullivans Quay, Cork, Ireland",
        website: "thenaturalclinic.ie",
        phone: "+353 85 263 0800",
        note: "Accepting patients in Cork.",
        cta: "Book in Cork →",
        href: "https://thenaturalclinic.ie/appointment/",
      },
      portugal: {
        flag: "🇵🇹",
        clinic: "Clínica AC",
        address: "Rua Infante Santo, Quarteira, Portugal",
        phone: "+351 916 777 777",
        whatsappHref: "https://wa.me/351916777777",
        note: "Now accepting new patients in Portugal.",
        cta: "Book in Portugal →",
        href: "mailto:info@joaorosamtc.com",
      },
    },

    // ── Booking CTA ──────────────────────────────────────────────────
    bookingCta: {
      heading: "Ready to Begin?",
      body: "Book a session in Cork or Portugal. In-person and online consultations available.",
      ctaCork: "Book in Cork",
      ctaPortugal: "Book in Quarteira",
    },

    // ── Contact ──────────────────────────────────────────────────────
    contact: {
      label: "Contact",
      heading: "Get in Touch",
      namePlaceholder: "Name",
      emailPlaceholder: "Email",
      subjectPlaceholder: "Subject",
      subjectOptions: ["General Enquiry", "Appointment", "Other"],
      messagePlaceholder: "Message",
      submit: "Send Message",
      success: "Thank you. I'll be in touch shortly.",
      error:
        "Something went wrong. Please try again or email directly.",
      labelIreland: "Ireland",
      labelPortugal: "Portugal",
      phoneCork: "+353 85 263 0800",
      phoneQuarteira: "+351 916 777 777",
      whatsappHref: "https://wa.me/351916777777",
      email: "info@joaorosamtc.com",
      instagram: "@joaorosamtc",
    },

    // ── Footer ───────────────────────────────────────────────────────
    footer: {
      tagline: "Acupuncture & Traditional Chinese Medicine",
      disclaimer:
        "Acupuncture and TCM are complementary therapies and do not replace conventional medical care. Always consult your GP for medical emergencies.",
      copyright: "© 2025 João Rosa MTC. All rights reserved.",
    },
  },

  pt: {
    // ── Nav ──────────────────────────────────────────────────────────
    nav: {
      logo: "João Rosa",
      logoSub: "MTC",
      about: "Sobre",
      services: "Serviços",
      locations: "Localizações",
      book: "Marcar",
      contact: "Contacto",
    },

    // ── Hero ─────────────────────────────────────────────────────────
    hero: {
      label: "Acupuntura & Medicina Tradicional Chinesa",
      headline1: "Medicina Ancestral.",
      headline2: "Prática Moderna.",
      sub: "Tratamento do corpo e da mente com base na Medicina Tradicional Chinesa, em Cork e em Quarteira.",
      cta: "Marcar Consulta",
      location: "Cork  ·  Quarteira",
      // Editorial fact strip — right column on desktop
      stats: [
        { label: "Disciplina", value: "Acupuntura & MTC" },
        { label: "Localizações", value: "Cork  ·  Quarteira" },
        { label: "Consultas", value: "Presencial & Online" },
      ],
      // Customer quote — displayed below the stats strip
      quote: {
        text: "Após meses de dor crónica e sono perturbado, o tratamento do João mudou tudo. Senti resultados nas primeiras duas sessões.",
        author: "Sara M.",
        location: "Cork",
      },
    },

    // ── About ────────────────────────────────────────────────────────
    about: {
      label: "Sobre",
      heading1: "Uma Abordagem Fundamentada",
      heading2: "à Cura Ancestral",
      body: "João Rosa é acupunctor licenciado e praticante de Medicina Tradicional Chinesa com anos de experiência clínica no tratamento de uma vasta gama de condições físicas e emocionais. Formado em ambientes clínicos orientais e ocidentais, traz precisão, paciência e genuína curiosidade a cada tratamento. A sua abordagem é baseada em provas, enraizada na teoria clássica da MTC e sempre adaptada ao indivíduo. João pratica actualmente na The Natural Clinic em Cork e na Clínica AC em Quarteira.",
    },

    // ── Services / Conditions ────────────────────────────────────────
    services: {
      label: "Condições Tratadas",
      heading: "O Que Trato",
      intro:
        "A MTC trata a causa, não apenas os sintomas. Estas são algumas das condições que trato regularmente em clínica.",
      conditions: [
        "Ansiedade",
        "Dores nas Costas",
        "Artrite",
        "Fadiga Crónica",
        "Depressão",
        "Fertilidade",
        "SII e Problemas Intestinais",
        "Recuperação de Lesões",
        "Dor Articular",
        "Enxaquecas e Cefaleias",
        "Alterações de Humor",
        "Dor Muscular",
        "Dor Cervical",
        "Indigestão",
        "Fobias",
        "Ansiedade Social",
      ],
    },

    // ── How It Works ─────────────────────────────────────────────────
    howItWorks: {
      label: "O Processo",
      heading: "Como Funciona a MTC",
      steps: [
        {
          number: "01",
          title: "Consulta Inicial",
          body: "Uma avaliação detalhada do seu historial de saúde, estilo de vida e objectivos. Sem pressa. Cada detalhe importa.",
        },
        {
          number: "02",
          title: "Tratamento Personalizado",
          body: "Protocolos de acupuntura e MTC desenhados especificamente para o seu padrão, não um protocolo genérico.",
        },
        {
          number: "03",
          title: "Acompanhamento",
          body: "Sessões regulares para restaurar o equilíbrio, acompanhar a evolução e apoiar o seu bem-estar a longo prazo.",
        },
      ],
    },

    // ── Locations ────────────────────────────────────────────────────
    locations: {
      label: "Localizações",
      heading1: "Duas Clínicas,",
      heading2: "Uma Prática",
      ireland: {
        flag: "🇮🇪",
        clinic: "The Natural Clinic",
        address: "The Old Firehouse, 23 Sullivans Quay, Cork, Ireland",
        website: "thenaturalclinic.ie",
        phone: "+353 85 263 0800",
        note: "A aceitar pacientes em Cork.",
        cta: "Marcar em Cork →",
        href: "https://thenaturalclinic.ie/appointment/",
      },
      portugal: {
        flag: "🇵🇹",
        clinic: "Clínica AC",
        address: "Rua Infante Santo, Quarteira, Portugal",
        phone: "+351 916 777 777",
        whatsappHref: "https://wa.me/351916777777",
        note: "A aceitar novos pacientes em Portugal.",
        cta: "Marcar em Portugal →",
        href: "mailto:info@joaorosamtc.com",
      },
    },

    // ── Booking CTA ──────────────────────────────────────────────────
    bookingCta: {
      heading: "Pronto para Começar?",
      body: "Marque uma sessão em Cork ou em Portugal. Consultas presenciais e online disponíveis.",
      ctaCork: "Marcar em Cork",
      ctaPortugal: "Marcar em Quarteira",
    },

    // ── Contact ──────────────────────────────────────────────────────
    contact: {
      label: "Contacto",
      heading: "Entre em Contacto",
      namePlaceholder: "Nome",
      emailPlaceholder: "Email",
      subjectPlaceholder: "Assunto",
      subjectOptions: ["Questão Geral", "Consulta", "Outro"],
      messagePlaceholder: "Mensagem",
      submit: "Enviar Mensagem",
      success: "Obrigado. Entrarei em contacto em breve.",
      error:
        "Algo correu mal. Por favor tente novamente ou envie email diretamente.",
      labelIreland: "Irlanda",
      labelPortugal: "Portugal",
      phoneCork: "+353 85 263 0800",
      phoneQuarteira: "+351 916 777 777",
      whatsappHref: "https://wa.me/351916777777",
      email: "info@joaorosamtc.com",
      instagram: "@joaorosamtc",
    },

    // ── Footer ───────────────────────────────────────────────────────
    footer: {
      tagline: "Acupuntura & Medicina Tradicional Chinesa",
      disclaimer:
        "A acupuntura e a MTC são terapias complementares e não substituem os cuidados médicos convencionais. Em caso de emergência, contacte o seu médico.",
      copyright: "© 2025 João Rosa MTC. Todos os direitos reservados.",
    },
  },
} as const;

export type Translations = typeof translations;
