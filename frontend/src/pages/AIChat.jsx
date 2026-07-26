import ChatWidget from "../components/ai/ChatWidget";

const AIChat = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-textDark dark:text-white">
          AI Assistant
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Conversational AI for investigation queries in English and Kannada.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <ChatWidget />
      </div>
    </div>
  );
};

export default AIChat;