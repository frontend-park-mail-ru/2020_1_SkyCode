'use strict';

import EventBus from '../services/Events/EventBus.js';
import MainController from '../controllers/MainController.js';

class Router {
    _currentController;

    constructor() {
        this._pages = [];
        this._registerAllPages();
        EventBus.subscribe('set-page', (this._goto).bind(this));
        window.onpopstate = (this._handlePopState).bind(this);
    }

    _handlePopState(event) {
        // Невозможно сохранить актуальное состояние прошлой страницы, т.к. запись прошлой истории недоступна
        // Мы даже не знаем, было ли нажато hist.front() или hist.back(), чтобы при помощи обратных команд
        // выйти на нужные записи, изменить их и вернуться на текущую
        event.preventDefault();
        this._currentController.hide();
        this._currentController = this._retrievePage(document.location) || Page404;
        this._currentController.show(document.location, event.state);
    }

    _goto({url}) {
        let state = {};

        if (this._currentController) {
            state = this._currentController.state;
            this._savePageStateInHistory(this._currentController);
            this._currentController.hide();
        }

        this._currentController = this._retrievePage(url) || Page404;
        this._setNewHistoryRecord(this._currentController, url);
        this._currentController.show(url, state);
    }

    _savePageStateInHistory(page) {
        history.replaceState(page.state, page.title); // url the same
    }

    _setNewHistoryRecord(page, url) {
        history.pushState(page.state, page.title, url);
    }

    _registerAllPages() {
        this._registerPage(MainController, '/');
    }

    _registerPage(controller, path) {
        this._pages.push({
            pattern: new RegExp('^' + path.replace(/:\w+/, '(\w+)') + '$'),
            page: controller,
        });
    }

    _retrievePage(url) {
        for (const pg of this._pages) {
            if (url.match(pg.pattern)) {
                return pg.page;
            }
        }
    }
}


export default new Router();
