import { Bot, User } from "lucide-react";

const ChatMessage = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-secondary text-white" : "bg-button-gradient text-white"
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
          isUser
            ? "bg-secondary text-white rounded-tr-sm"
            : "bg-bgLight dark:bg-gray-700 text-textDark dark:text-white rounded-tl-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;