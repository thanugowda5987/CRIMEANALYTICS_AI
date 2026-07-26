const ChatBubble = ({ role, message }) => {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-button-gradient text-white rounded-br-sm'
            : 'glass dark:bg-slate-700 dark:text-white rounded-bl-sm'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;