import Room from "../types/Room";
import RoomWithMessages from "../types/RoomWithMessages";


class RoomsService {
    
    private static basePath: string = `${process.env.REACT_APP_CHATX_API_BASE_PATH}/rooms`;

    static async getRooms(): Promise<Room[]> {
        const response = await fetch(this.basePath);
        if (!response.ok) {
            throw new Error('Error al obtener las salas de chat');
        }
        const data = await response.json();
        return data as Room[];
    }

    static async getRoomById(id: string): Promise<RoomWithMessages> {
        const response = await fetch(`${this.basePath}/${id}`);
        if (!response.ok) {
            throw new Error(`Error al obtener la sala de chat con id ${id}`);
        }
        const data = await response.json();
        return data as RoomWithMessages;
    }

    static async createRoom(nick: string): Promise<Room> {
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
      
          const responseData = await response.json();
          return responseData as Room;
    }
}

export default RoomsService;