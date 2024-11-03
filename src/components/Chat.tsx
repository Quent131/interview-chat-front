import { useSocket } from "@/contexts/socket";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { Button } from "./ui/button";

export const Chat = () => {
  const { messages } = useSocket();
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    setAutoScroll(isAtBottom);
  };

  useEffect(() => {
    if (autoScroll && chatRef.current) {
      setScrolling(true);
      chatRef.current.lastElementChild?.scrollIntoView({ behavior: "smooth" });

      // Reset scrolling state after a slight delay
      const scrollEndTimer = setTimeout(() => {
        setScrolling(false);
      }, 100); // Ajustez ce délai selon vos besoins

      setShowButton(false);
      return () => clearTimeout(scrollEndTimer);
    } else {
      const buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, 200);
      return () => clearTimeout(buttonTimer);
    }
  }, [messages, autoScroll]);

  return (
    <div
      ref={chatRef}
      className="overflow-y-auto pl-2 pt-2 flex-1"
      onScroll={handleScroll}
    >
      {!autoScroll && showButton && !scrolling && (
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
