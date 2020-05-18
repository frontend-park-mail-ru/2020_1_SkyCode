'use strict';

class BaseController {
    constructor(title = 'untitled') {
        this._title = title;
    }

    // У вьюхи должны быть методы bind, unbind, html
    execute(view) {
        this._view = view;
        document.getElementById('view').innerHTML = this._view.toString();
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

    get title() {
        return this._title;
    }
}

export default BaseController;
