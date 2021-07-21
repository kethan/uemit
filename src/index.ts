import { EventsMap, Msg, Handler } from "../index";
export default class Emit<T extends EventsMap = any> {
    private events: any = {};
    async request<K extends keyof T>(event: K, data: T[K]): Promise<T[K]> {
        const msg: Msg<T[K]> = {
            event: event.toString(),
            timestamp: new Date().getTime(),
            data: data,
            respond: function (data: T[K]) {
                this.data = data;
            }
        };
        try {
            await this.events[event](msg);
            return msg.data;
        } catch (error) {
            throw error;
        }
    }
    subscribe<K extends keyof T>(event: K, cb: Handler<T[K]>) {
        this.events[event] = cb;
        return this;
    }
}