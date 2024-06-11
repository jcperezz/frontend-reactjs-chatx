export default interface Room {
    readonly id?: string;
    readonly name?: string;
    readonly adminId?: string;
    readonly participantsIds?: string[];
}
