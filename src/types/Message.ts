export default interface Message {

    readonly id?: string;
    readonly content: string;
    readonly date?: number;
    readonly fromId: string;
    readonly toId: string;
    readonly toConnectionId: string
}