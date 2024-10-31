import { SocketProvider } from "./contexts/socket";
import { Chat } from "./components/Chat";
import { MessageInput } from "./components/ui/MessageInput";

function App() {
  return (
    <SocketProvider>
      <div className="flex flex-col h-screen w-screen flex-1 gap-2">
        <Chat />
        <MessageInput />
      </div>
    </SocketProvider>
  );
}

export default App;
