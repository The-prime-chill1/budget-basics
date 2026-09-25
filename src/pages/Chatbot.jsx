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
  ChevronDown,
  MessageSquare,
  HelpCircle,
  Globe,
  Hash,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Headphones
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { chatbotKnowledge, fallbackChatResponse } from '../data/chatbotResponses';
import {
  SUPPORTED_LANGUAGES,
  UI_TRANSLATIONS,
  MULTILINGUAL_KNOWLEDGE,
  detectQueryLanguage
} from '../data/chatbotMultilingual';
import FormattedChatMessage from '../components/FormattedChatMessage';
import './Chatbot.css';

const INITIAL_MESSAGES_MAP = {
  'en-GB': "Hello there! I'm **BeeWise**, your personal financial tutor. Ask me anything about student savings, being broke, the 50/30/20 rule, hostel rent, or avoiding overspending!",
  'en-US': "Hey there! I'm **BeeWise**, your student personal finance co-pilot. Ask me anything about building savings, surviving on a tight budget, or stopping impulse buying!",
  'en-IN': "Namaste! I'm **BeeWise**, your campus finance guide. Ask me about pocket money management, the 50/30/20 rule, hostel expenses, or emergency funds!",
  'es-ES': "¡Hola! Soy **BeeWise**, tu tutor personal de finanzas estudiantiles. ¡Pregúntame sobre la regla 50/30/20, cómo ahorrar tu mesada o evitar compras impulsivas!",
  'fr-FR': "Bonjour ! Je suis **BeeWise**, votre assistant personnel en finances étudiantes. Posez-moi vos questions sur la règle 50/30/20, vos économies ou la gestion de votre budget !",
  'ar-SA': "مرحباً بك! أنا **BeeWise**، مرشدك المالي الشخصي للطلاب. اسألني عن ميزانيتك، قاعدة 50/30/20، أو كيفية التوفير الذكي!"
};

// Client-side financial assistant: matches keywords against local curated responses with speech synthesis & multilingual support
export default function Chatbot() {
  const { currency, format, convertFromNgn } = useCurrency();
  const [selectedLang, setSelectedLang] = useState('en-GB');
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimSpeech, setInterimSpeech] = useState('');
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const recognitionRef = useRef(null);
  const messagesBoxRef = useRef(null);

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

  const [fullName, setFullName] = useState('');
  const [campusEmail, setCampusEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const activeUi = UI_TRANSLATIONS[selectedLang] || UI_TRANSLATIONS['en-GB'];

  // Smooth scroll strictly within the internal messages container to prevent window jumping
  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTo({
        top: messagesBoxRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const cleanTextForSpeech = (raw) => {
    if (!raw) return '';
    return raw
      .replace(/[*#_~`]/g, '')
      .replace(/•/g, '')
      .replace(/\p{Extended_Pictographic}/ug, '')
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

  // Continuous speech recognition with live interim transcription
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      const targetLang = SUPPORTED_LANGUAGES.find((l) => l.id === selectedLang)?.speechLang || 'en-GB';
      recognition.lang = targetLang;

      recognition.onstart = () => {
        setIsListening(true);
        setInterimSpeech('');
      };

      recognition.onresult = (event) => {
        let finalTrans = '';
        let interimTrans = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const trans = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTrans += trans + ' ';
          } else {
            interimTrans += trans;
          }
        }

        if (finalTrans) {
          setInputText((prev) => (prev ? `${prev.trim()} ${finalTrans.trim()}` : finalTrans.trim()));
        }
        setInterimSpeech(interimTrans);
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition warning/error:', e.error);
        if (e.error !== 'no-speech') {
          setIsListening(false);
          setInterimSpeech('');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimSpeech('');
      };

      recognitionRef.current = recognition;
    }

    return () => {
      window.speechSynthesis?.cancel();
      try {
        recognitionRef.current?.abort();
      } catch (err) {}
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
      setInterimSpeech('');
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

  const isOpenExplainIntent = (norm) => {
    const openExplainPhrases = [
      'explain something to me',
      'explain something',
      'explain to me',
      'i need you to explain something to me',
      'i need you to explain something',
      'need you to explain something to me',
      'need you to explain something',
      'need you to explain',
      'can you explain something to me',
      'can you explain something',
      'can you explain to me',
      'could you explain something to me',
      'could you explain something',
      'please explain something to me',
      'please explain something',
      'i want you to explain something to me',
      'i want you to explain something',
      'want you to explain something',
      'explain me something',
      'explain something for me',
      'what can you explain',
      'what do you explain',
      'teach me something',
      'teach me',
      'i have a question',
      'can i ask a question',
      'can i ask you a question',
      'can i ask something',
      'can i ask you something',
      'kuch samjhao',
      'kuch explain karo',
      'explícame algo',
      'explicame algo',
      'puedes explicarme algo',
      'explique-moi quelque chose',
      'tu peux m\'expliquer',
      'اشرح لي شيئا',
      'اشرح لي شيئاً',
      'هل يمكنك أن تشرح لي شيئا'
    ];

    const matchesOpen = openExplainPhrases.some(
      (phrase) =>
        norm === phrase ||
        norm.startsWith(phrase + ' ') ||
        norm.endsWith(' ' + phrase) ||
        norm.includes(phrase)
    );

    if (!matchesOpen) return false;

    // Check if the user specified a known topic alongside
    const specificTopics = [
      '50', '30', '20', 'rent', 'hostel', 'food', 'broke', 'sapa', 'debt',
      'loan', 'fee', 'tuition', 'save', 'saving', 'overspend', 'invest',
      'crypto', 'side hustle', 'afford', 'ticket', 'concert', 'emergency',
      'allowance', 'scholarship', 'black tax', 'family', 'shopping'
    ];
    return !specificTopics.some((t) => norm.includes(t));
  };

  const isFollowUpIntent = (norm) => {
    const phrases = [
      'explain',
      'explain further',
      'explain more',
      'explain that',
      'explain it',
      'explain this',
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

  const isHelpIntent = (norm) => {
    const helpPhrases = [
      'need your help',
      'need you help',
      'need help',
      'i need help',
      'help me',
      'can you help me',
      'can you help',
      'please help me',
      'please help',
      'i need assistance',
      'need assistance',
      'assist me',
      'i have a problem',
      'have a problem',
      'need advice',
      'i need advice',
      'give me advice',
      'what should i do',
      'i am in trouble',
      'help',
      'madad chahiye',
      'ayudame',
      'necesito ayuda',
      'aidez-moi',
      'aidez moi',
      'ساعدني',
      'احتاج مساعدة'
    ];
    return helpPhrases.some(
      (phrase) =>
        norm === phrase ||
        norm.startsWith(phrase + ' ') ||
        norm.endsWith(' ' + phrase) ||
        norm.includes(' ' + phrase + ' ')
    );
  };

  // Dynamic budget parser: computes accurate 50/30/20 breakdown for any mentioned number
  const parseDynamicBudget = (rawText) => {
    const text = rawText.toLowerCase();
    const amountRegex = /(?:₦|\$|£|€|rs\.?|inr|ngn)?\s*(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)\s*(k|thousand|million|m)?\s*(?:naira|dollars?|pounds?|euros?|cedis?|rand|rs|rupees?)?/i;
    const match = text.match(amountRegex);

    if (!match) return null;

    let rawNumStr = match[1].replace(/,/g, '');
    let num = parseFloat(rawNumStr);
    if (isNaN(num)) return null;

    const multiplier = (match[2] || '').toLowerCase();
    if (multiplier === 'k' || multiplier === 'thousand') {
      num *= 1000;
    } else if (multiplier === 'm' || multiplier === 'million') {
      num *= 1000000;
    }

    // Ignore small numbers that are likely not budgets (e.g., "50/30/20", "step 1", "2 months")
    if (num < 100) return null;

    let symbol = '₦';
    if (text.includes('$') || text.includes('dollar')) symbol = '$';
    else if (text.includes('£') || text.includes('pound')) symbol = '£';
    else if (text.includes('€') || text.includes('euro')) symbol = '€';
    else if (text.includes('₹') || text.includes('rupee') || text.includes('rs')) symbol = '₹';

    const needs = Math.round(num * 0.5);
    const wants = Math.round(num * 0.3);
    const savings = Math.round(num * 0.2);
    const weeklyTotal = Math.round(num / 4);
    const weeklyNeeds = Math.round(needs / 4);
    const weeklyWants = Math.round(wants / 4);

    const formattedTotal = `${symbol}${num.toLocaleString()}`;
    const formattedNeeds = `${symbol}${needs.toLocaleString()}`;
    const formattedWants = `${symbol}${wants.toLocaleString()}`;
    const formattedSavings = `${symbol}${savings.toLocaleString()}`;
    const formattedWeeklyTotal = `${symbol}${weeklyTotal.toLocaleString()}`;
    const formattedWeeklyNeeds = `${symbol}${weeklyNeeds.toLocaleString()}`;
    const formattedWeeklyWants = `${symbol}${weeklyWants.toLocaleString()}`;

    return {
      answer: `**Here is your personalized 50/30/20 budget breakdown for ${formattedTotal}:**\n\n• **50% Needs (${formattedNeeds})**: Essential campus survival\n  - Core food staples (rice, pasta, oats, beans, seasonings)\n  - Course study packs, printing, and textbooks\n  - Campus transport fares & essential study data bundles\n\n• **30% Wants (${formattedWants})**: Guilt-free comfort & social\n  - Weekend outings with coursemates\n  - Special snacks, treats, and music/video streaming\n  - Non-essential personal care & shopping\n\n• **20% Savings & Safety Buffer (${formattedSavings})**: Emergency fund\n  - Transfer this **immediately on Day 1** to a separate vault or high-yield account so it stays safe from impulse spending.\n\n**Your 4-Week Cash Flow Guide:**\n• Spend no more than **${formattedWeeklyTotal} per week** (${formattedWeeklyNeeds} for essential Needs + ${formattedWeeklyWants} for Wants).\n• Open our **50/30/20 Calculator** in the top navigation menu to adjust sliders and visualize this interactively!`,
      topicId: 'dynamic_budget'
    };
  };

  // Dynamic savings timeline calculator: parses target amount and monthly savings
  const parseSavingsTimeline = (rawText) => {
    const text = rawText.toLowerCase();
    if (!text.includes('save') && !text.includes('goal') && !text.includes('target') && !text.includes('buy')) return null;

    const numbers = text.match(/\b\d{1,3}(?:,\d{3})*(?:k)?\b/gi);
    if (!numbers || numbers.length < 2) return null;

    const parseNum = (str) => {
      let clean = str.toLowerCase().replace(/,/g, '');
      let mult = 1;
      if (clean.endsWith('k')) {
        mult = 1000;
        clean = clean.replace('k', '');
      }
      return parseFloat(clean) * mult;
    };

    const n1 = parseNum(numbers[0]);
    const n2 = parseNum(numbers[1]);
    if (isNaN(n1) || isNaN(n2) || n1 <= 0 || n2 <= 0) return null;

    const target = Math.max(n1, n2);
    const monthly = Math.min(n1, n2);
    const monthsNeeded = Math.ceil(target / monthly);

    let symbol = '₦';
    if (text.includes('$') || text.includes('dollar')) symbol = '$';
    else if (text.includes('£') || text.includes('pound')) symbol = '£';
    else if (text.includes('€') || text.includes('euro')) symbol = '€';
    else if (text.includes('₹') || text.includes('rupee') || text.includes('rs') || text.includes('inr')) symbol = '₹';

    return {
      answer: `**Savings Timeline Calculation:**\n\n• **Target Goal**: ${symbol}${target.toLocaleString()}\n• **Monthly Contribution**: ${symbol}${monthly.toLocaleString()}\n• **Estimated Timeframe**: **${monthsNeeded} month${monthsNeeded === 1 ? '' : 's'}**\n\n**Accelerate Your Goal:**\n1. Cut one non-essential habit to boost your monthly deposit by 15%.\n2. Put any unexpected gifts or side hustle gigs straight into this target fund.\n3. Track your real-time milestone bar on our **Savings Goals** page!`,
      topicId: 'savings_goals'
    };
  };

  // Dynamic affordability evaluator (e.g., "Can I afford ₹4,760 concert tickets this weekend on my remaining ₹22,400 stipend without wrecking groceries?")
  const parseAffordabilityQuery = (rawText) => {
    const text = rawText.toLowerCase();
    const isAffordIntent =
      text.includes('afford') ||
      text.includes('can i buy') ||
      text.includes('can i spend') ||
      text.includes('can i get') ||
      text.includes('should i buy') ||
      text.includes('concert') ||
      text.includes('ticket');

    if (!isAffordIntent) return null;

    let symbol = currency?.symbol || '₹';
    if (text.includes('₹') || text.includes('rupee') || text.includes('rs') || text.includes('inr')) symbol = '₹';
    else if (text.includes('$') || text.includes('dollar')) symbol = '$';
    else if (text.includes('£') || text.includes('pound')) symbol = '£';
    else if (text.includes('€') || text.includes('euro')) symbol = '€';
    else if (text.includes('₦') || text.includes('naira') || text.includes('ngn')) symbol = '₦';

    const numRegex = /(?:[₹₦$£€]|rs\.?|inr|ngn)?\s*(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)\s*(k|thousand|million)?/gi;
    const nums = [];
    let m;
    while ((m = numRegex.exec(text)) !== null) {
      let raw = m[1].replace(/,/g, '');
      let val = parseFloat(raw);
      if (!isNaN(val) && val > 0) {
        const mult = (m[2] || '').toLowerCase();
        if (mult === 'k' || mult === 'thousand') val *= 1000;
        nums.push(val);
      }
    }

    if (nums.length < 2) return null;

    const cost = Math.min(nums[0], nums[1]);
    const stipend = Math.max(nums[0], nums[1]);

    const wants = Math.round(stipend * 0.3);
    const needs = Math.round(stipend * 0.5);
    const remainingWants = wants - cost;

    let itemLabel = 'Concert Ticket';
    if (text.includes('concert') || text.includes('ticket')) itemLabel = 'Concert Ticket';
    else if (text.includes('shoe') || text.includes('sneaker')) itemLabel = 'Shoes / Fashion';
    else if (text.includes('laptop') || text.includes('phone') || text.includes('headphone')) itemLabel = 'Tech Accessory';
    else if (text.includes('dinner') || text.includes('outing')) itemLabel = 'Weekend Outing';
    else itemLabel = 'Expense Item';

    if (cost <= wants) {
      return {
        answer: `**Good news: Yes, you can do this safely! Here is how:**\n\n• **Current 30% Wants Bucket**: **${symbol}${wants.toLocaleString()} available**\n• **${itemLabel}**: **-${symbol}${cost.toLocaleString()}**\n• **Remaining Fun Cash for next week**: **${symbol}${remainingWants.toLocaleString()}**\n\nYour **${symbol}${needs.toLocaleString()} grocery reserve** stays 100% untouched. Go make memories guilt-free!`,
        topicId: 'affordability_check'
      };
    } else {
      const deficit = cost - wants;
      return {
        answer: `**Caution: This purchase will stretch your 30% Wants limit!**\n\n• **Current 30% Wants Bucket**: **${symbol}${wants.toLocaleString()} available**\n• **${itemLabel}**: **-${symbol}${cost.toLocaleString()}**\n• **Exceeds Wants By**: **-${symbol}${deficit.toLocaleString()}**\n\nYour **${symbol}${needs.toLocaleString()} grocery & essential reserve** would be affected. To protect your campus living buffer, consider saving over 2 weeks or finding a coursemate discount!`,
        topicId: 'affordability_check'
      };
    }
  };

  // Find the most accurate answer using scored relevance matching and dynamic handlers
  const findAnswer = (query, currentTopicId, activeLang) => {
    const norm = query.toLowerCase().trim().replace(/[?.,!¿¡]/g, '');

    // 0. Open-ended "explain something to me" / question triage (user hasn't picked a topic yet)
    if (isOpenExplainIntent(norm)) {
      const generalExplains = {
        'en-GB':
          "**I'd love to explain! Which topic would you like me to break down for you?**\n\nHere are the most popular topics students ask about:\n• **The 50/30/20 Rule** (How to divide your allowance so you never go broke)\n• **Needs vs. Wants** (How to make smart choices without feeling deprived)\n• **Emergency Funds** (Why every student needs a safety cushion)\n• **Surviving When Broke** (Immediate step-by-step triage for zero-cash emergencies)\n• **Stopping Overspending** (Practical rules to keep money in your pocket)\n• **Affordability Check** (Ask me e.g. *'Can I afford ₦5,000 concert tickets on ₦25,000 stipend?'*)\n\nType or speak any topic, and I'll break it down step-by-step!",
        'en-US':
          "**I'm happy to explain! What topic can I break down for you?**\n\nPopular student topics:\n• **The 50/30/20 Rule** (How to allocate your funds)\n• **Needs vs. Wants** (Smart college decision making)\n• **Emergency Funds** (Your essential student cushion)\n• **Surviving When Broke** (Immediate steps when cash is low)\n• **Stopping Overspending** (Practical tips for your wallet)\n• **Affordability Check** (e.g. *'Can I afford $50 concert tickets on $250 stipend?'*)\n\nType or speak any topic, and I'm ready to explain!",
        'en-IN':
          "**Main zaroor samjhaunga! Aap kaunsa topic detail me jaan-na chahte hain?**\n\nAap pooch sakte hain:\n• **50/30/20 Rule** (Pocket money baantne ka tareeqa)\n• **Needs vs Wants** (Zaroorat aur khwahish ka fark)\n• **Emergency Fund** (Bachat ka suraksha kavach)\n• **Surviving When Broke** (Paise khatam hone par kya karein)\n• **Fizool kharchi kaise rokein** (Overspending rokne ke aasaan tips)\n\nNeeche type karein ya bol kar batayein!",
        'es-ES':
          "**¡Con mucho gusto te lo explico! ¿Qué tema te gustaría que detallemos?**\n\nPuedes preguntarme:\n• **La regla 50/30/20** (Cómo dividir tu dinero del mes)\n• **Necesidades vs Deseos** (Decisiones inteligentes en el campus)\n• **Fondo de emergencia** (Por qué necesitas un colchón financiero)\n• **Supervivencia sin dinero** (Qué hacer cuando te quedas a cero)\n• **Cómo evitar gastar de más** (Trucos fáciles para no quedarte sin dinero)\n\n¡Escríbemelo o háblame y te lo explico con gusto!",
        'fr-FR':
          "**Avec grand plaisir ! Quel sujet souhaitez-vous que je vous explique en détail ?**\n\nVous pouvez me demander :\n• **La règle 50/30/20** (Comment répartir votre budget)\n• **Besoins vs Envies** (Faire les bons choix au quotidien)\n• **Le fonds d'urgence** (Votre matelas de sécurité indispensable)\n• **Gérer quand on est à sec** (Les réflexes essentiels)\n• **Comment ne pas trop dépenser** (Conseils simples pour étudiants)\n\nPosez votre question et je vous explique tout en détail !",
        'ar-SA':
          "**يسعدني أن أشرح لك بالتفصيل! أي موضوع تود أن أساعدك في فهمه؟**\n\nيمكنك أن تسألني:\n• **قاعدة 50/30/20** (كيف تقسم مصروفك الشهري بذكاء)\n• **الاحتياجات مقابل الرغبات** (كيف تتخذ قرارات مالية صحيحة)\n• **صندوق الطوارئ** (لماذا يحتاج كل طالب إلى رصيد أمان)\n• **التصرف عند نفاد النقود** (خطوات عملية لحماية ميزانيتك)\n• **كيف تتجنب الإسراف** (خطوات بسيطة للحفاظ على أموالك)\n\nاكتب الموضوع وسأشرحه لك فوراً وبكل بساطة!"
      };

      return {
        answer: generalExplains[activeLang] || generalExplains['en-GB'],
        topicId: null,
        isRtl: activeLang === 'ar-SA'
      };
    }

    // 1. Follow-up intents ("explain", "break it down")
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
          "**I'd love to explain! Which topic would you like me to break down for you?**\n\nYou can ask:\n• *'Explain the 50/30/20 rule'* (How to split your allowance)\n• *'Explain needs vs wants'* (How to make smart campus choices)\n• *'Explain emergency funds'* (Why every student needs a safety cushion)\n• *'Explain how to avoid overspending'* (Simple rules that keep you afloat)",
        'en-US':
          "**I'm happy to explain! What topic can I break down for you?**\n\nTry asking:\n• *'Explain the 50/30/20 rule'* (How to allocate your funds)\n• *'Explain needs vs wants'* (Smart college decision making)\n• *'Explain emergency funds'* (Your essential student cushion)\n• *'Explain how to stop overspending'* (Practical tips for your wallet)",
        'en-IN':
          "**Main zaroor samjhaunga! Aap kaunsa topic detail me jaan-na chahte hain?**\n\nAap pooch sakte hain:\n• *'50/30/20 rule samjhao'* (Pocket money baantne ka tareeqa)\n• *'Needs vs Wants samjhao'* (Zaroorat aur khwahish ka fark)\n• *'Emergency fund samjhao'* (Bachat ka suraksha kavach)\n• *'Fizool kharchi kaise rokein'* (Overspending rokne ke aasaan tips)",
        'es-ES':
          "**¡Con mucho gusto te lo explico! ¿Qué tema te gustaría que detallemos?**\n\nPuedes preguntarme:\n• *'Explica la regla 50/30/20'* (Cómo dividir tu dinero del mes)\n• *'Explica necesidades vs deseos'* (Decisiones inteligentes en el campus)\n• *'Explica el fondo de emergencia'* (Por qué necesitas un colchón financiero)\n• *'Explica cómo evitar gastar de más'* (Trucos fáciles para no quedarte sin dinero)",
        'fr-FR':
          "**Avec grand plaisir ! Quel sujet souhaitez-vous que je vous explique en détail ?**\n\nVous pouvez me demander :\n• *'Explique la règle 50/30/20'* (Comment répartir votre budget)\n• *'Explique besoins vs envies'* (Faire les bons choix au quotidien)\n• *'Explique le fonds d'urgence'* (Votre matelas de sécurité indispensable)\n• *'Explique comment ne pas trop dépenser'* (Conseils simples pour étudiants)",
        'ar-SA':
          "**يسعدني أن أشرح لك بالتفصيل! أي موضوع تود أن أساعدك في فهمه؟**\n\nيمكنك أن تسألني:\n• *'اشرح قاعدة 50/30/20'* (كيف تقسم مصروفك الشهري بذكاء)\n• *'اشرح الاحتياجات مقابل الرغبات'* (كيف تتخذ قرارات مالية صحيحة في الجامعة)\n• *'اشرح صندوق الطوارئ'* (لماذا يحتاج كل طالب إلى رصيد أمان)\n• *'اشرح كيف أتجنب الإسراف'* (خطوات بسيطة للحفاظ على ميزانيتك)"
      };

      return {
        answer: generalExplains[activeLang] || generalExplains['en-GB'],
        topicId: currentTopicId,
        isRtl: activeLang === 'ar-SA'
      };
    }

    // 2. Greetings
    if (isGreetingIntent(norm)) {
      return {
        answer: INITIAL_MESSAGES_MAP[activeLang] || INITIAL_MESSAGES_MAP['en-GB'],
        topicId: currentTopicId,
        isRtl: activeLang === 'ar-SA'
      };
    }

    // 3. Gratitude
    if (isGratitudeIntent(norm)) {
      const gratitudeAnswers = {
        'en-GB':
          "You're very welcome! Building mindful money habits as a student is one of the best life superpowers you can gain. Feel free to ask more, or explore our calculators above!",
        'en-US':
          "You're totally welcome! Mastering money skills early sets you up for life. Let me know if you want to run through any other college budget questions!",
        'en-IN':
          "Aapka bahut-bahut swagat hai! College time me bachat ki aadat daalna life ka sabse bada asset hai. Koi aur sawaal ho toh be-jhijhak poochhein!",
        'es-ES':
          "¡De nada! Aprender a manejar tu dinero en la universidad es una superhabilidad para toda la vida. ¡Pregúntame cualquier otra duda cuando quieras!",
        'fr-FR':
          "Je vous en prie ! Gérer son budget étudiant avec sérénité est une compétence précieuse pour l'avenir. N'hésitez pas si vous avez d'autres questions !",
        'ar-SA':
          "على الرحب والسعة دائماً! بناء عادات مالية ذكية أثناء دراستك الجامعية هو أعظم استثمار لمستقبلك. اسألني في أي وقت عن أي موضوع آخر!"
      };
      return {
        answer: gratitudeAnswers[activeLang] || gratitudeAnswers['en-GB'],
        topicId: currentTopicId,
        isRtl: activeLang === 'ar-SA'
      };
    }

    // 3.5. Direct Help & Assistance Intent (e.g. "i need you help", "can you help me")
    if (isHelpIntent(norm)) {
      // Check if user also specifically mentioned another problem (e.g. debt, rent, broke, fees)
      let specificProblem = null;
      let topProblemScore = 0;
      for (const item of chatbotKnowledge) {
        if (item.id === 'general_financial_problem') continue;
        for (const kw of item.keywords) {
          if (norm.includes(kw) && kw.length >= 4) {
            if (kw.length > topProblemScore) {
              topProblemScore = kw.length;
              specificProblem = item;
            }
          }
        }
      }
      if (specificProblem) {
        return {
          answer: specificProblem.response,
          topicId: specificProblem.id,
          isRtl: false
        };
      }

      const helpResponses = {
        'en-GB':
          "**I'm right here with you! Tell me what's going on.**\n\nAs your student financial advisor, I can guide you through:\n• **Running out of money or being broke** (type *'broke'* or *'food'*)\n• **Managing student debts or loan apps** (type *'debt'*)\n• **Paying hostel rent & accommodation** (type *'rent'*)\n• **Affording school fees or course clearance** (type *'school fees'*)\n• **Budgeting your allowance** (e.g. *'budget ₦50,000'*)\n• **Cutting overspending & impulse buying**\n• **Finding realistic campus side hustles**\n\nWhat is the specific money challenge you're facing right now? Speak or type it below—I am listening!",
        'en-US':
          "**I'm right here with you! Tell me what's going on.**\n\nAs your student financial guide, I can help you with:\n• **Surviving when broke or out of cash**\n• **Dealing with college debt or credit cards**\n• **Dorm & apartment rent payments**\n• **Tuition and textbook costs**\n• **Calculating your monthly budget** (e.g. *'budget $400'*)\n• **Halting impulse purchases**\n\nWhat money dilemma is on your mind? Type or speak—I'm ready to help you work through it!",
        'en-IN':
          "**Main bilkul aapki madad ke liye tayar hoon! Bataiye kya pareshani hai?**\n\nMain in baaton me aapka saath de sakta hoon:\n• **Pocket money khatam ho jana ya bachat na hona**\n• **Hostel rent ya room ke kharche**\n• **Doston ya loan ka udhaar chukana**\n• **50/30/20 niyam se budget banana**\n• **Fizool kharchi rokna**\n\nAapki specific problem kya hai? Neeche likhein ya bol kar batayein!",
        'es-ES':
          "**¡Aquí estoy para ayudarte! Cuéntame qué está pasando.**\n\nPuedo orientarte con:\n• **Quedarte sin dinero a fin de mes**\n• **Pagar el alquiler o la residencia universitaria**\n• **Salir de deudas estudiantiles**\n• **Organizar tu presupuesto con la regla 50/30/20**\n• **Frenar compras impulsivas y gastos hormiga**\n\n¿Cuál es tu duda o dificultad ahora mismo? ¡Escríbela y la resolvemos juntos!",
        'fr-FR':
          "**Je suis là pour vous aider ! Dites-moi ce qui vous préoccupe.**\n\nJe peux vous guider pour :\n• **Faire face aux fins de mois difficiles**\n• **Payer votre loyer étudiant ou vos charges**\n• **Régler vos dettes et emprunts**\n• **Répartir votre budget avec la règle 50/30/20**\n• **Stopper les dépenses impulsives**\n\nQuel est votre problème financier actuel ? Posez votre question, je vous écoute !",
        'ar-SA':
          "**أنا هنا لمساعدتك بكل سرور! أخبرني بما يقلقك في ميزانيتك.**\n\nيمكنني إرشادك في:\n• **التعامل مع نفاد المصروف قبل نهاية الشهر**\n• **دفع إيجار السكن الجامعي أو الرسوم**\n• **سداد الديون والقروض الطلابية**\n• **تقسيم ميزانيتك الشهرية بقاعدة 50/30/20**\n• **إيقاف الشراء العاطفي والتبذير**\n\nما هو التحدي الذي تواجهه حالياً؟ اكتب سؤالك أو تحدث عبر الميكروفون وسأساعدك فوراً!"
      };

      return {
        answer: helpResponses[activeLang] || helpResponses['en-GB'],
        topicId: 'help_triage',
        isRtl: activeLang === 'ar-SA'
      };
    }

    // 3.8. Dynamic affordability checking (e.g. concert tickets, clothes, tech)
    const affordCheck = parseAffordabilityQuery(norm);
    if (affordCheck) {
      return {
        answer: affordCheck.answer,
        topicId: affordCheck.topicId,
        isRtl: false
      };
    }

    // 4. Dynamic budget calculation for custom amounts (e.g., "budget 50000", "split 100k")
    const dynamicBudget = parseDynamicBudget(norm);
    if (dynamicBudget) {
      return {
        answer: dynamicBudget.answer,
        topicId: dynamicBudget.topicId,
        isRtl: false
      };
    }

    // 5. Dynamic savings timeline for custom goals
    const dynamicTimeline = parseSavingsTimeline(norm);
    if (dynamicTimeline) {
      return {
        answer: dynamicTimeline.answer,
        topicId: dynamicTimeline.topicId,
        isRtl: false
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

    // Helper for boundary-aware keyword matching to prevent partial false positives
    const getKeywordScore = (queryText, kw) => {
      const cleanKw = kw.toLowerCase().trim();
      if (!cleanKw) return 0;
      if (queryText === cleanKw) return 100;
      if (cleanKw.includes(' ') || cleanKw.includes('/')) {
        if (queryText.includes(cleanKw)) return 40 + cleanKw.length;
      } else {
        const escaped = cleanKw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(^|\\s|[.,!?;])${escaped}($|\\s|[.,!?;])`, 'i');
        if (regex.test(queryText)) return 25;
      }
      return 0;
    };

    // 6. Ranked relevance scoring across knowledge bases
    let bestMatch = null;
    let highestScore = 0;

    // Check multilingual knowledge
    for (const [topicKey, item] of Object.entries(MULTILINGUAL_KNOWLEDGE)) {
      let score = 0;
      for (const kw of item.keywords) {
        score += getKeywordScore(norm, kw);
      }
      if (score > highestScore) {
        highestScore = score;
        const localized = item[activeLang] || item['en-GB'];
        const text = isExplainQuery ? localized.explanation || localized.response : localized.response;
        bestMatch = {
          answer: text,
          topicId: topicKey,
          isRtl: activeLang === 'ar-SA'
        };
      }
    }

    // Check comprehensive local knowledge base
    for (const item of chatbotKnowledge) {
      let score = 0;
      for (const kw of item.keywords) {
        score += getKeywordScore(norm, kw);
      }
      if (score > highestScore) {
        highestScore = score;
        const text = isExplainQuery ? item.explanation || item.response : item.response;
        bestMatch = {
          answer: text,
          topicId: item.id,
          isRtl: false
        };
      }
    }

    if (bestMatch && highestScore >= 15) {
      return bestMatch;
    }

    // 7. General student financial query synthesis
    if (
      norm.includes('invest') ||
      norm.includes('crypto') ||
      norm.includes('stock') ||
      norm.includes('shares') ||
      norm.includes('trading')
    ) {
      return {
        answer:
          "**Student Investing Primer:**\n\nBefore investing in stocks or financial markets:\n1. **Build Your Safety Net First**: Ensure you have an emergency fund of at least ₦20,000 to ₦50,000 for unexpected campus costs.\n2. **Avoid High-Risk Promises**: Stay completely away from 'get-rich-quick' schemes, binary trading, or forex pools promising guaranteed daily returns.\n3. **Start Low-Risk & Long-Term**: Regulated mutual funds or dollar-denominated index funds are far safer vehicles for young adults than speculative trading.\n\n*Master budgeting your current allowance first with our 50/30/20 calculator!*",
        topicId: 'student_investing',
        isRtl: false
      };
    }

    // 8. Empathetic fallback response
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
    setInterimSpeech('');
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
    }, 450);
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
                <div className="beewise-mascot-frame" aria-label="BeeWise Avatar">
                  <Bot size={22} className="mascot-bot-icon" />
                </div>
                <div>
                  <div className="tutor-title-row">
                    <h2 className="beewise-title">BeeWise Assistant</h2>
                    <span className="online-beacon-dot" title="Real-time Financial Model Synced"></span>
                  </div>
                  <span className="beewise-subtitle">
                    <span className="status-live-sync">• Online • 50/30/20 Synced</span>
                  </span>
                </div>
              </div>

              <div className="chat-header-actions">
                <div className="stipend-sync-badge hide-on-mobile" title="Simulated Active Student Balance">
                  <span className="stipend-sync-label">Stipend:</span>
                  <strong className="stipend-sync-amt">{format(convertFromNgn(22400))} Left</strong>
                </div>

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
                <span>Language:</span>
              </div>

              {/* Mobile Language Dropdown */}
              <div className="chat-lang-select-wrapper">
                <select
                  id="mobile-chat-lang-select"
                  className="chat-lang-select"
                  value={selectedLang}
                  onChange={(e) => handleChangeLanguage(e.target.value)}
                  aria-label="Select AI Language"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.code} • {l.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="chat-lang-select-arrow" />
              </div>

              {/* Desktop Language Pills */}
              <div className="chat-lang-pills">
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    className={`chat-lang-pill ${selectedLang === l.id ? 'active' : ''}`}
                    onClick={() => handleChangeLanguage(l.id)}
                    title={l.name}
                  >
                    <span className="lang-badge">{l.code}</span>
                    <span className="lang-name">{l.name.replace(/\(.*?\)/g, '').trim()}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="suggested-chips-scroll">
              <button
                type="button"
                className="suggest-chip highlight-chip"
                onClick={() => handleSend(`Can I afford ${currency.symbol}4,760 concert tickets this weekend on my remaining ${currency.symbol}22,400 stipend without wrecking groceries?`)}
              >
                <Sparkles size={13} className="chip-icon text-gold" />
                <span>Can I afford {currency.symbol}4,760 concert tickets on {currency.symbol}22,400 stipend?</span>
              </button>
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

            <div className="beewise-messages-box" ref={messagesBoxRef}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`message-bubble-row ${m.sender === 'user' ? 'row-user' : 'row-bot'} animate-fade-in`}
                >
                  {m.sender === 'bot' && (
                    <div className="bot-mini-frame" aria-label="BeeWise">
                      <Bot size={15} className="mini-bot-icon" />
                    </div>
                  )}

                  <div className="bubble-payload">
                    <div className="bubble-box">
                      <FormattedChatMessage text={m.text} isRtl={m.isRtl} />
                    </div>

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
                  <div className="bot-mini-frame" aria-label="BeeWise">
                    <Bot size={15} className="mini-bot-icon" />
                  </div>
                  <div className="bubble-payload typing-payload">
                    <span className="dot-pulse"></span>
                    <span className="dot-pulse"></span>
                    <span className="dot-pulse"></span>
                  </div>
                </div>
              )}
            </div>

            {isListening && (
              <div className="chat-listening-banner animate-fade-in" id="voice-listening-panel">
                <div className="listening-pulse-group">
                  <span className="listening-pulse-dot"></span>
                  <span className="listening-label">{activeUi.listening}</span>
                </div>
                {interimSpeech && (
                  <div className="listening-transcript-preview">
                    "{interimSpeech}"
                  </div>
                )}
                <div className="listening-actions-group">
                  <button
                    type="button"
                    className="listening-action-btn btn-send-voice"
                    onClick={() => {
                      try {
                        recognitionRef.current?.stop();
                      } catch (e) {}
                      setIsListening(false);
                      const speechText = (inputText + ' ' + interimSpeech).trim();
                      setInterimSpeech('');
                      if (speechText) {
                        handleSend(speechText);
                      }
                    }}
                  >
                    <span>Done & Ask</span>
                    <Send size={12} />
                  </button>
                  <button
                    type="button"
                    className="listening-action-btn btn-cancel-voice"
                    onClick={() => {
                      try {
                        recognitionRef.current?.stop();
                      } catch (e) {}
                      setIsListening(false);
                      setInterimSpeech('');
                    }}
                  >
                    Stop
                  </button>
                </div>
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
                placeholder="Ask BeeWise: 'How much should I spend on dorm groceries?'"
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
                <ArrowRight size={18} />
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

            {/* Redesigned Direct Student Lines Support Box */}
            <div className="campus-helpline-box" id="student-helplines">
              <div className="helpline-header-row">
                <div className="helpline-title-group">
                  <div className="helpline-icon-badge">
                    <Headphones size={15} />
                  </div>
                  <div>
                    <h4 className="helpline-title">Direct Student Lines</h4>
                    <span className="helpline-subtitle">Campus Financial Advisors & Peer Helpdesk</span>
                  </div>
                </div>
                <span className="helpline-badge-online">
                  <span className="helpline-pulse-dot"></span>
                  <span>Live & Free</span>
                </span>
              </div>

              <div className="helpline-links-grid">
                <a
                  href="mailto:budgetbasic58@gmail.com"
                  className="helpline-card-item"
                  id="helpline-email-link"
                  title="Send email to student support"
                >
                  <div className="helpline-card-icon icon-email">
                    <Mail size={16} />
                  </div>
                  <div className="helpline-card-content">
                    <span className="helpline-card-label">Campus Email</span>
                    <span className="helpline-card-value">budgetbasic58@gmail.com</span>
                  </div>
                  <ArrowUpRight size={14} className="helpline-card-arrow" />
                </a>

                <a
                  href="tel:+18005552339"
                  className="helpline-card-item"
                  id="helpline-phone-link"
                  title="Call toll-free student hotline"
                >
                  <div className="helpline-card-icon icon-phone">
                    <Phone size={16} />
                  </div>
                  <div className="helpline-card-content">
                    <span className="helpline-card-label">Toll-Free Hotline</span>
                    <span className="helpline-card-value">1-800-555-BEE9</span>
                  </div>
                  <ArrowUpRight size={14} className="helpline-card-arrow" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
