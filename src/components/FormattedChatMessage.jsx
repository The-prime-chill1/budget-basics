// Renders chatbot messages with inline markdown styling, lists, bold text, and Lucide React icons
import React from 'react';
import { Lightbulb, Target, Star, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import './FormattedChatMessage.css';

function parseInlineMarkdown(text) {
  if (!text) return null;

  // Clean any stray unicode emojis so only clean text & React icons are rendered
  const cleanedText = text.replace(/\p{Extended_Pictographic}/ug, '').trim();

  const tokens = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(cleanedText)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: cleanedText.substring(lastIndex, match.index) });
    }
    const tokenStr = match[0];
    if (tokenStr.startsWith('**') && tokenStr.endsWith('**')) {
      tokens.push({ type: 'bold', value: tokenStr.slice(2, -2) });
    } else if (tokenStr.startsWith('*') && tokenStr.endsWith('*')) {
      tokens.push({ type: 'italic', value: tokenStr.slice(1, -1) });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < cleanedText.length) {
    tokens.push({ type: 'text', value: cleanedText.substring(lastIndex) });
  }

  return tokens.map((t, idx) => {
    if (t.type === 'bold') {
      return (
        <strong key={idx} className="msg-bold">
          {t.value}
        </strong>
      );
    }
    if (t.type === 'italic') {
      return (
        <em key={idx} className="msg-italic">
          {t.value}
        </em>
      );
    }
    return <span key={idx}>{t.value}</span>;
  });
}

export default function FormattedChatMessage({ text, isRtl = false }) {
  if (!text) return null;

  const rawLines = text.split('\n');
  const elements = [];
  let currentList = null;

  const flushList = (keyPrefix) => {
    if (!currentList) return;
    if (currentList.type === 'bullet') {
      elements.push(
        <ul key={`${keyPrefix}-ul`} className="msg-bullet-list">
          {currentList.items.map((item, i) => (
            <li key={i} className="msg-bullet-item">
              <span className="msg-bullet-marker">&#8226;</span>
              <div className="msg-bullet-content">{parseInlineMarkdown(item)}</div>
            </li>
          ))}
        </ul>
      );
    } else if (currentList.type === 'ordered') {
      elements.push(
        <ol key={`${keyPrefix}-ol`} className="msg-ordered-list">
          {currentList.items.map((item, i) => (
            <li key={i} className="msg-ordered-item">
              <span className="msg-step-num">{item.num}</span>
              <div className="msg-step-content">{parseInlineMarkdown(item.text)}</div>
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  rawLines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(lineIdx);
      return;
    }

    if (/^[•*-]\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^[•*-]\s+/, '');
      if (!currentList || currentList.type !== 'bullet') {
        flushList(lineIdx);
        currentList = { type: 'bullet', items: [] };
      }
      currentList.items.push(itemText);
      return;
    }

    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      const num = orderedMatch[1];
      const itemText = orderedMatch[2];
      if (!currentList || currentList.type !== 'ordered') {
        flushList(lineIdx);
        currentList = { type: 'ordered', items: [] };
      }
      currentList.items.push({ num, text: itemText });
      return;
    }

    flushList(lineIdx);

    // Detect callout lines and replace with React Lucide Icons
    const hasTip = /\u{1F4A1}/u.test(trimmed) || /^(pro-tip:|tip:|\*\*tip|\*\*pro-tip)/i.test(trimmed);
    const hasTarget = /\u{1F3AF}/u.test(trimmed) || /^(goal:|target:|\*\*goal|\*\*target)/i.test(trimmed);
    const hasStar = /[\u{2B50}\u{2605}]/u.test(trimmed) || /^(note:|remember:|\*\*note)/i.test(trimmed);
    const hasSparkle = /\u{2728}/u.test(trimmed);
    const isBoldHeader = /^(\*\*.*\*\*)/.test(trimmed);

    if (hasTip || hasTarget || hasStar || hasSparkle || isBoldHeader) {
      let icon = null;
      if (hasTip) icon = <Lightbulb size={16} className="callout-react-icon text-gold" />;
      else if (hasTarget) icon = <Target size={16} className="callout-react-icon text-emerald" />;
      else if (hasStar) icon = <Star size={16} className="callout-react-icon text-gold" />;
      else if (hasSparkle) icon = <Sparkles size={16} className="callout-react-icon text-indigo" />;

      elements.push(
        <div key={lineIdx} className="msg-callout-header">
          {icon}
          <span>{parseInlineMarkdown(trimmed)}</span>
        </div>
      );
    } else {
      elements.push(
        <p key={lineIdx} className="msg-paragraph">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    }
  });

  flushList('final');

  return (
    <div className={`formatted-chat-message ${isRtl ? 'msg-rtl' : 'msg-ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {elements}
    </div>
  );
}
