import { useEffect, useRef, useState } from 'react';
import './Chat.css';

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  text: 'Hola, soy tu asistente de Uber Eats. Dime que te apetece comer o si tienes alguna duda sobre tu pedido.',
};

const QUICK_REPLIES = ['Quiero pizza', 'Opciones veganas', 'Algo rapido', '¿Cuanto tarda el pedido?'];

const MOCK_RESPONSES = [
  { keywords: ['pizza', 'pizzas'], reply: 'Te recomiendo Pizza Spot: margarita desde 9,90 € y entrega en ~25 min.' },
  { keywords: ['vegan', 'vegetal', 'plant'], reply: 'Prueba Green Bowl: menu 100 % vegetal y muy bien valorado en tu zona.' },
  { keywords: ['burger', 'hamburg'], reply: 'Burger Express tiene combos rapidos y suele entregar en unos 15 min.' },
  { keywords: ['sushi', 'japon'], reply: 'Sushi Go tiene un 20 % de descuento hoy en bandejas mixtas.' },
  { keywords: ['postre', 'dulce', 'tarta'], reply: 'Sweet Lab tiene tartas sin gluten y brownies caseros.' },
  { keywords: ['rapido', 'prisa', 'urgent'], reply: 'Los mas rapidos ahora: Burger Express y Wok Flash (15-20 min).' },
  { keywords: ['precio', 'caro', 'barato', 'euro'], reply: 'Puedo filtrar por precio. Dime un maximo (por ejemplo: "menos de 12 euros").' },
  { keywords: ['tarda', 'tiempo', 'entrega', 'cuando'], reply: 'El tiempo medio de entrega en tu zona es de 25-35 minutos.' },
  { keywords: ['pago', 'tarjeta', 'efectivo'], reply: 'Aceptamos tarjeta, Bizum y efectivo al repartidor.' },
  { keywords: ['hola', 'buenas', 'hey'], reply: 'Hola! ¿En que puedo ayudarte hoy con tu pedido?' },
];

function getMockReply(message) {
  const normalized = message.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

  const match = MOCK_RESPONSES.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword))
  );

  if (match) return match.reply;

  return 'Entendido. Por ahora soy un asistente de demostracion, pero puedo sugerirte restaurantes si me dices que tipo de comida buscas (pizza, vegano, sushi...).';
}

function Chat({ onBack }) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: getMockReply(trimmed),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 900);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="chat-page">
      <header className="chat-header">
        <button type="button" className="chat-back-btn" onClick={onBack}>
          Volver
        </button>
        <div className="chat-header-info">
          <span className="chat-brand">
            Uber <span className="green">Eats</span> Assistant
          </span>
          <span className="chat-status">
            <span className="chat-status-dot" />
            En linea (demo)
          </span>
        </div>
      </header>

      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`chat-bubble-row chat-bubble-row-${message.role}`}>
              {message.role === 'assistant' && <span className="chat-avatar">UE</span>}
              <div className={`chat-bubble chat-bubble-${message.role}`}>
                <p>{message.text}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble-row chat-bubble-row-assistant">
              <span className="chat-avatar">UE</span>
              <div className="chat-bubble chat-bubble-assistant chat-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-quick-replies">
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              type="button"
              className="chat-quick-btn"
              onClick={() => sendMessage(reply)}
              disabled={isTyping}
            >
              {reply}
            </button>
          ))}
        </div>

        <form className="chat-input-bar" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={isTyping}
          />
          <button type="submit" className="chat-send-btn" disabled={!input.trim() || isTyping}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
