'use strict';

import EventBus from '../services/Events/EventBus.js';
import MainController from '../controllers/MainController.js';
import Controller404 from '../controllers/Controller404.js';
import ProfileController from '../controllers/ProfileController.js';
import RestaurantController from '../controllers/RestaurantController.js';
import CheckoutController from '../controllers/CheckoutController.js';
import AddProductByRestaurantController
    from '../controllers/AddProductByRestaurantController.js';
import BasketController from '../controllers/BasketController.js';
import OrderHistoryController from '../controllers/OrderHistoryController';
import AddRestaurantController from '../controllers/AddRestaurantController.js';
import RestaurantInfoController
    from '../controllers/RestaurantInfoController.js';
import SupportChatController from '../controllers/SupportChatController.js';
import AdminChatListController from '../controllers/AdminChatListController';
import MapController from '../controllers/MapController.js';
import LocationController from '../controllers/LocationController.js';
import AdminRestaurantListController
    from '../controllers/AdminRestaurantListController.js';
import AddRestaurantPointController
    from '../controllers/AddRestaurantPointController';
import UserController from '../controllers/UserController';
import LoginPopup from '../render/blocks/LoginPopup/LoginPopup';
import Events from '../services/Events/Events';
import SignupPopup from '../render/blocks/SignupPopup/SignupPopup';
import GeoPopup from '../render/blocks/GeoPopup/GeoPopup';
import ChangeRestTagsView
    from '../render/views/ChangeRestTagsView/ChangeRestTagsView';
import ChangeRestTagsController from '../controllers/ChangeRestTagsController';

class Router {
    constructor() {
        this.deferredRecord = null;
        this.deferredMatchData = null;
        this._currentController = null;
        this._pages = [];
        this._registerAllPages();
        this._initAdditionalControllers();
        this._initConstantSidebars();
        EventBus.subscribe(Events.setPage, (this._goto).bind(this));
        EventBus.subscribe(Events.redirect, (this._redirect).bind(this));
        EventBus.subscribe(Events.logPopDisappear, this._cleanDeferredRecords.bind(this));
        EventBus.subscribe(Events.signPopDisappear, this._cleanDeferredRecords.bind(this));
        // EventBus.subscribe(Events.geoPopDisappear, this._cleanDeferredRecords.bind(this));
        EventBus.subscribe(Events.successLogin, this._executeDeferredPage.bind(this));
        EventBus.subscribe(Events.successSignup, this._executeDeferredPage.bind(this));
        EventBus.subscribe(Events.successGeo, this._executeDeferredPage.bind(this));
        window.onpopstate = (this._handlePopState).bind(this);
    }

    _handlePopState(event) {
        event.preventDefault();
        if (this._currentController) {
            this._currentController.stop();
        }

        let matchData, pageRecord;
        [pageRecord, matchData] = this._matchUrl(window.location.pathname)
            || [Controller404];
        this._currentController = pageRecord.page;
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

        const geoPopup = new GeoPopup();
        document.getElementById('geo').innerHTML = geoPopup.toString();
        geoPopup.bind();
        geoPopup.disappear();
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
            if (pageRecord.needAdmin && UserController.logined
                && UserController.User.role !== 'Admin') {
                if (this._currentController === null) {
                    this.deferredRecord = pageRecord;
                    this.deferredMatchData = matchData;
                    sessionStorage.message = 'Недостаточно прав для перехода'
                        + ' по данному url';
                    EventBus.publish(Events.setPage, {url: '/'});
                }
                return;
            }

            if (pageRecord.needSupport && UserController.logined
                && UserController.User.role !== 'Support') {
                if (this._currentController === null) {
                    this.deferredRecord = pageRecord;
                    this.deferredMatchData = matchData;
                    sessionStorage.message = 'Недостаточно прав для перехода'
                        + ' по данному url';
                    EventBus.publish(Events.setPage, {url: '/'});
                }
                return;
            }

            if (!UserController.logined) {
                pageRecord.url = url;
                this.deferredRecord = pageRecord;
                this.deferredMatchData = matchData;
                EventBus.publish(Events.loginRequest, {
                    isStatic: this._currentController === null,
                });
                return;
            }
        }

        if (pageRecord.needGeo) {
            if (localStorage.getItem('deliveryGeo') === null) {
                pageRecord.url = url;
                this.deferredRecord = pageRecord;
                this.deferredMatchData = matchData;
                EventBus.publish(Events.geoRequest, {
                    isStatic: this._currentController === null,
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

    _cleanDeferredRecords() {
        this.deferredRecord = null;
        this.deferredMatchData = null;
    }


    _executeDeferredPage() {
        if (this.deferredRecord === null) {
            return;
        }

        if (this._currentController) {
            this._currentController.stop();
        }
        this._currentController = this.deferredRecord.page;
        this._setNewHistoryRecord(this._currentController, this.deferredRecord.url);
        this._currentController.execute(this.deferredMatchData);
    }

    _setNewHistoryRecord(page, url) {
        history.pushState({}, page.title, url);
    }

    _registerAllPages() {
        this._registerPage(MainController, '/', {needGeo: true});
        this._registerPage(ProfileController, '/me', {needLogin: true});
        this._registerPage(RestaurantController, '/restaurants/:int');
        this._registerPage(CheckoutController, '/checkout', {needLogin: true});
        this._registerPage(RestaurantInfoController, '/restaurants/:int/info');
        this._registerPage(OrderHistoryController, '/orders', {needLogin: true});
        this._registerPage(SupportChatController, '/support');
        this._registerPage(MapController, '/map');
        this._registerPage(LocationController, '/location');
        this._registerPage(ChangeRestTagsController, '/admin/restaurants/:id/change/tags', {needAdmin: true});
        this._registerPage(AddRestaurantController, '/admin/restaurants/add', {needAdmin: true});
        this._registerPage(AddProductByRestaurantController, '/admin/restaurants/:int/add', {needAdmin: true});
        this._registerPage(AdminChatListController, '/support/chats', {needSupport: true});
        this._registerPage(SupportChatController, '/admin/chats/:hash', {needAdmin: true});
        this._registerPage(AdminRestaurantListController, '/admin/restaurants', {needAdmin: true});
        this._registerPage(AddRestaurantPointController, '/admin/restaurants/:id/add/point', {needAdmin: true});
    }

    _registerPage(controller, path, {
        needAdmin = false,
        needSupport = false,
        needLogin = needAdmin || needSupport,
        needGeo = false,
    } = {}) {
        this._pages.push({
            pattern: new RegExp('^' + path.replace(/:\w+/, '([\\w-]+)') + '$'),
            page: controller,
            needSupport,
            needLogin,
            needAdmin,
            needGeo,
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
