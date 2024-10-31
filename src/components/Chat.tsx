import { useSocket } from "@/contexts/socket";
import { useEffect, useRef } from "react";
import { Message } from "./Message";

export const Chat = () => {
  const { messages } = useSocket();

  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div ref={chatRef} className="overflow-y-auto pl-2 pt-2 flex-1">
      {messages.map((message) => (
        <Message message={message} />
      ))}
    </div>
  );
};
