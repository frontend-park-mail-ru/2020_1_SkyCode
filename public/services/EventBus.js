/**
 * Класс, позволяющий его клиетнам подписываться на события и
 *  инициировать их, передавая подписчикам информацию
 *
 * @note реализует паттерн singleton
 * @note реализует паттерн reader-writer
 */
class EventBus {
    constructor() {
        if (EventBus.instance)
            return EventBus.instance;

        this.channels = {};
        EventBus.instance = this;
        return this;
    }

    subscribe(name, listener) {
        if (!this.channels[name]) {
            this.channels[name] = [];
        }

        this.channels[name].push(listener);
    }

    unsubscribe(name, listener) {
        if (this.channels[name]) {
            const index = this.channels[name].indexOf(listener);
            this.channels[name].splice(index, 1);
        }
    }

    publish(name, data) {
        const channel = this.channels[name];
        if (!channel || !channel.length) {
            return;
        }
        channel.forEach(listener => listener(data));
    }
}

export default new EventBus();
