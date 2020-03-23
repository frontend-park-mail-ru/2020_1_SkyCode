'use strinct';

class EventBus {
    _listeners;

    constructor() {
        this._listeners = {};
    }

    subscribe(events, callback) {
        if (typeof callback !== 'function') {
            log('callback is not a function');
            return;
        }

        let strEvents = String(events).toLowerCase().split(/\s/);

        strEvents.forEach(event => {
            if (!this._listeners[event]) {
                this._listeners[event] = [];
            }
            
            this._listeners[event].push(callback);
        });

        /* Теперь subscribe сразу возвращает функцию, отписывающую соответствующие 
        события. 

        Таким образом можно не только легко отписываться от событий, но и 
        быть уверенным, что нас никто не отпишет втихую */
        let singleUnsubscribe = true;
        // След переменная создается, чтобы ф-я была независима от this
        let listeners = this._listeners;

        return function stopListen() {
            if (!singleUnsubscribe) {
                log('multiple unsubscribe attempt');
                return;
            }

            singleUnsubscribe = false;

            events.forEach(event => {
                const callbacks = listeners[event];
                const index = callbacks.indexOf(callback);
                callbacks.splice(index, 1);
            });
        };
    }

    broadcast(event, data) {
        let callbacks = (this._listeners[event.toLowerCase()] || []);

        callbacks.forEach(callback => {
            callback(data);
        });
    }
}

function log(message) {
    start = '\nEventFlow:\t';
    console.log(start + message);
}

// export default new EventBus();
