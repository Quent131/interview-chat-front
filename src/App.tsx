import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Message } from "./components/Message";
import { SocketProvider, useSocket } from "./contexts/socket";
import { Chat } from "./components/Chat";

function App() {
  const [input, setInput] = useState<string>("");

  const { socket, messages } = useSocket();

  const onButtonClick = () => {
    if (socket)
      socket.emit("send-message", {
        type: "text",
        user: {
          username: "Quentin",
          color: "#308446",
        },
        text: input,
      });
  };

  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <SocketProvider>
      <div className="flex flex-col h-screen w-screen flex-1 gap-2">
        <Chat />
        <div className="flex gap-4 p-2">
          <Input
            value={input}
            onChange={(event) => setInput(event.currentTarget.value)}
          />
          <Button onClick={onButtonClick}>Envoyer le message</Button>
        </div>
      </div>
    </SocketProvider>
  );
}

export default App;
