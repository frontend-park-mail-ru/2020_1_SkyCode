'use strict';
import EventBus from '../services/Events/EventBus.js';

class BaseController {
    constructor(title) {
        this._title = title;
        this._unsubscribeArr = [];
    }

    // У вьюхи должны быть методы bind, unbind, html и геттер state
    execute(view) {
        this._view = view;
        document.body.innerHTML = this._view.html();
        this._view.bind();
        this.startCatchEvents();
    }

    stop() {
        if (this._view === undefined) {
            return;
        }
        this.stopCatchEvents();
        this._view.unbind();
        this._view = void 0;
    }

    startCatchEvents() {
        /* Redefine it to subscribe all events you need */
        void 0;
    }

    subscribe(events, callback) {
        this._unsubscribeArr.push(EventBus.subscribe(events, callback));
    }

    stopCatchEvents() {
        for (const unsubscribe of this._unsubscribeArr) {
            unsubscribe();
        }
    }

    get title() {
        return this._title;
    }
}

export default BaseController;
