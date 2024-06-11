import Room from "./Room";
import Message from "./Message";

export default interface RoomWithMessages extends Room {
    
    readonly messages?: Message[];
}
