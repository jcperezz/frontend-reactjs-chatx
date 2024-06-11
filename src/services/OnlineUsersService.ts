import OnlineUser from "../types/OnlineUser";

class OnlineUsersService {

    private static basePath: string = `${process.env.REACT_APP_CHATX_API_BASE_PATH}/online-users`;

    static async getOnlineUsers(): Promise<OnlineUser[]> {
        const response = await fetch(this.basePath);
        if (!response.ok) {
            throw new Error('Error al obtener las salas de chat');
        }
        const data = await response.json();
        return data as OnlineUser[];
    }

    static async create(nick: string): Promise<void> {
        const response = await fetch(this.basePath, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({nick: nick}),
          });
          
          if (!response.ok) {
            throw new Error(`Error al crear la sala ${response.text}`);
          }
    }

}

export default OnlineUsersService;