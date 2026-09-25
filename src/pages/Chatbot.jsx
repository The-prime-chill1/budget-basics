import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldAlert,
  RotateCcw,
  Send,
  Star,
  Mail,
  Phone,
  Users,
  ShieldCheck,
  CheckCircle2,
  Lightbulb,
  ChevronRight,
  MessageSquare,
  HelpCircle,
  Globe,
  Hash,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { chatbotKnowledge, fallbackChatResponse } from '../data/chatbotResponses';
import {
  SUPPORTED_LANGUAGES,
  UI_TRANSLATIONS,
  MULTILINGUAL_KNOWLEDGE,
  detectQueryLanguage
} from '../data/chatbotMultilingual';
import FormattedChatMessage from '../components/FormattedChatMessage';
import Modal from '../components/Modal';
import './Chatbot.css';

const INITIAL_MESSAGES_MAP = {
  'en-GB': "Bzz! Hello there! I'm **BeeWise**, your personal financial tutor. Ask me anything about student savings, the 50/30/20 rule, or avoiding overspending!",
  'en-US': "Hey there! I'm **BeeWise**, your student personal finance co-pilot. Ask me anything about building savings, dividing your allowance, or stopping impulse buying!",
  'en-IN': "Namaste! 🙏 I'm **BeeWise**, your campus finance guide. Ask me about pocket money management, the 50/30/20 rule, hostel expenses, or emergency funds!",
  'es-ES': "¡Hola! 🐝 Soy **BeeWise**, tu tutor personal de finanzas estudiantiles. ¡Pregúntame sobre la regla 50/30/20, cómo ahorrar tu mesada o evitar compras impulsivas!",
  'fr-FR': "Bonjour ! 🐝 Je suis **BeeWise**, votre assistant personnel en finances étudiantes. Posez-moi vos questions sur la règle 50/30/20, vos économies ou la gestion de votre budget !",
  'ar-SA': "مرحباً بك! 🐝 أنا **BeeWise**، مرشدك المالي الشخصي للطلاب. اسألني عن ميزانيتك، قاعدة 50/30/20، أو كيفية التوفير الذكي!"
};

// Client-side financial assistant: matches keywords against local curated responses with speech synthesis & multilingual support
export default function Chatbot() {
  const [selectedLang, setSelectedLang] = useState('en-GB');
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const recognitionRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'bot',
      text: INITIAL_MESSAGES_MAP['en-GB'],
      time: 'Just now',
      lang: 'en-GB',
      isRtl: false
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastTopicId, setLastTopicId] = useState(null);
  const chatEndRef = useRef(null);

  const [fullName, setFullName] = useState('');
  const [campusEmail, setCampusEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const activeUi = UI_TRANSLATIONS[selectedLang] || UI_TRANSLATIONS['en-GB'];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const cleanTextForSpeech = (raw) => {
    if (!raw) return '';
    return raw
      .replace(/[*#_~`]/g, '')
      .replace(/•/g, '')
      .replace(/[🐝💡🎯⭐✨👋🙏]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handleSpeakText = (msgId, text, langCode) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const clean = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(clean);
    const targetLangObj = SUPPORTED_LANGUAGES.find((l) => l.id === (langCode || selectedLang)) || SUPPORTED_LANGUAGES[0];
    utterance.lang = targetLangObj.speechLang;

    const voices = window.speechSynthesis.getVoices();
    const prefix = targetLangObj.speechLang.split('-')[0];
    const match = voices.find((v) => v.lang === targetLangObj.speechLang || v.lang.startsWith(prefix));
    if (match) {
      utterance.voice = match;
    }

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      const targetLang = SUPPORTED_LANGUAGES.find((l) => l.id === selectedLang)?.speechLang || 'en-GB';
      recognition.lang = targetLang;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setInputText(transcript);
          handleSend(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition warning/error:', e.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, [selectedLang]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(activeUi.micError || 'Microphone not supported on this browser. Try Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
      setIsListening(false);
    } else {
      try {
        window.speechSynthesis?.cancel();
        setSpeakingMsgId(null);
        const targetLang = SUPPORTED_LANGUAGES.find((l) => l.id === selectedLang)?.speechLang || 'en-GB';
        recognitionRef.current.lang = targetLang;
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition start error:', e);
        setIsListening(false);
      }
    }
  };

  const handleChangeLanguage = (newLangId) => {
    setSelectedLang(newLangId);
    window.speechSynthesis?.cancel();
    setSpeakingMsgId(null);

    const greetingText = INITIAL_MESSAGES_MAP[newLangId] || INITIAL_MESSAGES_MAP['en-GB'];
    const newMsg = {
      id: `lang-change-${Date.now()}`,
      sender: 'bot',
      text: greetingText,
      time: 'Just now',
      lang: newLangId,
      isRtl: newLangId === 'ar-SA'
    };
    setMessages((prev) => [...prev, newMsg]);

    if (autoSpeak) {
      setTimeout(() => {
        handleSpeakText(newMsg.id, greetingText, newLangId);
      }, 300);
    }
  };

  const isFollowUpIntent = (norm) => {
    const phrases = [
      'explain',
      'explain further',
      'explain more',
      'explain that',
      'explain it',
      'please explain',
      'what do you mean',
      "i don't understand",
      'i dont understand',
      'i do not understand',
      'dont understand',
      'break it down',
      'simpler',
      'simple terms',
      'in simple terms',
      'simplify',
      'give an example',
      'give me an example',
      'example',
      'examples',
      'elaborate',
      'tell me more',
      'how does that work',
      'confused',
      'clarify',
      'what does that mean',
      'why',
      'how',
      'samjhao',
      'batao',
      'samajh nahi aaya',
      'explica',
      'explicar',
      'no entiendo',
      'dame un ejemplo',
      'explique',
      'expliquer',
      'je ne comprends pas',
      'donne un exemple',
      'اشرح',
      'وضح',
      'لم أفهم',
      'أعطني مثال',
      'ماذا تعني'
    ];
    return phrases.some(
      (phrase) => norm === phrase || norm.startsWith(phrase + ' ') || norm.endsWith(' ' + phrase)
    );
  };

  const isGreetingIntent = (norm) => {
    return [
      'hi',
      'hello',
      'hey',
      'good morning',
      'good afternoon',
      'good evening',
      'sup',
      'yo',
      'namaste',
      'namaskar',
      'hola',
      'bonjour',
      'salut',
      'مرحبا',
      'السلام عليكم',
      'اهلا'
    ].includes(norm);
  };

  const isGratitudeIntent = (norm) => {
    return [
      'thanks',
      'thank you',
      'thank you so much',
      'cool',
      'awesome',
      'great',
      'got it',
      'understood',
      'makes sense',
      'perfect',
      'ok',
      'okay',
      'shukriya',
      'dhanyawad',
      'gracias',
      'muchas gracias',
      'merci',
      'merci beaucoup',
      'شكرا',
      'شكراً'
    ].includes(norm);
  };

  const findAnswer = (query, currentTopicId, activeLang) => {
    const norm = query.toLowerCase().trim().replace(/[?.,!¿¡]/g, '');

    if (isFollowUpIntent(norm)) {
      if (currentTopicId) {
        const multiItem = MULTILINGUAL_KNOWLEDGE[currentTopicId];
        if (multiItem && multiItem[activeLang]?.explanation) {
          return {
            answer: multiItem[activeLang].explanation,
            topicId: currentTopicId,
            isRtl: activeLang === 'ar-SA'
          };
        }
        const fallbackItem = chatbotKnowledge.find((k) => k.id === currentTopicId);
        if (fallbackItem && fallbackItem.explanation) {
          return { answer: fallbackItem.explanation, topicId: currentTopicId, isRtl: false };
        }
      }

      const generalExplains = {
        'en-GB':
          "🐝 **I'd love to explain! Which topic would you like me to break down for you?**\n\nYou can ask:\n• *'Explain the 50/30/20 rule'* (How to split your allowance)\n• *'Explain needs vs wants'* (How to make smart campus choices)\n• *'Explain emergency funds'* (Why every student needs a safety cushion)\n• *'Explain how to avoid overspending'* (Simple rules that keep you afloat)",
        'en-US':
          "🐝 **I'm happy to explain! What topic can I break down for you?**\n\nTry asking:\n• *'Explain the 50/30/20 rule'* (How to allocate your funds)\n• *'Explain needs vs wants'* (Smart college decision making)\n• *'Explain emergency funds'* (Your essential student cushion)\n• *'Explain how to stop overspending'* (Practical tips for your wallet)",
        'en-IN':
          "🐝 **Main zaroor samjhaunga! Aap kaunsa topic detail me jaan-na chahte hain?**\n\nAap pooch sakte hain:\n• *'50/30/20 rule samjhao'* (Pocket money baantne ka tareeqa)\n• *'Needs vs Wants samjhao'* (Zaroorat aur khwahish ka fark)\n• *'Emergency fund samjhao'* (Bachat ka suraksha kavach)\n• *'Fizool kharchi kaise rokein'* (Overspending rokne ke aasaan tips)",
        'es-ES':
          "🐝 **¡Con mucho gusto te lo explico! ¿Qué tema te gustaría que detallemos?**\n\nPuedes preguntarme:\n• *'Explica la regla 50/30/20'* (Cómo dividir tu dinero del mes)\n• *'Explica necesidades vs deseos'* (Decisiones inteligentes en el campus)\n• *'Explica el fondo de emergencia'* (Por qué necesitas un colchón financiero)\n• *'Explica cómo evitar gastar de más'* (Trucos fáciles para no quedarte sin dinero)",
        'fr-FR':
          "🐝 **Avec grand plaisir ! Quel sujet souhaitez-vous que je vous explique en détail ?**\n\nVous pouvez me demander :\n• *'Explique la règle 50/30/20'* (Comment répartir votre budget)\n• *'Explique besoins vs envies'* (Faire les bons choix au quotidien)\n• *'Explique le fonds d'urgence'* (Votre matelas de sécurité indispensable)\n• *'Explique comment ne pas trop dépenser'* (Conseils simples pour étudiants)",
        'ar-SA':
          "🐝 **يسعدني أن أشرح لك بالتفصيل! أي موضوع تود أن أساعدك في فهمه؟**\n\nيمكنك أن تسألني:\n• *'اشرح قاعدة 50/30/20'* (كيف تقسم مصروفك الشهري بذكاء)\n• *'اشرح الاحتياجات مقابل الرغبات'* (كيف تتخذ قرارات مالية صحيحة في الجامعة)\n• *'اشرح صندوق الطوارئ'* (لماذا يحتاج كل طالب إلى رصيد أمان)\n• *'اشرح كيف أتجنب الإسراف'* (خطوات بسيطة للحفاظ على ميزانيتك)"
      };

      return {
        answer: generalExplains[activeLang] || generalExplains['en-GB'],
        topicId: currentTopicId,
        isRtl: activeLang === 'ar-SA'
      };
    }

    if (isGreetingIntent(norm)) {
      return {
        answer: INITIAL_MESSAGES_MAP[activeLang] || INITIAL_MESSAGES_MAP['en-GB'],
        topicId: currentTopicId,
        isRtl: activeLang === 'ar-SA'
      };
    }

    if (isGratitudeIntent(norm)) {
      const gratitudeAnswers = {
        'en-GB':
          "You're very welcome! 🐝 Building mindful money habits as a student is one of the best life superpowers you can gain. Feel free to ask more, or explore our calculators above!",
        'en-US':
          "You're totally welcome! 🐝 Mastering money skills early sets you up for life. Let me know if you want to run through any other college budget questions!",
        'en-IN':
          "Aapka bahut-bahut swagat hai! 🐝 College time me bachat ki aadat daalna life ka sabse bada asset hai. Koi aur sawaal ho toh be-jhijhak poochhein!",
        'es-ES':
          "¡De nada! 🐝 Aprender a manejar tu dinero en la universidad es una superhabilidad para toda la vida. ¡Pregúntame cualquier otra duda cuando quieras!",
        'fr-FR':
          "Je vous en prie ! 🐝 Gérer son budget étudiant avec sérénité est une compétence précieuse pour l'avenir. N'hésitez pas si vous avez d'autres questions !",
        'ar-SA':
          "على الرحب والسعة دائماً! 🐝 بناء عادات مالية ذكية أثناء دراستك الجامعية هو أعظم استثمار لمستقبلك. اسألني في أي وقت عن أي موضوع آخر!"
      };
      return {
        answer: gratitudeAnswers[activeLang] || gratitudeAnswers['en-GB'],
        topicId: currentTopicId,
        isRtl: activeLang === 'ar-SA'
      };
    }

    const isExplainQuery =
      norm.includes('explain') ||
      norm.includes('break down') ||
      norm.includes('example') ||
      norm.includes('samjhao') ||
      norm.includes('explica') ||
      norm.includes('explique') ||
      norm.includes('اشرح');

    for (const [topicKey, item] of Object.entries(MULTILINGUAL_KNOWLEDGE)) {
      if (item.keywords.some((kw) => norm.includes(kw))) {
        const localized = item[activeLang] || item['en-GB'];
        const text = isExplainQuery ? localized.explanation || localized.response : localized.response;
        return {
          answer: text,
          topicId: topicKey,
          isRtl: activeLang === 'ar-SA'
        };
      }
    }

    for (const item of chatbotKnowledge) {
      if (item.keywords.some((kw) => norm.includes(kw))) {
        const text = isExplainQuery ? item.explanation || item.response : item.response;
        return { answer: text, topicId: item.id, isRtl: false };
      }
    }

    const fallbacks = {
      'en-GB': fallbackChatResponse.response,
      'en-US': fallbackChatResponse.response,
      'en-IN':
        "Mujhe is exact phrase par jankari nahi mili, lekin BeeWise ke taur par main in topics me aapki madad kar sakta hoon:\n\n• **50/30/20 Budgeting Niyam**\n• **Needs vs Wants ka classification**\n• **Fizool kharchi rokne ke tareeqe**\n• **Emergency fund tayar karna**\n• **Pocket money manage karna**\n\nNeeche diye gaye kisi bhi prompt par click karein ya apna sawaal poochhein!",
      'es-ES':
        "No tengo una guía sobre esa frase exacta, pero como tu asistente BeeWise, puedo ayudarte con:\n\n• **La regla 50/30/20**\n• **Clasificación de Necesidades vs Deseos**\n• **Consejos para evitar compras impulsivas**\n• **Cálculo de metas y fondos de emergencia**\n• **Cómo administrar tu mesada estudiantil**\n\n¡Haz clic en una de las preguntas sugeridas o escribe tu duda!",
      'fr-FR':
        "Je n'ai pas de guide spécifique sur cette phrase exacte, mais en tant qu'assistant BeeWise, je peux vous guider sur :\n\n• **La règle 50/30/20**\n• **Distinguer Besoins et Envies**\n• **Astuces contre les achats impulsifs**\n• **Calculer son fonds d'urgence**\n• **Gérer son budget étudiant mensuel**\n\nCliquez sur l'une des suggestions ci-dessous ou posez votre question !",
      'ar-SA':
        "لم أجد دليلاً مطابقاً تماماً لهذه العبارة، ولكن كمرشدك المالي BeeWise، يسعدني مساعدتك في:\n\n• **قاعدة 50/30/20 لتنظيم الميزانية**\n• **التمييز بين الاحتياجات والرغبات**\n• **نصائح لإيقاف الشراء العاطفي والتبذير**\n• **تأسيس صندوق الطوارئ للطلاب**\n• **إدارة المصروف الشهري بذكاء**\n\nجرّب النقر على أحد الأسئلة المقترحة أدناه أو اكتب سؤالك بالعربية!"
    };

    return {
      answer: fallbacks[activeLang] || fallbackChatResponse.response,
      topicId: currentTopicId,
      isRtl: activeLang === 'ar-SA'
    };
  };

  const handleSend = (textToSend) => {
    const q = textToSend || inputText;
    if (!q || !q.trim()) return;

    const detected = detectQueryLanguage(q);
    const activeLang = detected || selectedLang;
    if (detected && detected !== selectedLang) {
      setSelectedLang(detected);
    }

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q.trim(),
      time: 'Just now',
      lang: activeLang,
      isRtl: activeLang === 'ar-SA'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const { answer, topicId, isRtl } = findAnswer(q, lastTopicId, activeLang);
      if (topicId) {
        setLastTopicId(topicId);
      }
      const botMsgId = `b-${Date.now()}`;
      const botMsg = {
        id: botMsgId,
        sender: 'bot',
        text: answer,
        time: 'Just now',
        lang: activeLang,
        isRtl: isRtl || activeLang === 'ar-SA'
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (autoSpeak) {
        setTimeout(() => {
          handleSpeakText(botMsgId, answer, activeLang);
        }, 200);
      }
    }, 500);
  };

  const handleResetChat = () => {
    window.speechSynthesis?.cancel();
    setSpeakingMsgId(null);
    setLastTopicId(null);
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'bot',
        text: INITIAL_MESSAGES_MAP[selectedLang] || INITIAL_MESSAGES_MAP['en-GB'],
        time: 'Just now',
        lang: selectedLang,
        isRtl: selectedLang === 'ar-SA'
      }
    ]);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !campusEmail.trim() || !comments.trim()) return;
    setFeedbackSuccess(true);
  };

  return (
    <div className="beewise-screen animate-fade-in">
      <div className="beewise-notice-banner">
        <ShieldAlert size={16} className="notice-icon" />
        <span className="notice-text">
          <strong>Educational Notice:</strong> BeeWise provides student budgeting awareness in multiple languages. It does not provide certified commercial banking advice.
        </span>
      </div>

      <div className="beewise-desktop-layout">
        <div className="beewise-col-chat">
          <div className="beewise-chat-card bee-card">
            <div className="beewise-card-header">
              <div className="beewise-header-left">
                <div className="beewise-mascot-frame">
                  <img src="/mascot-bee.png" alt="Bee" className="mascot-img" />
                </div>
                <div>
                  <div className="tutor-title-row">
                    <h2 className="beewise-title">{activeUi.title}</h2>
                    <span className="active-tutor-pill">Multilingual</span>
                  </div>
                  <span className="beewise-subtitle">{activeUi.subtitle}</span>
                </div>
              </div>

              <div className="chat-header-actions">
                <button
                  type="button"
                  className={`chat-action-btn auto-voice-btn ${autoSpeak ? 'active' : ''}`}
                  onClick={() => {
                    const next = !autoSpeak;
                    setAutoSpeak(next);
                    if (!next) {
                      window.speechSynthesis?.cancel();
                      setSpeakingMsgId(null);
                    }
                  }}
                  title={autoSpeak ? 'Auto-Voice Speech is ON' : 'Turn on Auto-Voice Speech'}
                >
                  {autoSpeak ? <Volume2 size={15} /> : <VolumeX size={15} />}
                  <span className="btn-label-text">{autoSpeak ? 'Voice: ON' : 'Voice: OFF'}</span>
                </button>

                <button
                  type="button"
                  className="chat-refresh-btn"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>

            <div className="chat-lang-bar" aria-label="Select Chat Language">
              <div className="chat-lang-label">
                <Globe size={14} className="text-gold" />
                <span>Languages:</span>
              </div>
              <div className="chat-lang-pills">
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    className={`chat-lang-pill ${selectedLang === l.id ? 'active' : ''}`}
                    onClick={() => handleChangeLanguage(l.id)}
                    title={l.name}
                  >
                    <span className="lang-flag">{l.flag}</span>
                    <span className="lang-name">{l.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="suggested-chips-scroll">
              {activeUi.prompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="suggest-chip"
                  onClick={() => handleSend(p)}
                >
                  <Lightbulb size={13} className="chip-icon text-gold" />
                  <span>{p}</span>
                </button>
              ))}
            </div>

            <div className="beewise-messages-box">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`message-bubble-row ${m.sender === 'user' ? 'row-user' : 'row-bot'} animate-fade-in`}
                >
                  {m.sender === 'bot' && (
                    <div className="bot-mini-frame">
                      <img src="/mascot-bee.png" alt="Bee" className="mini-bee-avatar" />
                    </div>
                  )}

                  <div className="bubble-payload">
                    <FormattedChatMessage text={m.text} isRtl={m.isRtl} />

                    <div className="bubble-footer-row">
                      <span className="bubble-time">{m.time}</span>

                      {m.sender === 'bot' && (
                        <button
                          type="button"
                          className={`bubble-speak-btn ${speakingMsgId === m.id ? 'speaking' : ''}`}
                          onClick={() => handleSpeakText(m.id, m.text, m.lang)}
                          title={speakingMsgId === m.id ? activeUi.stopSpeaking : activeUi.speak}
                        >
                          {speakingMsgId === m.id ? <VolumeX size={13} /> : <Volume2 size={13} />}
                          <span>{speakingMsgId === m.id ? (activeUi.stopSpeaking || 'Stop') : (activeUi.speak || 'Listen')}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {m.sender === 'user' && (
                    <div className="user-mini-frame">
                      <span>ME</span>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="message-bubble-row row-bot animate-fade-in">
                  <div className="bot-mini-frame">
                    <img src="/mascot-bee.png" alt="Bee" className="mini-bee-avatar" />
                  </div>
                  <div className="bubble-payload typing-payload">
                    <span className="dot-pulse"></span>
                    <span className="dot-pulse"></span>
                    <span className="dot-pulse"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {isListening && (
              <div className="chat-listening-banner animate-fade-in">
                <span className="listening-pulse-dot"></span>
                <span>{activeUi.listening}</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="chat-input-row"
            >
              <button
                type="button"
                className={`chat-mic-btn ${isListening ? 'listening' : ''}`}
                onClick={toggleListening}
                title={isListening ? 'Listening (Click to stop)' : `Voice Input (${activeUi.title})`}
                aria-label="Toggle voice input"
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={activeUi.inputPlaceholder}
                className="bee-input chat-text-input"
                aria-label="Chat input"
                dir={selectedLang === 'ar-SA' ? 'rtl' : 'ltr'}
              />

              <button
                type="submit"
                className="chat-send-btn"
                disabled={!inputText.trim() || isTyping}
                title="Send message"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="beewise-col-side">
          <div className="feedback-hub-card bee-card">
            <div className="hub-head">
              <div>
                <h3 className="hub-title">{activeUi.feedbackHeading}</h3>
                <span className="hub-sub">{activeUi.feedbackSub}</span>
              </div>
              <div className="hub-head-icon text-gold">
                <Star size={20} fill="#f59e0b" />
              </div>
            </div>

            {feedbackSuccess ? (
              <div className="feedback-success-card animate-fade-in">
                <CheckCircle2 size={36} className="text-emerald" />
                <h4 className="success-heading">Feedback Submitted!</h4>
                <p className="success-desc">
                  Thank you, <strong>{fullName}</strong>. Your feedback helps improve BeeWise AI.
                </p>
                <button
                  type="button"
                  className="bee-btn bee-btn-subtle btn-new-feedback"
                  onClick={() => {
                    setFeedbackSuccess(false);
                    setComments('');
                  }}
                >
                  Submit Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="hub-form">
                <div className="hub-field-group">
                  <label htmlFor="feedName" className="hub-label">
                    Full Name
                  </label>
                  <input
                    id="feedName"
                    type="text"
                    required
                    placeholder="e.g. Hamid, Tammy, Lawal"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bee-input hub-input"
                  />
                </div>

                <div className="hub-field-group">
                  <label htmlFor="feedEmail" className="hub-label">
                    Campus Email
                  </label>
                  <input
                    id="feedEmail"
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={campusEmail}
                    onChange={(e) => setCampusEmail(e.target.value)}
                    className="bee-input hub-input"
                  />
                </div>

                <div className="hub-field-group">
                  <label className="hub-label">Session Rating</label>
                  <div className="star-rating-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${rating >= star ? 'star-active' : ''}`}
                        onClick={() => setRating(star)}
                        aria-label={`${star} star rating`}
                      >
                        <Star size={20} fill={rating >= star ? '#f59e0b' : 'none'} />
                      </button>
                    ))}
                    <span className="rating-tag">{rating} of 5</span>
                  </div>
                </div>

                <div className="hub-field-group">
                  <label htmlFor="feedComments" className="hub-label">
                    Comments or Suggestions
                  </label>
                  <textarea
                    id="feedComments"
                    required
                    rows="3"
                    placeholder="How well did BeeWise answer your budgeting questions?"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="bee-textarea hub-textarea"
                  ></textarea>
                </div>

                <button type="submit" className="bee-btn bee-btn-gold hub-submit-btn">
                  <span>Send Peer Evaluation</span>
                  <ChevronRight size={16} />
                </button>
              </form>
            )}

            <div className="campus-helpline-box">
              <span className="helpline-title">Direct Student Lines</span>
              <div className="helpline-links">
                <a href="mailto:support@budgetbasics.edu" className="helpline-link">
                  <Mail size={14} className="text-gold" />
                  <span>support@budgetbasics.edu</span>
                </a>
                <a href="tel:+18005552339" className="helpline-link">
                  <Phone size={14} className="text-emerald" />
                  <span>1-800-555-BEE9 (Toll Free)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
