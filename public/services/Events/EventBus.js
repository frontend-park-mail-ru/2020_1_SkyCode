'use strict';

class EventBus {
    constructor() {
        if (EventBus.instance) {
            return EventBus.instance;
        }
        this.events = {};
        EventBus.instance = this;
        return this;
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    unsubscribe(event, callback) {
        if (this.events[event]) {
            const index = this.events[event].indexOf(callback);
            this.events[event].splice(index, 1);
        }
    }

    publish(event, data) {
        const callbacks = this.events[event];
        if (!callbacks || !callbacks.length) {
            return;
        }
        callbacks.forEach((callback) => callback(data));
    }
}

export default new EventBus();
