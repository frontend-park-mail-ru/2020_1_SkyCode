'use strict';

import EventBus from '../services/Events/EventBus.js';
import MainController from '../controllers/MainController.js';
import Controller404 from '../controllers/Controller404.js';
import ProfileController from '../controllers/ProfileController.js';
import RestaurantController from '../controllers/RestaurantController.js';
import CheckoutController from '../controllers/CheckoutController.js';
import AddProductByRestaurantController from '../controllers/AddProductByRestaurantController.js';
import BasketController from '../controllers/BasketController.js';
import OrderHistoryController from '../controllers/OrderHistoryController';
import AddRestaurantController from '../controllers/AddRestaurantController.js';
import RestaurantInfoController from '../controllers/RestaurantInfoController.js';
import SupportChatController from '../controllers/SupportChatController.js';
import AdminChatListController from '../controllers/AdminChatListController';
import MapController from '../controllers/MapController.js';
import LocationController from '../controllers/LocationController.js';
import AdminRestaurantListController from '../controllers/AdminRestaurantListController.js';
import AddRestaurantPointController from '../controllers/AddRestaurantPointController';
import UserController from '../controllers/UserController';
import LoginPopup from '../render/blocks/LoginPopup/LoginPopup';
import Events from '../services/Events/Events';
import SignupPopup from '../render/blocks/SignupPopup/SignupPopup';

class Router {
    constructor() {
        this.loginNeededRecord = null;
        this.loginNeededMatchData = null;
        this._currentController = undefined;
        this._pages = [];
        this._registerAllPages();
        this._initAdditionalControllers();
        this._initConstantSidebars();
        EventBus.subscribe(Events.setPage, (this._goto).bind(this));
        EventBus.subscribe(Events.redirect, (this._redirect).bind(this));
        EventBus.subscribe(Events.successLogin, this._successLoginSetPage.bind(this));
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
        UserController.startCatchEvents();
    }

    _initConstantSidebars() {
        const loginPopup = new LoginPopup();
        document.getElementById('login').innerHTML = loginPopup.toString();
        loginPopup.bind();
        loginPopup.disappear();

        const signupPopup = new SignupPopup();
        document.getElementById('signup').innerHTML = signupPopup.toString();
        signupPopup.bind();
        signupPopup.disappear();
    }

    _redirect({url}) {
        console.log('redirect + ' + url);
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
        let matchData;
        let pageRecord;

        // eslint-disable-next-line prefer-const
        [pageRecord, matchData] = this._matchUrl(url)
            || [Controller404];

        if (pageRecord.needLogin) {
            if (!UserController.logined) {
                pageRecord.url = url;
                this.loginNeededRecord = pageRecord;
                this.loginNeededMatchData = matchData;
                EventBus.publish(Events.loginRequest, {
                    isStatic: this._currentController === undefined,
                });
                return;
            }
        }

        if (this._currentController) {
            this._currentController.stop();
        }
        this._currentController = pageRecord.page;
        this._setNewHistoryRecord(this._currentController, url);
        this._currentController.execute(matchData);
    }

    _successLoginSetPage() {
        if (this._currentController) {
            this._currentController.stop();
        }
        this._currentController = this.loginNeededRecord.page;
        this._setNewHistoryRecord(this._currentController, this.loginNeededRecord.url);
        this._currentController.execute(this.loginNeededMatchData);
    }

    _setNewHistoryRecord(page, url) {
        history.pushState({}, page.title, url);
    }

    _registerAllPages() {
        this._registerPage(MainController,                      '/');
        this._registerPage(ProfileController,                   '/me', true);
        this._registerPage(AddRestaurantController,             '/admin/restaurants/add', true);
        this._registerPage(RestaurantController,                '/restaurants/:int');
        this._registerPage(CheckoutController,                  '/checkout', true);
        this._registerPage(AddProductByRestaurantController,    '/admin/restaurants/:int/add', true);
        this._registerPage(RestaurantInfoController,            '/restaurants/:int/info');
        this._registerPage(OrderHistoryController,              '/orders', true);
        this._registerPage(SupportChatController,               '/support');
        this._registerPage(AdminChatListController,             '/admin/chats', true);
        this._registerPage(SupportChatController,               '/admin/chats/:hash');
        this._registerPage(MapController,                       '/map', true);
        this._registerPage(LocationController,                  '/location');
        this._registerPage(AdminRestaurantListController,       '/admin/restaurants', true);
        this._registerPage(AddRestaurantPointController,        '/admin/restaurants/:id', true);
    }

    _registerPage(controller, path, needLogin = false) {
        this._pages.push({
            pattern: new RegExp('^' + path.replace(/:\w+/, '([\\w-]+)') + '$'),
            page: controller,
            needLogin,
        });
    }

    _matchUrl(url) {
        for (const pg of this._pages) {
            const matchData = url.match(pg.pattern);

            if (matchData) {
                return [pg, matchData.slice(1)];
            }
        }
    }
}


export default new Router();
