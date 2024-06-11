import { socket } from './config/WebSocketConfig.ts';
import User from '../types/User.ts';
import OnlineUser from '../types/OnlineUser.ts';
import Message from '../types/Message.ts';

class ChatService {

    static sendMessage(message: Message) {
        socket.emit('sendMessage', message);
    }

    static onMessage(callback: (message: Message) => void) {
        socket.on('newMessage', callback);
    }

    static onOnlineUser(callback: (data: OnlineUser) => void) {
        socket.on('newOnlineUser', callback);
    }

    static onOfflineUser(callback: (connectionId: string) => void) {
        socket.on('offlineUser', callback);
    }

    static disconect(){
        socket.disconnect();
        socket.close();
    }


    static sendUserOnline(user: User) {
        if(!socket.active){
            socket.connect();
            socket.on('connect', () => console.log('Connected to server:', socket.id));
            socket.emit('onlineUser', user);
        }
    }

}

export default ChatService;