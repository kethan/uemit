export interface EventsMap {
    [event: string]: any;
}
export interface Msg<T = any> {
    timestamp: number;
    event: string;
    data: T;
    respond: (data: T) => void;
}

export type Promisable<T> = Promise<T> | T;
export type Handler<T = any> = (req: Msg<T>) => Promisable<void>;
export default class Emit<T extends EventsMap = any> {
    constructor();
    request<K extends keyof T>(event: K, data: T[K]): Promise<T[K]>;
    subscribe<K extends keyof T>(event: K, cb: Handler<T[K]>): Emit;
}