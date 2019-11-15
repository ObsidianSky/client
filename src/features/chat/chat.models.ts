export interface MessageModel {
    id: number;
    userName: string;
    userId: number;
    message: string;
    time?: string;
    edited?: boolean;
}
