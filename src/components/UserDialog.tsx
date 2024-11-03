import { useUserStore } from "@/store/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ColorPicker } from "./ui/color-picker";

export const UserDialog = ({ open, setOpen }: Props) => {
  const color = useUserStore((state) => state.color);
  const username = useUserStore((state) => state.username);
  const setUserInfos = useUserStore((state) => state.setUserInfos);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username,
      color: color,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setUserInfos(values.username, values.color);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bienvenue sur le chat</DialogTitle>
          <DialogDescription>
            Afin de participer à la discussion, veuillez renseigner votre pseudo
            et la couleur dans laquelle votre pseudo s'affichera.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input placeholder="MonPseudo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="flex-1 flex flex-col">
                  <FormLabel>Couleur du pseudo</FormLabel>
                  <FormControl className="self-center">
                    <ColorPicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Valider</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const formSchema = z.object({
  username: z.string().min(1),
  color: z.string().min(1),
});
