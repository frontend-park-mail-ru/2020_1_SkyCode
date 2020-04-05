'use strict';

class BaseController {
    constructor(title) {
        this._title = title;
    }

    // У вьюхи должны быть методы bind, unbind, html и геттер state
    run(view) {
        this._view = view;
        document.body.innerhtml = this._view.html();
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
        void 0;
    }

    stopCatchEvents() {
        void 0;
    }

    get state() {
        if (this._view === undefined) {
            return undefined;
        }

        return this._view.state;
    }

    get title() {
        return this._title;
    }

    log(message) {
        const start = '\n' + this.constructor.name + ':\t';
        console.log(start + message);
    }
}

export default BaseController;
