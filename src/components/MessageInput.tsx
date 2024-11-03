import { useSocket } from "@/contexts/socket";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SendHorizonal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user";

export const MessageInput = () => {
  const { socket } = useSocket();
  const { username, color } = useUserStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messageInput: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (socket)
      socket.emit("send-message", {
        type: "text",
        user: {
          username: username,
          color: color,
        },
        text: values.messageInput,
        date: Date.now(),
      });
    form.reset();
  };

  return (
    <div className="flex gap-4 p-2 items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 items-center gap-4"
        >
          <FormField
            control={form.control}
            name="messageInput"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Envoyer un message"
                    {...field}
                    disabled={!username || !color}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!username || !color}>
            <SendHorizonal />
          </Button>
        </form>
      </Form>
    </div>
  );
};

const formSchema = z.object({
  messageInput: z.string().min(1),
});
