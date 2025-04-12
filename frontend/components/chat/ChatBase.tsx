'use client';

import { getSocket } from '@/lib/socket.config';
import React, { useEffect, useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Button } from '../ui/button';

const ChatBase = ({groupId}:{groupId:string}) => {
  const socketRef = useRef(getSocket(groupId));
  
  useEffect(() => {
    const socket = socketRef.current;
    socket.auth={
      room:groupId
    }
    if (!socket.connected) {
      socket.connect();
    }

    socket.on('message', (data: any) => {
      console.log('Received socket message:', data);
    });

    return () => {
      socket.disconnect(); // properly clean up
    };
  }, []);

  const handleClick = () => {
    socketRef.current.emit('message', { name: 'abhi', id: uuidV4() });
  };

  return (
    <div>
      <Button onClick={handleClick}>Send ME</Button>
    </div>
  );
};

export default ChatBase;
