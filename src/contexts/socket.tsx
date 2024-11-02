import { connectSocket } from "@/lib/socket";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket } from "socket.io-client";

const SocketContext = createContext<{
  socket: Socket | undefined;
  messages: Message[];
}>({
  socket: undefined,
  messages: [],
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const mySocket = connectSocket();
    setSocket(mySocket);
    mySocket.on("new-message", (message: Message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
    });
    return () => {
      mySocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
