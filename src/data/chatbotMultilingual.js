// Multi-language UI translations and keyword dictionaries supporting en-GB, en-US, en-IN, es-ES, fr-FR, ar-SA

export const SUPPORTED_LANGUAGES = [
  { id: 'en-GB', name: 'UK English', flag: '🇬🇧', speechLang: 'en-GB', dir: 'ltr' },
  { id: 'en-US', name: 'US English', flag: '🇺🇸', speechLang: 'en-US', dir: 'ltr' },
  { id: 'en-IN', name: 'Indian (English/Hindi)', flag: '🇮🇳', speechLang: 'en-IN', dir: 'ltr' },
  { id: 'es-ES', name: 'Español', flag: '🇪🇸', speechLang: 'es-ES', dir: 'ltr' },
  { id: 'fr-FR', name: 'Français', flag: '🇫🇷', speechLang: 'fr-FR', dir: 'ltr' },
  { id: 'ar-SA', name: 'العربية (Arabic)', flag: '🇸🇦', speechLang: 'ar-SA', dir: 'rtl' }
];

export const UI_TRANSLATIONS = {
  'en-GB': {
    title: 'BeeWise AI Financial Tutor',
    subtitle: 'Multilingual conversational sidekick for campus budgeting',
    inputPlaceholder: 'Ask BeeWise anything in English, Spanish, French, Arabic or Hindi...',
    send: 'Send',
    listening: 'Listening in UK English... Speak now',
    speak: 'Read aloud',
    stopSpeaking: 'Stop voice',
    autoSpeak: 'Auto-voice',
    welcome: "Bzz! Hello there! I'm **BeeWise**, your personal financial tutor. Ask me anything about student savings, the 50/30/20 rule, or avoiding overspending!",
    suggestedHeading: 'Popular Questions:',
    prompts: [
      'What is the 50-30-20 rule?',
      'What is a need vs a want?',
      'How much should a student save?',
      'How do I avoid overspending?',
      'What is an emergency fund?',
      'How to manage my allowance?'
    ],
    micError: 'Microphone not available or permission denied.',
    feedbackHeading: 'Student Feedback & Campus Help',
    feedbackSub: 'Rate your session with BeeWise'
  },
  'en-US': {
    title: 'BeeWise AI Financial Tutor',
    subtitle: 'Multilingual conversational tutor for student budgeting',
    inputPlaceholder: 'Ask BeeWise anything in US English, Spanish, French, Arabic...',
    send: 'Send',
    listening: 'Listening in US English... Speak now',
    speak: 'Read aloud',
    stopSpeaking: 'Stop voice',
    autoSpeak: 'Auto-voice',
    welcome: "Hey there! I'm **BeeWise**, your student personal finance co-pilot. Ask me anything about building savings, dividing your allowance, or stopping impulse buying!",
    suggestedHeading: 'Popular Questions:',
    prompts: [
      'What is the 50-30-20 rule?',
      'What is a need vs a want?',
      'How much should a student save?',
      'How do I avoid overspending?',
      'What is an emergency fund?',
      'How to manage my monthly budget?'
    ],
    micError: 'Microphone not available or permission denied.',
    feedbackHeading: 'Student Feedback & Campus Help',
    feedbackSub: 'Rate your session with BeeWise'
  },
  'en-IN': {
    title: 'BeeWise AI Financial Tutor',
    subtitle: 'Campus budget & pocket money guide (Indian & Global)',
    inputPlaceholder: 'Ask in English or Hindi (50/30/20 niyam, bachat, kharche)...',
    send: 'Bhejo',
    listening: 'Listening in Indian English/Hindi... Speak now',
    speak: 'Sunain (Listen)',
    stopSpeaking: 'Roko (Stop)',
    autoSpeak: 'Auto-Voice',
    welcome: "Namaste! 🙏 I'm **BeeWise**, your campus finance guide. Ask me about pocket money management, the 50/30/20 rule, hostel expenses, or emergency funds!",
    suggestedHeading: 'Poochhe gaye sawaal (Popular Questions):',
    prompts: [
      '50/30/20 rule kya hai?',
      'Needs vs Wants me kya fark hai?',
      'Ek student ko kitna bachana chahiye?',
      'Overspending kaise rokein?',
      'Emergency fund kya hota hai?',
      'Pocket money kaise manage karein?'
    ],
    micError: 'Microphone permission nahi mili ya mic available nahi hai.',
    feedbackHeading: 'Student Feedback & Help',
    feedbackSub: 'BeeWise session ko rate karein'
  },
  'es-ES': {
    title: 'Tutor Financiero BeeWise AI',
    subtitle: 'Asistente conversacional multilingüe para finanzas estudiantiles',
    inputPlaceholder: 'Pregunta a BeeWise en español sobre presupuestos o ahorros...',
    send: 'Enviar',
    listening: 'Escuchando en español... Habla ahora',
    speak: 'Escuchar respuesta',
    stopSpeaking: 'Detener voz',
    autoSpeak: 'Voz automática',
    welcome: "¡Hola! 🐝 Soy **BeeWise**, tu tutor personal de finanzas universitarias. ¡Pregúntame sobre la regla 50/30/20, cómo ahorrar tu mesada o evitar compras impulsivas!",
    suggestedHeading: 'Preguntas Frecuentes:',
    prompts: [
      '¿Qué es la regla 50/30/20?',
      '¿Cuál es la diferencia entre necesidades y deseos?',
      '¿Cuánto debería ahorrar un estudiante?',
      '¿Cómo evitar gastar de más?',
      '¿Qué es un fondo de emergencia?',
      '¿Cómo administrar mi mesada o presupuesto?'
    ],
    micError: 'Micrófono no disponible o permiso denegado.',
    feedbackHeading: 'Comentarios de Estudiantes',
    feedbackSub: 'Califica tu sesión con BeeWise'
  },
  'fr-FR': {
    title: 'Tuteur Financier BeeWise AI',
    subtitle: 'Assistant conversationnel multilingue pour étudiants',
    inputPlaceholder: 'Posez votre question en français à BeeWise...',
    send: 'Envoyer',
    listening: 'À l\'écoute en français... Parlez maintenant',
    speak: 'Écouter la réponse',
    stopSpeaking: 'Arrêter la voix',
    autoSpeak: 'Voix auto',
    welcome: "Bonjour ! 🐝 Je suis **BeeWise**, votre assistant personnel en finances étudiantes. Posez-moi vos questions sur la règle 50/30/20, vos économies ou la gestion de votre budget !",
    suggestedHeading: 'Questions populaires :',
    prompts: [
      'C\'est quoi la règle 50/30/20 ?',
      'Quelle est la différence entre besoins et envies ?',
      'Combien un étudiant doit-il épargner ?',
      'Comment éviter les dépenses excessives ?',
      'Qu\'est-ce qu\'un fonds d\'urgence ?',
      'Comment gérer son argent de poche ?'
    ],
    micError: 'Microphone non disponible ou permission refusée.',
    feedbackHeading: 'Avis des étudiants',
    feedbackSub: 'Évaluez votre session avec BeeWise'
  },
  'ar-SA': {
    title: 'المعلم المالي الذكي BeeWise',
    subtitle: 'المساعد الصوتي والمحادث باللغة العربية لميزانية الطلاب',
    inputPlaceholder: 'اسأل BeeWise بالعربية عن الميزانية وقاعدة 50/30/20...',
    send: 'إرسال',
    listening: 'جاري الاستماع بالعربية... تحدث الآن',
    speak: 'استماع صوتي',
    stopSpeaking: 'إيقاف الصوت',
    autoSpeak: 'نطق تلقائي',
    welcome: "مرحباً بك! 🐝 أنا **BeeWise**، مرشدك المالي الشخصي للطلاب. اسألني عن قاعدة 50/30/20، أو كيفية التوفير وإدارة مصروفك الجامعي بذكاء!",
    suggestedHeading: 'أسئلة شائعة:',
    prompts: [
      'ما هي قاعدة 50/30/20؟',
      'ما الفرق بين الاحتياجات والرغبات؟',
      'كم يجب على الطالب أن يدخر شهرياً؟',
      'كيف أتجنب الإنفاق الزائد؟',
      'ما هو صندوق الطوارئ؟',
      'كيف أنظم مصروفي الشهري؟'
    ],
    micError: 'الميكروفون غير متوفر أو تم رفض الإذن.',
    feedbackHeading: 'آراء وتقييمات الطلاب',
    feedbackSub: 'قيّم تجربتك مع مرشد BeeWise'
  }
};

export const MULTILINGUAL_KNOWLEDGE = {
  'rule_50_30_20': {
    keywords: ['50', '30', '20', 'rule', 'regla', 'règle', 'niyam', 'قاعدة', 'split', 'ratio'],
    'en-GB': {
      title: 'The 50/30/20 Budgeting Rule',
      response:
        'The **50/30/20 Rule** divides your monthly allowance into three smart pots:\n\n• **50% Needs**: Essential living costs (groceries, flat/hall rent, local travel, study mobile data, prescriptions).\n• **30% Wants**: Lifestyle and social life (eating out, gigs, society events, streaming).\n• **20% Savings**: Money saved first for emergencies or post-uni plans.\n\n*Tip: If living costs are high, 60% Needs, 20% Wants, 20% Savings is a brilliant student adaptation.*',
      explanation:
        '🐝 **Let me break down the 50/30/20 rule with practical student figures:**\n\nSuppose you receive **₦50,000** (or £500) for the month:\n\n1. **50% for Needs (₦25,000)**:\n   Pay for essentials first! Food shopping, campus bus fare, hostel amenities, and lecture mobile data.\n\n2. **30% for Wants (₦15,000)**:\n   Your fun money! Going out with flatmates, cinema tickets, snacks, or buying clothes. Enjoy this guilt-free because your essentials are covered.\n\n3. **20% for Savings (₦10,000)**:\n   Pay yourself first! Transfer this immediately into a separate savings pot before spending anything else.'
    },
    'en-US': {
      title: 'The 50/30/20 Budgeting Rule',
      response:
        'The **50/30/20 Rule** divides your monthly student income or allowance into three buckets:\n\n• **50% Needs**: Essential expenses (groceries, dorm/apartment rent, commute, text materials, medicines).\n• **30% Wants**: Fun and lifestyle (dining out, streaming subscriptions, weekend trips, concert tickets).\n• **20% Savings**: Emergency funds and future student loan buffers.\n\n*Tip: On a tight college budget, 60% Needs, 20% Wants, 20% Savings works wonderfully.*',
      explanation:
        '🐝 **Here is the 50/30/20 breakdown with a real college example:**\n\nSay you have **₦50,000** (or $500) for the month:\n\n1. **$250 / ₦25,000 (50%) for Needs**:\n   Dorm utilities, grocery staples, campus transport pass, course supplies.\n\n2. **$150 / ₦15,000 (30%) for Wants**:\n   Coffee runs, hanging out with friends, streaming, new gear.\n\n3. **$100 / ₦10,000 (20%) for Savings**:\n   Put this straight into a high-yield savings account or emergency stash on Day 1!'
    },
    'en-IN': {
      title: '50/30/20 Budgeting Rule (Hinglish/Indian)',
      response:
        '**50/30/20 Niyam** aapki monthly pocket money ko 3 aasaan hisson me baant-ta hai:\n\n• **50% Zarooratein (Needs)**: Khana/mess fees, hostel rent, metro/auto travel, recharge, zaroori kitabein.\n• **30% Khwahishein (Wants)**: Canteen snacks, doston ke saath movie, shopping, OTT subscriptions.\n• **20% Bachat (Savings)**: Emergency fund aur future goals ke liye pehle hi alag rakh dein.\n\n*Pro-tip: Agar hostel/mess ka kharcha zyada hai, toh 60% Needs, 20% Wants, 20% Savings apnaayein.*',
      explanation:
        '🐝 **Chaliye 50/30/20 rule ko real college pocket money se samajhte hain:**\n\nMaan lijiye aapko month ka **₹10,000** ya **₦50,000** milta hai:\n\n1. **50% Zarooratein (₹5,000 / ₦25,000)**:\n   Mess bill, daily auto/bus fare, mobile data pack, aur stationary. Iske bina padhai aur din-charya ruk sakti hai.\n\n2. **30% Mauj-masti (₹3,000 / ₦15,000)**:\n   Chai-samosa with friends, weekend outing, ya naye kapde. Isko bina kisi guilt ke spend karein kyunki zarooratein pehle hi poori hain!\n\n3. **20% Bachat (₹2,000 / ₦10,000)**:\n   Jaise hi pocket money aaye, turant ₹2,000 kisi doosre account ya piggy bank me daal dein!'
    },
    'es-ES': {
      title: 'La Regla del 50/30/20',
      response:
        'La **Regla 50/30/20** divide tu dinero mensual en tres categorías claras:\n\n• **50% Necesidades**: Gastos vitales (comida, alquiler/residencia, transporte universitario, libros y datos de estudio).\n• **30% Deseos**: Entretenimiento y estilo de vida (salidas con amigos, ropa, comida rápida, suscripciones).\n• **20% Ahorro**: Fondo para imprevistos o metas futuras.\n\n*Consejo: Si tus gastos fijos son altos, ajusta a 60% Necesidades, 20% Deseos y 20% Ahorro.*',
      explanation:
        '🐝 **Te explico la regla 50/30/20 con un ejemplo práctico de estudiante:**\n\nImagina que recibes **₦50,000** (o $500) para todo el mes:\n\n1. **₦25,000 (50%) para Necesidades**:\n   Comida nutritiva, billetes de autobús, apuntes de clase y medicamentos esenciales.\n\n2. **₦15,000 (30%) para Deseos**:\n   Cine, salidas de fin de semana, café o compras personales. ¡Gasta sin culpa porque lo básico ya está pagado!\n\n3. **₦10,000 (20%) para Ahorro**:\n   ¡Págate a ti mismo primero! Aparta este dinero el primer día en una cuenta separada antes de empezar a gastar.'
    },
    'fr-FR': {
      title: 'La Règle budgétaire 50/30/20',
      response:
        'La **Règle 50/30/20** divise votre budget étudiant mensuel en trois enveloppes précises :\n\n• **50% Besoins essentiels** : Logement étudiant, courses alimentaires, transports, forfait internet et santé.\n• **30% Envies et loisirs** : Sorties entre amis, restaurants, abonnements streaming et shopping plaisir.\n• **20% Épargne** : Fonds de précaution en cas de pépin ou projets personnels.\n\n*Astuce : Pour les petits budgets, la formule 60% Besoins, 20% Envies et 20% Épargne est idéale.*',
      explanation:
        '🐝 **Voici une explication concrète avec des chiffres réels :**\n\nImaginons que vous recevez **₦50,000** (ou 500 €) pour votre mois étudiant :\n\n1. **50% pour vos Besoins (₦25,000 / 250 €)** :\n   Vos repas quotidiens, ticket de métro/bus, photocopies de cours et loyer.\n\n2. **30% pour vos Envies (₦15,000 / 150 €)** :\n   Boire un verre avec des amis, cinéma, streaming ou un vêtement coup de cœur.\n\n3. **20% pour votre Épargne (₦10,000 / 100 €)** :\n   Mettez cette somme de côté dès le 1er jour sur un compte d\'épargne distinct pour vous protéger des imprévus !'
    },
    'ar-SA': {
      title: 'قاعدة 50/30/20 المالية للطلاب',
      response:
        'تقسم **قاعدة 50/30/20** ميزانيتك الشهرية إلى 3 أقسام واضحة ومدروسة:\n\n• **50% للاحتياجات الأساسية**: السكن الجامعي، الطعام الصحي، المواصلات اليومية، والإنترنت للدراسة.\n• **30% للرغبات والترفيه**: الخروج مع الأصدقاء، المقاهي، التسوق، والاشتراكات الترفيهية.\n• **20% للادخار والطوارئ**: ادخار فوري قبل البدء بالصرف لمواجهة أي ظرف طارئ.\n\n*نصيحة: إذا كانت مصاريف دراستك مرتفعة، يمكنك تعديلها إلى 60% احتياجات، 20% رغبات، و20% ادخار.*',
      explanation:
        '🐝 **إليك شرح عملي ومفصل لقاعدة 50/30/20 بمثال جامعي واقعي:**\n\nلنفترض أن مصروفك الشهري هو **50,000 نيرة** (أو ما يعادله بعملتك):\n\n1. **25,000 (50%) للاحتياجات**:\n   أول ما تدفعه! وجبات الطعام، تذاكر الباص اليومية، وملازم المحاضرات.\n\n2. **15,000 (30%) للرغبات**:\n   استمتع بقهوتك، وطلعات نهاية الأسبوع مع زملائك دون أي شعور بالذنب لأن أساسياتك مغطاة بالكامل.\n\n3. **10,000 (20%) للادخار**:\n   ادفع لنفسك أولاً! حوّل هذا المبلغ فوراً إلى حساب ادخار منفصل في أول يوم من الشهر.'
    }
  },

  'needs_vs_wants': {
    keywords: ['need', 'want', 'besoin', 'envie', 'necesidad', 'deseo', 'zaroorat', 'احتياج', 'رغبة'],
    'en-GB': {
      title: 'Needs vs Wants Explained',
      response:
        'A **Need** is vital for health, survival, or completing your university degree (e.g. food staples, transport, course books, prescriptions).\n\nA **Want** adds comfort or entertainment (e.g. restaurant takeaways, designer trainers, extra gaming passes).\n\n*Golden Rule: If delaying it causes physical harm or academic penalty, it is a Need. Otherwise, it is a Want.*',
      explanation:
        '🐝 **Here is an easy test for campus life:**\n\nYou have ₦2,000 in your pocket:\n• **Need**: You need lunch because your stomach is empty before a 3-hour lab session, plus your bus fare home (₦1,200 total).\n• **Want**: Buying an expensive iced caramel coffee and branded crisps (₦1,800) when you already have drinking water in your bag.\n\n💡 *Wait 24 hours on any want: if you still want it tomorrow and your needs are funded, go for it!*'
    },
    'en-US': {
      title: 'Needs vs Wants Explained',
      response:
        'A **Need** is a non-negotiable for living, staying healthy, or staying enrolled in college (groceries, rent, transit, essential medicine).\n\nA **Want** is a lifestyle upgrade (delivery apps, gaming skins, designer sneakers).\n\n*Rule: If skipping it threatens your grades or health, it is a Need.*',
      explanation:
        '🐝 **Campus reality check:**\n\n• **Need**: Textbook access code required for your homework grade.\n• **Want**: Ordering DoorDash late at night instead of heating up pasta in your dorm microwave.\nCover all needs first, put 10-20% in savings, then enjoy your wants with complete peace of mind!'
    },
    'en-IN': {
      title: 'Needs vs Wants (Zaroorat vs Khwahish)',
      response:
        '**Zaroorat (Need)** wo hai jiske bina padhai ya health me nuksaan ho (roti-chawal, hostel fees, bus/metro pass, zaroori davaai).\n\n**Khwahish (Want)** wo hai jo shauk ke liye hai (branded shoes, restaurant me pizza, naya gaming mouse).\n\n*Simple niyam: Agar 2 din na khareedo aur koi problem na ho, toh wo Want hai.*',
      explanation:
        '🐝 **College example se samjhein:**\n\nAapki pocket me ₹500 hain:\n• **Need**: Dopahar ka thali khana aur ghar jaane ka metro ticket (₹150). Yeh zaroorat hai.\n• **Want**: Canteen me cold coffee aur burger par ₹350 udana jabki hostel me lunch already included hai.\nPehle zaroorat poori karein, fir thoda bachayein, bache hue paise shauk par kharch karein!'
    },
    'es-ES': {
      title: 'Necesidades vs Deseos',
      response:
        'Una **Necesidad** es indispensable para tu salud, supervivencia o estudios (comida básica, transporte, libros de texto obligatorios, medicina).\n\nUn **Deseo** mejora tu comodidad o entretenimiento pero puedes vivir sin él (zapatillas de marca, comida rápida, videojuegos).\n\n*Regla de oro: Si posponer la compra daña tu salud o tus notas, es Necesidad.*',
      explanation:
        '🐝 **Un ejemplo universitario muy claro:**\n\nTienes dinero justo en el campus:\n• **Necesidad**: Pagar el menú del día y el billete de metro para volver a casa.\n• **Deseo**: Comprarte un café especial de 5€ y dulces cuando ya tienes agua en la mochila.\n¡Aplica la regla de las 24 horas antes de comprar un deseo!'
    },
    'fr-FR': {
      title: 'Besoins vs Envies',
      response:
        'Un **Besoin** est indispensable pour vivre, être en bonne santé ou réussir ses études (nourriture, loyer, transport, médicaments).\n\nUne **Envie** apporte du plaisir ou du confort mais n\'est pas vitale (vêtements de marque, fast-food, jeux vidéo).\n\n*Règle d\'or : Si reporter l\'achat pénalise vos études ou votre santé, c\'est un Besoin.*',
      explanation:
        '🐝 **Exemple concret sur le campus :**\n\n• **Besoin** : Vos courses alimentaires de la semaine et votre pass de bus pour vous rendre aux partiels.\n• **Envie** : Commander un repas en livraison tard le soir alors que vous avez de quoi cuisiner dans votre studio.\nAssurez toujours vos besoins d\'abord !'
    },
    'ar-SA': {
      title: 'الاحتياجات مقابل الرغبات',
      response:
        '**الاحتياج (Need)** هو شيء ضروري جداً لصحتك، دراستك الجامعية، واستمرارك (الطعام الأساسي، السكن، المواصلات، الأدوية، والكتب الدراسية).\n\n**الرغبة (Want)** هي شيء يمنحك الترفيه والمتعة ولكنه ليس ضرورياً للبقاء (ساعات ذكية، مطاعم باهظة، ملابس ماركات إضافية).\n\n*القاعدة الذهبية: إذا كان تأجيل الشراء يضر بصحتك أو مستواك الدراسي فهو احتياج، عدا ذلك فهو رغبة.*',
      explanation:
        '🐝 **مثال جامعي واقعي:**\n\nمعك مبلغ محدد في جيبك أثناء يومك الجامعي:\n• **احتياج**: وجبة الغداء ومصاريف الرجوع إلى البيت.\n• **رغبة**: شراء قهوة مثلجة باهظة الثمن وحلوى بينما لديك ماء في حقيبتك.\nالقاعدة: غطِّ احتياجاتك أولاً، ثم ادخر القليل، واستمتع بالباقي في رغباتك!'
    }
  },

  'how_much_save': {
    keywords: ['save', 'saving', 'ahorrar', 'épargner', 'bachat', 'كم أدخر', 'ادخار', 'percentage'],
    'en-GB': {
      title: 'How Much Should a Student Save?',
      response:
        'Saving **10% to 20%** of whatever allowance or income you receive is brilliant discipline!\n\nEven saving ₦2,000 or £20 each month trains you to *pay yourself first* and builds a reliable financial buffer.',
      explanation:
        '🐝 **Don\'t wait until you have "lots of money":**\nSaving is about the habit! Save ₦1,000 out of every ₦10,000. Over 8 months of term time, that builds a solid ₦25,000 cushion for unexpected repairs or train fares home.'
    },
    'en-US': {
      title: 'How Much Should a College Student Save?',
      response:
        'Target **10% to 20%** of every paycheck or allowance check.\n\nEven saving $25 or ₦3,000 every month builds real financial muscle and prevents relying on high-interest credit cards.',
      explanation:
        '🐝 **The Pay-Yourself-First Habit:**\nWhenever money hits your account, immediately move 15% to a savings sub-account before buying groceries or paying bills.'
    },
    'en-IN': {
      title: 'Kitna Bachana Chahiye? (How Much to Save)',
      response:
        'Ek student ke liye apni pocket money ka **10% se 20%** bachana best hai!\n\nAgar ₹2,000 milte hain toh ₹200-400 bachayein. Agar ₦20,000 milte hain toh ₦2,000-4,000 alag rakhein.',
      explanation:
        '🐝 **Bachat choti ho ya badi, aadat sabse zaroori hai:**\nHar month sirf ₹500 bachane se saal ke end me ₹6,000 ka emergency fund ban jaata hai, jisse emergency me doston se udhaar lene ki zaroorat nahi padti.'
    },
    'es-ES': {
      title: '¿Cuánto Debería Ahorrar un Estudiante?',
      response:
        'Ahorrar entre el **10% y el 20%** de tu mesada o ingresos como estudiante es una base excelente.\n\nIncluso apartar 15€ o ₦3,000 al mes construye el hábito de pagarte a ti mismo primero.',
      explanation:
        '🐝 **El secreto es la constancia, no el monto:**\nSi ahorras el 10% de cada ingreso, a final de curso tendrás un colchón financiero para viajes, reparaciones o libros.'
    },
    'fr-FR': {
      title: 'Combien Épargner en tant qu\'Étudiant ?',
      response:
        'Mettre de côté **10% à 20%** de votre bourse ou argent de poche est l\'objectif idéal.\n\nMême 20 € ou ₦3,000 par mois crée un vrai réflexe de protection financière.',
      explanation:
        '🐝 **Prenez le réflexe dès maintenant :**\nDès que l\'argent arrive, isolez 10% sur un livret d\'épargne. Au bout d\'une année universitaire, vous aurez une belle réserve sans vous être privé.'
    },
    'ar-SA': {
      title: 'كم يجب أن يدخر الطالب شهرياً؟',
      response:
        'النسبة المثالية للطالب هي ادخار **10% إلى 20%** من أي مصروف أو مكافأة جامعية يتلقاها.\n\nحتى لو كان المبلغ صغيراً، فإنه يبني عادة "ادفع لنفسك أولاً" ويحميك من أي أزمة مالية مفاجئة.',
      explanation:
        '🐝 **العبرة في الاستمرار وليس في كبر المبلغ:**\nإذا قمت بادخار 10% فقط من مصروفك كل شهر، فستجد في نهاية الفصل الدراسي مبلغاً محترماً يسندك عند الحاجة لشراء مراجع أو صيانة هاتفك أو حاسوبك.'
    }
  },

  'overspending': {
    keywords: ['overspend', 'impulse', 'broke', 'gastar', 'dépenses', 'kharcha', 'إسراف', 'تبذير', 'stop spending'],
    'en-GB': {
      title: 'How to Prevent Overspending',
      response:
        'Try these 3 student-tested rules:\n1. **The 24-Hour Rule**: Wait a full day before non-essential purchases.\n2. **Weekly Spending Caps**: Divide your monthly allowance into 4 weekly pots.\n3. **Track with our Planner**: Logging expenses reveals sneaky spending leaks.',
      explanation:
        '🐝 **The Weekly Pot Trick:** If you have ₦40,000 for discretionary spending, don\'t keep it all on your card. Give yourself ₦10,000 each Monday. When it runs out on Thursday, you cook pasta until Monday. You will never be broke in week 4 again!'
    },
    'en-US': {
      title: 'How to Stop Overspending in College',
      response:
        '1. **24-Hour Rule**: Put items in your cart and wait 24 hours before checkout.\n2. **Use Cash Envelopes or Digital Pots**: Break monthly funds into 4 weekly budgets.\n3. **Delete Food Delivery Cards**: Make impulse ordering slightly inconvenient.',
      explanation:
        '🐝 **Watch out for micro-leaks:** Small $4 iced lattes or ₦800 snacks every day equal over ₦24,000 a month! Make coffee in your dorm and watch your balance grow.'
    },
    'en-IN': {
      title: 'Fizool Kharchi Kaise Rokein (Stop Overspending)',
      response:
        '1. **24-Ghante ka Rule**: Kuch bhi shaukiya khareedne se pehle 24 ghante intezaar karein.\n2. **Weekly Budget**: Pure mahine ka paisa ek saath na kharchein; 4 hafton me baant lein.\n3. **BudgetBasics Planner Use Karein**: Daily kharche note karein taaki pata chale paisa kahan ja raha hai.',
      explanation:
        '🐝 **Chote kharche sabse bade chor hote hain:** Roz ka ₹50 ka snack aur ₹100 ka online order mahine ke ant me ₹4,500 ban jata hai! Weekly budget banayein aur pocket money bachaayein.'
    },
    'es-ES': {
      title: 'Cómo Evitar Gastar de Más',
      response:
        '1. **Regla de las 24 horas**: Espera un día entero antes de cualquier compra no esencial.\n2. **Divide en 4 semanas**: Reparte tu presupuesto mensual en 4 semanas independientes.\n3. **Registra tus gastos**: Usa nuestro Planificador de Gastos para ver fugas invisibles de dinero.',
      explanation:
        '🐝 **Cuidado con los micro-gastos:** Esos pequeños snacks diarios o compras impulsivas en apps suman una fortuna al final de mes. ¡Ponles un límite semanal!'
    },
    'fr-FR': {
      title: 'Comment Éviter de Trop Dépenser',
      response:
        '1. **La règle des 24 heures** : Attendez une journée complète avant tout achat impulsif.\n2. **Plafond hebdomadaire** : Divisez votre budget mensuel en 4 enveloppes par semaine.\n3. **Notez vos dépenses** : Utilisez notre Planificateur pour repérer les fuites d\'argent.',
      explanation:
        '🐝 **L\'astuce de la semaine :** Donnez-vous une somme fixe chaque lundi. Si le budget est épuisé le jeudi, cuisinez ce qu\'il reste dans le placard jusqu\'au lundi suivant !'
    },
    'ar-SA': {
      title: 'كيف تتجنب الإنفاق الزائد والتبذير؟',
      response:
        '1. **قاعدة الـ 24 ساعة**: انتظر يوماً كاملاً قبل شراء أي شيء غير ضروري.\n2. **تقسيم الميزانية لـ 4 أسابيع**: لا تترك مصروف الشهر كله في حساب الصرف اليومي.\n3. **تسجيل المصاريف**: استخدم صفحة مخطط المصاريف لاكتشاف أين يضيع مالك.',
      explanation:
        '🐝 **احذر من المصاريف الصغيرة المتكررة:** شراء المشروبات والوجبات الخفيفة اليومية قد يبدو بسيطاً، لكنه يلتهم أكثر من ثلث مصروفك بنهاية الشهر دون أن تدري!'
    }
  },

  'emergency_fund': {
    keywords: ['emergency', 'urgencia', 'urgence', 'fund', 'طوارئ', 'cushion'],
    'en-GB': {
      title: 'What is an Emergency Fund?',
      response:
        'An **Emergency Fund** is money set aside strictly for unplanned, urgent events (medical prescriptions, broken laptop charger before exams, emergency transport).\n\nA mini safety net of **₦10,000 to ₦30,000** keeps you stress-free and debt-free.',
      explanation:
        '🐝 **Think of it like an umbrella:** You don\'t plan for rain, but when a storm hits you are relieved you have it. Having an emergency cushion turns a crisis into a minor inconvenience.'
    },
    'en-US': {
      title: 'What is an Emergency Fund?',
      response:
        'An **Emergency Fund** is your college safety net for unexpected curveballs—urgent dental care, broken phone screen, or emergency trip home.\n\nKeep **$150 to $300 (or ₦15,000 - ₦30,000)** in an accessible savings bucket.',
      explanation:
        '🐝 When an emergency happens, students without a buffer are forced into high-stress debt. A mini emergency fund gives you total peace of mind.'
    },
    'en-IN': {
      title: 'Emergency Fund Kya Hota Hai?',
      response:
        '**Emergency Fund** wo paisa hai jo achanak aane wali zarooraton ke liye alag rakha jata hai (jaise achanak tabiyat kharab hona, phone/laptop kharab hona, ya zaroori project kharcha).\n\nEk student ke liye **₹2,000 se ₹5,000** ka emergency fund kafi rahat deta hai.',
      explanation:
        '🐝 Emergency aane par doston ya rishtedaron ke aage hath phailane se behtar hai ki aapka apna ek chota buffer ho jo aapko azaad rakhe.'
    },
    'es-ES': {
      title: '¿Qué es un Fondo de Emergencia?',
      response:
        'Un **Fondo de Emergencia** es dinero reservado exclusivamente para imprevistos urgentes (urgencias médicas, reparación del ordenador en exámenes, viajes inesperados).\n\nUn mini colchón de **50€ a 150€ (o ₦15,000 - ₦30,000)** te mantiene tranquilo y sin deudas.',
      explanation:
        '🐝 Tener este colchón convierte lo que sería un drama universitario estresante en un simple trámite resuelto.'
    },
    'fr-FR': {
      title: 'Qu\'est-ce qu\'un Fonds d\'Urgence ?',
      response:
        'Un **Fonds d\'Urgence** est une réserve d\'argent réservée uniquement aux imprévus (frais de santé inattendus, chargeur d\'ordinateur en panne avant un examen, etc.).\n\nUne réserve de **100 € à 200 € (ou ₦15,000 - ₦30,000)** vous protège du stress.',
      explanation:
        '🐝 C\'est votre bouclier financier : il vous évite de devoir emprunter de l\'argent en panique à vos proches.'
    },
    'ar-SA': {
      title: 'ما هو صندوق الطوارئ؟',
      response:
        '**صندوق الطوارئ** هو مبلغ مالي يتم حفظه جانباً للحالات الطارئة وغير المتوقعة فقط (مثل علاج مفاجئ، عطل في اللابتوب قبل الامتحانات، أو سفر اضطراري).\n\nمبلغ بسيط مثل **10,000 إلى 30,000 نيرة** يضمن لك راحة البال طوال الفصل الدراسي.',
      explanation:
        '🐝 وجود هذا المبلغ الاحتياطي يجعلك تواجه أي ظرف غير متوقع بهدوء دون الحاجة للاستدانة أو التأثير على دراستك.'
    }
  },

  'spent_all_money': {
    keywords: [
      'spent all',
      'spent my money',
      'spent all my money',
      'all my money',
      'ran out of money',
      'out of money',
      'no money left',
      'have no money',
      'i am broke',
      'im broke',
      "i'm broke",
      'finished my money',
      'lost my money',
      'no cash',
      'sin dinero',
      'gasté todo',
      'gaste todo',
      'plus d\'argent',
      'tout dépensé',
      'tout depense',
      'paise khatam',
      'paise nahi bache',
      'sab kharch ho gaya',
      'خلصت فلوسي',
      'ما عندي فلوس',
      'نفدت نقودي'
    ],
    'en-GB': {
      title: 'I\'ve Spent All My Money: Student Survival Plan',
      response:
        "Bzz! Take a deep breath — this happens to almost every student at least once, and you are not alone! Don't panic.\n\nHere is your **4-Step Campus Survival Plan** to get through safely until your next allowance:\n\n1. **Freeze All Non-Essential Outflows**: Zero takeaway, no drinks, no online carts. Turn off any auto-renewing subscriptions immediately.\n2. **Inventory Your Food & Essentials**: Check your hostel cupboard right now. Do you have rice, noodles, bread, or tea? Coordinate shared meals with trusted roommates to stretch groceries.\n3. **Safeguard Commute & Academic Needs**: If you have any small coins or change, reserve them strictly for campus transport and mandatory project printing.\n4. **Communicate Early & Transparently**: If you are in genuine distress for meals, speak honestly to your parents, campus student union welfare team, or chaplaincy/counselor. **Never turn to predatory quick-loan apps!**\n\n*Would you like me to help you calculate a daily survival limit or suggest safe ways to earn quick campus income?*",
      explanation:
        "🐝 **Here's the mindset shift:** Being broke for a couple of weeks is uncomfortable, but it is also a huge learning milestone. Write down every purchase that led to running out. You'll never let it happen again, and you'll emerge with unbreakable financial resilience."
    },
    'en-US': {
      title: 'I\'ve Spent All My Money: Student Survival Plan',
      response:
        "Hey, take a breath! Running out of cash in college happens to nearly everyone at some point. The key right now is to stop the bleed and stay calm.\n\nHere is your **4-Step College Emergency Roadmap**:\n\n1. **Stop All Discretionary Spending**: Delete UberEats and DoorDash apps for now. No takeout, no convenience store runs.\n2. **Raid Your Dorm Pantry**: Take stock of ramen, pasta, oatmeal, and peanut butter. Team up with friends or hallmates to cook communal meals.\n3. **Protect Transit & Class Essentials**: Keep whatever small dollars or bus pass trips you have strictly for getting to classes and exams.\n4. **Reach Out Without Shame**: If you are facing food insecurity, check out campus food pantries, emergency student support funds, or reach out to your family. **Steer clear of payday loan apps or sketchy cash advances.**\n\n*Want me to help you figure out a survival plan for the rest of the month?*",
      explanation:
        "🐝 **Turning crisis into superpower:** Treat the next 10 days like an academic challenge in extreme resourcefulness. Identify which single expense drained your funds, so we can set a protective barrier for next month!"
    },
    'en-IN': {
      title: 'Paise Khatam Ho Gaye? (Student Survival Guide)',
      response:
        "Fikar mat kijiye! 🐝 Har student ke college life me kam se kam ek baar aisa daur aata hai jab paise poore khatam ho jaate hain. Ghabraane ki zaroorat nahi hai!\n\nYahan aapke liye **4-Step Emergency Survival Plan** hai:\n\n1. **Kharcha Turant Rok Dein**: Canteen, chai-samosa, swiggy/zomato aur shopping par turant 100% pause laga dein.\n2. **Mess aur Ration Check Karein**: Hostel mess ka khana miss mat karein. Agar room par rehte hain toh maggi/chawal/daal jo bhi hai usse doston ke saath milkar banayein.\n3. **Zaroori Travel Bachayein**: Agar thode bahut rupaye bache hain toh unhe metro ya college bus ke liye bacha kar rakhein.\n4. **Sharmayein Mat, Help Lein**: Agar khane ke bhi paise nahi hain toh ghar par sach batayein ya kisi saste/free campus aid/dost se baat karein. **Kisi bhi loan app ya unauthorized app ke chakkar me bilkul na padein!**\n\n*Kya aap chahte hain ki main bache hue dino ka daily budget calculate karne me madad karoon?*",
      explanation:
        "🐝 **Ek zaroori sabak:** Yeh waqt mushkil zaroor lagta hai, par yeh sabse bada financial lesson hota hai. Is mahine ki galti ko note karein, agle mahine '50/30/20 rule' se budget banayenge toh aisi pareshani dobara nahi aayegi!"
    },
    'es-ES': {
      title: 'Me He Quedado Sin Dinero: Plan de Emergencia',
      response:
        "¡Respira hondo! 🐝 Esto le ocurre a casi todos los estudiantes universitarios al menos una vez. No entres en pánico, vamos a solucionarlo paso a paso.\n\nAquí tienes tu **Plan de Supervivencia de 4 Pasos**:\n\n1. **Congela Cualquier Gasto Innecesario**: Nada de cafeterías, salidas, pedidos a domicilio ni compras online hasta que recibas más dinero.\n2. **Revisa Tu Despensa**: Haz inventario de pasta, arroz, legumbres y comida enlatada. Cocina con tus compañeros de piso para ahorrar al máximo.\n3. **Protege el Transporte Universitario**: Si te queda algo de saldo, resérvalo exclusivamente para el billete de metro o autobús para ir a clase.\n4. **Pide Ayuda Si Lo Necesitas**: Si no tienes para comer, acude a los servicios de apoyo al estudiante de tu universidad o habla con tu familia con honestidad. **¡Jamás recurras a microcréditos o apps de préstamos rápidos!**\n\n*¿Quieres que calculemos un presupuesto mínimo diario o busquemos formas de generar ingresos en el campus?*",
      explanation:
        "🐝 **Lección de oro:** Esta situación es temporal. Anota exactamente qué compras provocaron quedarte a cero para que podamos activar la regla de las 24 horas y el fondo de emergencia el próximo mes."
    },
    'fr-FR': {
      title: 'Je N\'ai Plus D\'Argent : Plan de Secours Étudiant',
      response:
        "Respirez un grand coup ! 🐝 Presque tous les étudiants passent par là au moins une fois dans leur cursus. L'important est de ne pas paniquer et de réagir avec méthode.\n\nVoici votre **Plan de Survie Étudiant en 4 Étapes** :\n\n1. **Gel Immédiat des Dépenses Non Essentielles** : Zéro livraison de repas, pas de sorties payantes ni de shopping. Mettez vos abonnements en pause si possible.\n2. **Inventaire du Placard** : Regardez ce qu'il vous reste (pâtes, riz, conserves). Cuisinez en commun avec vos colocataires pour mutualiser les coûts.\n3. **Sécurisez vos Transports** : S'il vous reste quelques pièces, gardez-les strictement pour aller en cours et passer vos examens.\n4. **Parlez-en Sans Honte** : En cas de réelle difficulté pour vous nourrir, adressez-vous au service social de votre université (Crous/associations étudiantes) ou à vos proches. **Fuyez absolument les applications de micro-crédits en ligne !**\n\n*Voulez-vous que nous calculions une limite de survie quotidienne jusqu'au prochain virement ?*",
      explanation:
        "🐝 **Une opportunité d'apprentissage :** Traverser ce moment désagréable va forger votre discipline financière. Le mois prochain, nous mettrons en place un compte d'épargne d'urgence dès le premier jour !"
    },
    'ar-SA': {
      title: 'نفد كل مصروفي الجامعي: خطة الطوارئ للطلاب',
      response:
        "لا تقلق وخذ نفساً عميقاً! 🐝 نفاد المصروف قبل نهاية الشهر موقف يمر به كل طالب جامعي تقريباً. المهم الآن هو التعامل بحكمة وهدوء.\n\nإليك **خطة النجاة الجامعية من 4 خطوات**:\n\n1. **إيقاف فوري لأي مصروف غير ضروري**: أوقف تماماً المقاهي، طلبات التوصيل، والمشتريات الإلكترونية.\n2. **جرد مؤن السكن**: تفقد ما لديك في غرفتك أو سكنك (أرز، معكرونة، تونة، معلبات). شارك الطبخ مع زملائك في السكن لتقليل التكلفة إلى أقصى حد.\n3. **تأمين المواصلات والاختبارات**: إذا كان لديك أي نقود متبقية، احتفظ بها فقط للمواصلات اليومية لحضور المحاضرات وطباعة الأبحاث.\n4. **اطلب المساعدة دون حرج**: إذا كنت في حاجة ماسة لطعام أو دواء، تحدث مع عائلتك بصدق أو راجع صندوق رعاية الطلاب في جامعتك. **إياك والتورط في تطبيقات القروض السريعة أو الاستدانة غير الآمنة!**\n\n*هل تحب أن أساعدك في حساب مصروف يومي دقيق لما تبقى من الشهر؟*",
      explanation:
        "🐝 **العبرة المستفادة:** هذه التجربة رغم صعوبتها تصنع وعيك المالي للمستقبل! سنضع معاً الشهر القادم ميزانية محكمة وقاعدة 'ادفع لنفسك أولاً' حتى لا يتكرر هذا الموقف أبداً."
    }
  },

  'peer_pressure': {
    keywords: [
      'peer pressure',
      'friends want to go out',
      'hang out',
      'cannot afford',
      "can't afford",
      'embarrassed',
      'say no',
      'social pressure',
      'amigos salir',
      'sortir avec amis',
      'dost kharcha',
      'ضغط الأصدقاء',
      'الخروج مع الأصدقاء'
    ],
    'en-GB': {
      title: 'Peer Pressure & Saying No on Campus',
      response:
        "It takes genuine courage to protect your financial goals when friends want to spend big!\n\nHere are 3 ways to handle social campus outings without going broke:\n\n1. **The Confident Declining Script**: *'I’m on a strict savings challenge this month for my semester goals, but I’d love to join next time!'*\n2. **Suggest Free or Low-Cost Alternatives**: Propose a dorm movie night, a walk in the campus park, or cooking dinner together instead of expensive restaurant dining.\n3. **Eat Before You Go**: If you want to accompany friends to a cafe, eat first and just order water or a small tea.",
      explanation:
        "🐝 True friends will always respect someone who is ambitious and disciplined about their future."
    },
    'en-US': {
      title: 'Handling Social Spending & Peer Pressure',
      response:
        "College peer pressure is intense when friends are constantly eating out or taking weekend trips.\n\n• **Own Your Budget**: Say, *'I'm pacing myself to hit my financial goals right now.'*\n• **Host Instead of Dining Out**: Movie nights, study study sessions, and potluck dinners cost 80% less than restaurant bills.\n• **Set a Weekly Social Cap**: Dedicate a specific ₦3,000 or $25 weekly allowance purely for fun. When it's spent, you're done until next week!",
      explanation:
        "🐝 Saying 'no' now means you will have the freedom to say 'yes' to big life opportunities after graduation."
    },
    'en-IN': {
      title: 'Doston Ke Saath Kharcha Kaise Manage Karein?',
      response:
        "College me doston ke beech rehkar mana karna mushkil lagta hai, lekin apni pocket money bachana sabse zaroori hai!\n\n1. **Saaf aur polite bolen**: *'Yaar mera is month ka savings challenge chal raha hai, agle hafte chalte hain!'*\n2. **Saste options suggest karein**: Mehange cafe jaane ke bajay campus canteen ya hostel me chai peete hue baat karein.\n3. **Weekly Hangout Limit**: Har hafte doston par kharch karne ke liye ek fix limit rakhein (jaise ₹200-₹500). Limit khatam hone par politely mana kar dein.",
      explanation:
        "🐝 Sacche dost aapki financial situation ki hamesha respect karenge aur kabhi zabardasti nahi karenge."
    },
    'es-ES': {
      title: 'Cómo Manejar la Presión Social Universitaria',
      response:
        "Tener la valentía de decir 'no' a planes costosos es de las mejores habilidades que desarrollarás.\n\n• **Sé claro y natural**: *'Estoy ahorrando para un objetivo este mes, pero me apunto al próximo plan tranquilo.'*\n• **Propón alternativas baratas**: Noche de juegos en casa, paseo por el campus o cocinar en lugar de salir a cenar fuera.\n• **Límite semanal para ocio**: Asigna una pequeña cantidad fija a tus salidas semanales. Si se agota, descanso hasta la semana siguiente.",
      explanation:
        "🐝 Tus amigos de verdad valorarán tu madurez y enfoque en el futuro."
    },
    'fr-FR': {
      title: 'Gérer la Pression Sociale et les Sorties Entre Amis',
      response:
        "Il est tout à fait normal de vouloir sortir, mais votre sécurité financière passe avant tout.\n\n• **La formule simple et assurée** : *'Je fais attention à mes dépenses ce mois-ci pour mes projets, mais avec plaisir une prochaine fois !'*\n• **Proposez des alternatives gratuites** : Soirée révision/film dans la chambre universitaire, pique-nique ou cuisine partagée.\n• **Plafonnez vos sorties** : Allouez-vous une enveloppe loisirs par semaine. Une fois vide, privilégiez les activités gratuites.",
      explanation:
        "🐝 Les vrais amis respecteront toujours vos choix et votre gestion responsable."
    },
    'ar-SA': {
      title: 'التعامل مع ضغط الأصدقاء والمصاريف الاجتماعية',
      response:
        "يتطلب الأمر شجاعة حقيقية لتقول 'لا' عندما يطلب منك الأصدقاء الخروج لأماكن مكلفة وأنت لا تملك الميزانية الكافية!\n\n1. **اعتذر بلباقة وثقة**: *'أنا ملتزم بهدف مالي هذا الشهر، لكن يسعدني جداً أن نجتمع في نشاط آخر!'*\n2. **اقترح بدائل غير مكلفة**: الجلوس في حديقة الجامعة، المذاكرة المشتركة، أو إعداد القهوة في السكن بدلاً من المقاهي باهظة الثمن.\n3. **حدد ميزانية أسبوعية للمناسبات**: خصص مبلغاً صغيراً ثابتاً للترفيه أسبوعياً. إذا نفد، توقف حتى الأسبوع التالي.",
      explanation:
        "🐝 الأصدقاء الحقيقيون سيحترمون انضباطك المالي وحرصك على مستقبلك ولن يحرجوك أبداً."
    }
  },

  'money_stress': {
    keywords: [
      'stress',
      'anxious',
      'anxiety',
      'worried',
      'panic',
      'money stress',
      'scared',
      'pareshan',
      'tensión',
      'angoisse',
      'قلق',
      'توتر'
    ],
    'en-GB': {
      title: 'Overcoming Student Money Anxiety',
      response:
        "Financial stress can feel overwhelming, especially during exams. Here is how to regain mental peace and practical control:\n\n1. **Put Numbers on Paper**: Fear grows in uncertainty. Open our **Expense Planner** and list all your fixed costs. Seeing the exact numbers instantly reduces anxiety by half.\n2. **Break Time Down**: Don't worry about the whole year. Just budget for the next 7 days.\n3. **Celebrate Tiny Wins**: Saving even ₦500 or packing a lunch is a victory. Building momentum takes time.",
      explanation:
        "🐝 You don't have to fix everything today. Take one mindful step every morning and let small habits compound."
    },
    'en-US': {
      title: 'How to Beat College Financial Stress',
      response:
        "Feeling anxious about money is extremely common among college students. Here's your reset button:\n\n• **Write Everything Down**: Anxiety lives in vague thoughts. Seeing real numbers gives you power.\n• **Focus on Today's Choices**: You cannot change yesterday's purchases, but you can control what you spend today.\n• **Use Student Resources**: Most campuses have emergency micro-grants, free counseling, and financial literacy workshops.",
      explanation:
        "🐝 A budget is not a punishment — it is permission to spend on what truly matters without feeling guilty!"
    },
    'en-IN': {
      title: 'Paison Ki Chinta Aur Tension Kaise Door Karein?',
      response:
        "Paison ki tension padhai par asar daal sakti hai. Isse nipatne ke liye ye 3 baatein yaad rakhein:\n\n1. **Kharche Diary me Likhein**: Jab tak kharche dimaag me rehte hain, tension zyada lagti hai. Paper par likhte hi sab clear ho jata hai.\n2. **Ek Hafta Focus Karein**: Pure saal ki chinta chhodkar agle 7 din ka plan banayein.\n3. **Khud par Bharosa Rakhein**: Choti-choti bachat se hi confidence banta hai. BudgetBasics ke tools use karein aur tension-free rahein!",
      explanation:
        "🐝 Galti sabse hoti hai. Important ye hai ki aaj se hum apne pocket money ko dhang se plan karein."
    },
    'es-ES': {
      title: 'Cómo Superar el Estrés Financiero Estudiantil',
      response:
        "La preocupación por el dinero no debe quitarte el sueño ni perjudicar tus notas.\n\n• **Pon los números por escrito**: La incertidumbre causa ansiedad. Al escribir tus gastos exactos, recuperas el control.\n• **Planifica día a día**: Enfócate solo en los próximos 7 días, no en todo el semestre.\n• **Aprovecha descuentos de estudiante**: Usa tu carné universitario en transporte, libros y software.",
      explanation:
        "🐝 Un presupuesto no es una jaula: es la herramienta que te da tranquilidad mental para estudiar."
    },
    'fr-FR': {
      title: 'Surmonter le Stress Financier Étudiant',
      response:
        "L'angoisse financière est très fréquente à l'université. Voici comment retrouver la sérénité :\n\n• **Posez tout sur papier** : La peur grandit dans le flou. Dès que vos dépenses sont notées, le stress diminue de moitié.\n• **Procédez par semaine** : Ne cherchez pas à tout résoudre d'un coup. Concentrez-vous sur les 7 prochains jours.\n• **Activez les aides étudiantes** : Bourses d'urgence, réductions étudiantes et repas universitaires à tarif social.",
      explanation:
        "🐝 La clarté apporte la sérénité. Faites un petit pas financier chaque jour !"
    },
    'ar-SA': {
      title: 'كيف تتغلب على القلق والتوتر المالي؟',
      response:
        "القلق المالي قد يؤثر سلباً على تحصيلك الدراسي. إليك خطوات عملية لاستعادة راحة بالك والسيطرة:\n\n1. **اكتب كل أرقامك على الورق**: الخوف يتغذى على الغموض. استخدم صفحة 'مخطط المصاريف' واكتب ما تملكه وما عليك بدقة.\n2. **قسّم وقتك أسبوعاً بأسبوع**: لا تقلق بشأن الفصل الدراسي بأكمله، خطط فقط للأيام السبعة القادمة.\n3. **استفد من امتيازات الطالب**: استخدم بطاقتك الجامعية دائماً للحصول على تخفيضات المواصلات والبرامج والكتب.",
      explanation:
        "🐝 إدارة المال مهارة مكتسبة وليست موهبة فطرية. مع كل يوم تطبق فيه هذه القواعد، ستزداد ثقتك وراحة بالك."
    }
  }
};

export function detectQueryLanguage(query) {
  if (!query) return null;
  const text = query.trim().toLowerCase();

  if (/[\u0600-\u06FF]/.test(text)) {
    return 'ar-SA';
  }

  if (
    /\b(c'est|quoi|règle|besoin|besoins|envie|envies|épargner|dépenses|combien|argent|bonjour|salut|pourquoi|comment|merci)\b/i.test(
      text
    )
  ) {
    return 'fr-FR';
  }

  if (
    /\b(qué|que|regla|necesidad|necesidades|deseo|deseos|ahorrar|gastos|gastar|cuánto|cuanto|hola|por qué|porque|cómo|como|gracias)\b/i.test(
      text
    )
  ) {
    return 'es-ES';
  }

  if (
    /[\u0900-\u097F]/.test(text) ||
    /\b(kya|hai|kaise|kitna|bachat|kharcha|kharch|shauk|namaste|batao|bataiye|dost|paise|rupaye)\b/i.test(
      text
    )
  ) {
    return 'en-IN';
  }

  return null;
}
