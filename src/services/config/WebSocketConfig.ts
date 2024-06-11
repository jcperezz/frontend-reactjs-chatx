import { io } from 'socket.io-client';

const SOCKET_URL = `${process.env.REACT_APP_CATHX_WEBSOCKET_BASE_PATH}/room`;

export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: false,
});