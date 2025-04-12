import ChatBase from '@/components/chat/ChatBase';
import React from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const ChatPage = async ({ params }: PageProps) => {
  console.log('The group ID is:', params.id);

  return (
    <div>
      <h1>Hello, I am chat</h1>
      <ChatBase/>
    </div>
  );
};

export default ChatPage;
