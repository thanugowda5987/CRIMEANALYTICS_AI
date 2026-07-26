import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { sendChatMessage } from "../../api/aiApi";

const SUGGESTIONS = [
  "Show cyber crimes in Bengaluru",
  "Find repeat offenders",
  "Predict burglary hotspots",
  "Show crime trend last 5 years",
  "Generate investigation summary",
];

const ChatWidget = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello, I'm the KSP AI Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: messageText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendChatMessage(messageText);
      const reply = res.data?.data?.reply || "AI service is not connected yet.";
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Unable to reach AI service right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-card shadow-card border border-borderLight dark:border-gray-700 flex flex-col h-[600px]">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-borderLight dark:border-gray-700">
        <Sparkles size={18} className="text-primary" />
        <h3 className="font-heading font-semibold text-textDark dark:text-white">
          AI Assistant
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
        ))}
        {loading && <ChatMessage sender="ai" text="Typing..." />}
        <div ref={bottomRef} />
      </div>

      <div className="px-5 pb-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => handleSend(s)}
            className="text-xs px-3 py-1.5 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="px-5 pb-5 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask the AI Assistant..."
          className="flex-1 px-4 py-2.5 rounded-full border border-borderLight dark:border-gray-700 bg-bgLight dark:bg-gray-700 text-sm text-textDark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button
          onClick={() => handleSend()}
          className="w-10 h-10 rounded-full bg-button-gradient text-white flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0"
        >
          <Send size={17} />
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;