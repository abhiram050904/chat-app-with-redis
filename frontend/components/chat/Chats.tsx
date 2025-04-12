import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getSocket } from '../../lib/socket.config';

export default function Chats({
  group,
  oldMessages,
  chatUser,
}: {
  group: ChatGroupType;
  oldMessages: Array<MessageType> | [];
  chatUser?: GroupChatUserType;
}) {
  const [message, setMessage] = useState("");
  
  // Ensure messages is always initialized as an array
  const [messages, setMessages] = useState<Array<MessageType>>(
    Array.isArray(oldMessages) ? oldMessages : []
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when a new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize socket connection
  const socket = useMemo(() => {
    const socketInstance = getSocket(group.id);
    socketInstance.auth = {
      room: group.id,
    };
    return socketInstance.connect();
  }, [group.id]);

  // Handle incoming messages via socket
  useEffect(() => {
    socket.on("message", (data: MessageType) => {
      console.log("The message is", data);
      // Update the messages with the new one from the server
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, [socket]);

  // Handle form submission for sending a message
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: MessageType = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? "Unknown", // Fallback if chatUser is not defined
      created_at: new Date().toISOString(),
      group_id: group.id,
    };

    socket.emit("message", payload); // Emit the message via socket
    setMessage(""); // Reset message input
  };

  return (
    <div className="flex flex-col h-[94vh] p-4">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div ref={messagesEndRef} />
        <div className="flex flex-col gap-2">
          {/* Render the list of messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-sm rounded-lg p-2 ${
                message.name === chatUser?.name
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white self-end"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
              }`}
            >
              {message.message}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}
