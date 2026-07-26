import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import ChatBubble from './ChatBubble';
import Card from '../common/Card';
import { sendChatMessage } from '../../api/aiApi';

const suggestions = [
  'Show cyber crimes in Bengaluru',
  'Find repeat offenders',
  'Predict burglary hotspots',
  'Show crime trend last 5 years',
];

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', message: 'Hello, how can I assist your investigation today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    const content = text ?? input;
    if (!content.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', message: content }]);
    setInput('');
    setLoading(true);

    try {
      const res = await sendChatMessage({ query: content });
      const reply = res?.data?.data?.reply || 'AI service integration pending.';
      setMessages((prev) => [...prev, { role: 'assistant', message: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', message: 'AI service is currently unavailable.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[75vh]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={18} className="text-primary" />
        <h3 className="font-heading font-semibold">AI Investigation Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} message={m.message} />
        ))}
        {loading && <ChatBubble role="assistant" message="Thinking..." />}
        <div ref={bottomRef} />
      </div>

      <div className="flex flex-wrap gap-2 my-3">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => handleSend(s)}
            className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-primary/5 dark:border-slate-600 dark:hover:bg-white/5"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-border dark:border-slate-700 pt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about a case, criminal, or crime pattern..."
          className="flex-1 px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-700 dark:border-slate-600"
        />
        <button
          onClick={() => handleSend()}
          className="p-2.5 rounded-xl bg-button-gradient text-white"
        >
          <Send size={16} />
        </button>
      </div>
    </Card>
  );
};

export default ChatWindow;