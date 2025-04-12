import ChatBase from '@/components/chat/ChatBase';
import { fetchChatGroup, fetchChatGroupUsers, fetchChats } from '@/fetch/groupFetch';
import axios from 'axios';
import { notFound } from 'next/navigation';
import React from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const ChatPage = async ({ params }: PageProps) => {
  console.log('The group ID is:', params.id);
  const groupId = params.id;

 if (!groupId || groupId.length !== 36) {
    return notFound();
  }

  
  const group:ChatGroupType | null=await fetchChatGroup(params?.id)
  

  // console.log('the group data is',group)
  if(group === null){
    return notFound()
  }

  const users:Array<GroupChatUserType> | []=await fetchChatGroupUsers(groupId)
  const chats:Array<MessageType> | []=await fetchChats(params.id)
  return (
    <div>
      <ChatBase users={users} group={group} oldMessages={chats}/>
    </div>
  );
};

export default ChatPage;
