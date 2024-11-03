import { SocketProvider } from "./contexts/socket";
import { Chat } from "./components/Chat";
import { MessageInput } from "./components/MessageInput";
import { UserDialog } from "./components/UserDialog";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { UserPen } from "lucide-react";

function App() {
  const [open, setOpen] = useState(true);
  return (
    <SocketProvider>
      <div className="flex flex-col h-screen w-screen flex-1 gap-2">
        <Button onClick={() => setOpen(true)} className="fixed top-2 right-2">
          <UserPen />
        </Button>
        <UserDialog open={open} setOpen={setOpen} />
        <Chat />
        <MessageInput />
      </div>
    </SocketProvider>
  );
}

export default App;
