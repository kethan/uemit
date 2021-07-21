interface EventsMap {
    [event: string]: any;
}

interface Msg<T = any> {
    timestamp: number;
    event: string;
    data: T;
    respond: (data: T) => void;
}

export type Promisable<T> = Promise<T> | T;
export type Handler<T> = (req: Msg<T>) => Promisable<void>;

declare class Emit<Events extends EventsMap = any> {
    constructor();
    request<K extends keyof Events>(event: K, data: Events[K]): Promise<Events[K]>;
    subscribe<K extends keyof Events = any>(event: K, cb: Handler<Events[K]>): Emit;
}