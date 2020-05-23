'use strict';

class EventBus {
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

            strEvents.forEach((event) => {
                const callbacks = callbacksMap[event];
                const index = callbacks.indexOf(callback);
                delete callbacks[index];
            });
        };
    }

    broadcast(event, data) {
        let shift = '';
        for (let i = 0; i < tab; i++) shift += '    ';
        console.log(shift, event, data);
        tab += 1;

        if (event === 'product-card__add-button-Биг тейсти9-clicked') {}

        const callbacks = this._callbacksMap[event.toLowerCase()] || [];

        callbacks.forEach((callback) => {
            if (callback !== undefined) callback(data);
        });
        tab -= 1;
    }
}
let tab = 0;
export default new EventBus();
