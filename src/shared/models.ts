export interface Identifiable {
    id: number;
}

export interface Action<T = any> {
    type: string;
    payload: T;
}

export interface WsOutAction extends Action {
    command: string;
}