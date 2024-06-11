import User from "../types/User";

class UsersService {
    
    private static basePath: string = `${process.env.REACT_APP_CHATX_API_BASE_PATH}/users`;

    static async getUsers(): Promise<User[]> {
        const response = await fetch(this.basePath);
        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }
        const data = await response.json();
        return data as User[];
    }

    static async getUserById(id: string): Promise<User> {
        const response = await fetch(`${this.basePath}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener usuario');
        }
        const data = await response.json();
        return data as User;
    }

    static async createUser(nick: string): Promise<User> {
        const response = await fetch(this.basePath, 
         {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({nick: nick}),
          });
          
          console.log(response.statusText);

          if (!response.ok) {
            throw new Error(`Error al crear usuario ${response.statusText}`);
          }
      
          const responseData = await response.json();
          return responseData as User;
    }
}

export default UsersService;
