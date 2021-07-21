import { EventsMap, Msg, Handler } from "../index";

export default class Emit<Events extends EventsMap = any> {
  private events: any = {};
  async request<K extends keyof Events>(event: K, data: Events[K]): Promise<Events[K]> {
    const msg: Msg<Events[K]> = {
      event: event.toString(),
      timestamp: new Date().getTime(),
      data: data,
      respond: function (data: Events[K]) {
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
  subscribe<K extends keyof Events = any>(event: K, cb: Handler<Events[K]>) {
    this.events[event] = cb;
    return this;
  }
}