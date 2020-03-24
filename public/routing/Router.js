'use strict';

import EventBus from '../services/EventBus.js';

class Router {
    _currentPage;

    constructor() {
        this._pages = [];
        this._registerAllPages();
        EventBus.listen('set-page', (this._goto).bind(this));
        window.onpopstate = (this._handlePopState).bind(this);
    }

    _handlePopState(event) {
        // Невозможно сохранить актуальное состояние прошлой страницы, т.к. запись прошлой истории недоступна
        // Мы даже не знаем, было ли нажато hist.front() или hist.back(), чтобы при помощи обратных команд
        // выйти на нужные записи, изменить их и вернуться на текущую
        event.preventDefault();
        this._currentPage.hide();
        this._currentPage = this._retreivePage(document.location) || log('unknown url') || Page404;
        this._currentPage.show(document.location, event.state);
    }

    _goto({url}) {
        let state = {};

        if (this._currentPage) {
            state = this._currentPage.state;
            this._savePageStateInHistory(this._currentPage);
            this._currentPage.hide();
        }

        this._currentPage = this._retreivePage(url) || log('unknown url') || Page404;
        this._setNewHistoryRecord(this._currentPage, url);
        this._currentPage.show(url, state);
    }

    _savePageStateInHistory(page) {
        history.replaceState(page.state, page.title); // url the same
    }

    _setNewHistoryRecord(page, url) {
        history.pushState(page.state, page.title, url);
    }

    _registerAllPages() {
        this._registerPage(MainPage, url);
    }

    _registerPage(page, url) {
        this._pages.push({
            // будут использоваться только целочисленные части url?
            pattern: new RegExp('^' + url.replace(/:\w+/, '(\w+)') + '$'),
            page: page,
        });
    }

    _retreivePage(url) {
        for (const pg of this._pages) {
            if (url.match(pg.pattern)) {
                return pg.page;
            }
        }
    }
}

let log = function (message) {
    let start = '\nRouter:\t';
    console.log(start + message);
};


export default new Router();
