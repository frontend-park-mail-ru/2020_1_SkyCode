'use strict';

class EventBus {
    _callbacksMap;

    constructor() {
        this._callbacksMap = {};
    }

    subscribe(events, callback) {
        if (typeof callback !== 'function') {
            return;
        }

        const strEvents = String(events).toLowerCase().split(/\s/);

        strEvents.forEach(event => {
            if (!this._callbacksMap[event]) {
                this._callbacksMap[event] = [];
            }

            this._callbacksMap[event].push(callback);
        });

        /* Теперь subscribe сразу возвращает функцию, отписывающую соответствующие
        события.

        Таким образом можно не только легко отписываться от событий, но и
        быть уверенным, что нас никто не отпишет втихую */
        let singleUnsubscribe = true;
        // След переменная создается, чтобы ф-я была независима от this
        const callbacksMap = this._callbacksMap;

        return function stopListen() {
            if (!singleUnsubscribe) {
                return;
            }

            singleUnsubscribe = false;

            events.forEach(event => {
                const callbacks = callbacksMap[event];
                const index = callbacks.indexOf(callback);
                callbacks.splice(index, 1);
            });
        };
    }

    broadcast(event, data) {
        let callbacks = this._callbacksMap[event.toLowerCase()] || [];

        callbacks.forEach(callback => {
            callback(data);
        });
    }
}

export default new EventBus();
