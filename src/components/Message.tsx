export const Message = ({ message }: Props) => {
  return (
    <p>
      <span style={{ color: message.user.color }}>{message.user.username}</span>
      <span>: {message.text}</span>
    </p>
  );
};

type Props = {
  message: Message;
};
