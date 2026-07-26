import DashboardLayout from '../components/layout/DashboardLayout';
import ChatWindow from '../components/chat/ChatWindow';

const AIChat = () => {
  return (
    <DashboardLayout>
      <h2 className="text-xl font-heading font-semibold mb-5">AI Investigation Assistant</h2>
      <ChatWindow />
    </DashboardLayout>
  );
};

export default AIChat;