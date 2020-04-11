'use strict';

import EventBus from '../services/Events/EventBus.js';
import MainController from '../controllers/MainController.js';
import Controller404 from '../controllers/Controller404.js';
import ProfileController from '../controllers/ProfileController.js';
import LoginSignupController from '../controllers/LoginSignupController.js';
import RestaurantController from '../controllers/RestaurantController.js';
import CheckoutController from '../controllers/CheckoutController.js';
import AddProductByRestaurantController from '../controllers/AddProductByRestaurantController.js';
import BasketController from '../controllers/BasketController.js';
import AddRestaurantController from '../controllers/AddRestaurantController.js';


class Router {
    constructor() {
        this._currentController = undefined;
        this._pages = [];
        this._registerAllPages();
        this._initAdditionalControllers();
        EventBus.subscribe('set-page', (this._goto).bind(this));
        EventBus.subscribe('redirect', (this._redirect).bind(this));
        window.onpopstate = (this._handlePopState).bind(this);
    }

    _handlePopState(event) {
        event.preventDefault();
        if (this._currentController) {
            this._currentController.stop();
        }

        let matchData;
        [this._currentController, matchData] = this._matchUrl(window.location.pathname)
            || [Controller404];
        this._currentController.execute(matchData);
    }

    _initAdditionalControllers() {
        BasketController.startCatchEvents();
    }

    _redirect({url}) {
        if (this._currentController) {
            this._currentController.stop();
        }

        let matchData;
        [this._currentController, matchData] = this._matchUrl(url)
            || [Controller404];
        history.replaceState(
            this._currentController.state,
            this._currentController.title,
            url,
        );

        this._currentController.execute(matchData);
    }

    _goto({url}) {
        if (this._currentController) {
            this._currentController.stop();
        }

        let matchData;
        [this._currentController, matchData] = this._matchUrl(url)
            || [Controller404];
        this._setNewHistoryRecord(this._currentController, url);
        this._currentController.execute(matchData);
    }

    _setNewHistoryRecord(page, url) {
        history.pushState({}, page.title, url);
    }

    _registerAllPages() {
        this._registerPage(MainController,                      '/');
        this._registerPage(ProfileController,                   '/me');
        this._registerPage(LoginSignupController,               '/login');
        this._registerPage(LoginSignupController,               '/signup');
        this._registerPage(AddRestaurantController,                  '/restaurants/add');
        this._registerPage(RestaurantController,                '/restaurants/:int');
        this._registerPage(CheckoutController,                  '/checkout');
        this._registerPage(AddProductByRestaurantController,    '/restaurants/:int/add');
    }

    _registerPage(controller, path) {
        this._pages.push({
            pattern: new RegExp('^' + path.replace(/:\w+/, '(\\w+)') + '$'),
            page: controller,
        });
    }

    _matchUrl(url) {
        for (const pg of this._pages) {
            const matchData = url.match(pg.pattern);

            if (matchData) {
                return [pg.page, matchData.slice(1)];
            }
        }
    }
}


export default new Router();
