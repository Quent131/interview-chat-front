import { SocketProvider } from "./contexts/socket";
import { Chat } from "./components/Chat";
import { MessageInput } from "./components/MessageInput";
import { UserDialog } from "./components/UserDialog";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <SocketProvider>
      <div className="flex flex-col h-screen w-screen flex-1 gap-2">
        <UserDialog open={open} />
        <Chat />
        <MessageInput />
      </div>
    </SocketProvider>
  );
}

export default App;
