import { useSocket } from "@/contexts/socket";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { Button } from "./ui/button";

export const Chat = () => {
  const { messages } = useSocket();
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    setAutoScroll(isAtBottom);
  };

  useEffect(() => {
    if (autoScroll && chatRef.current) {
      chatRef.current.lastElementChild?.scrollIntoView({ behavior: "smooth" });
      setShowButton(false);
    } else {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 200); // Ajustez le délai selon vos besoins
      return () => clearTimeout(timer);
    }
  }, [messages, autoScroll]);

  return (
    <div
      ref={chatRef}
      className="overflow-y-auto pl-2 pt-2 flex-1"
      onScroll={handleScroll}
    >
      {!autoScroll && showButton && (
        <Button
          className="fixed left-1/2 transform -translate-x-1/2 z-50"
          onClick={() => {
            setAutoScroll(true);
            chatRef.current?.lastElementChild?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Chat mis en pause à cause du défilement
        </Button>
      )}
      {messages.map((message) => (
        <Message
          message={message}
          key={`${message.user.username}-${message.date}`}
        />
      ))}
    </div>
  );
};
