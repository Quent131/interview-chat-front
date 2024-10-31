import { io } from "socket.io-client";

const CONNECTION_URL = "wss://api.dev.stories.studio/";
const SOCKET_PATH = "/interview-test";
const SOCKET_TRANSPORTS = ["websocket"];

export const connectSocket = () => {
  const socket = io(CONNECTION_URL, {
    // @ts-expect-error Apparently, TS wants to use transports instead of transport, but connnection does not work if we do so
    transport: SOCKET_TRANSPORTS,
    path: SOCKET_PATH,
  });
  return socket;
};
