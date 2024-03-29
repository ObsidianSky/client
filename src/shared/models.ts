export interface Action<T = any> {
    type: string;
    payload: T;
}

export interface SocketOutAction extends Action {
    command: string;
}