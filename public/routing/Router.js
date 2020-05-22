'use strict';

import EventBus from '../services/Events/EventBus.js';
import MainController from '../controllers/MainController.js';
import Controller404 from '../controllers/Controller404.js';
import ProfileController from '../controllers/ProfileController.js';
import RestaurantController from '../controllers/RestaurantController.js';
import CheckoutController from '../controllers/CheckoutController.js';
import AddProductByRestaurantController
    from '../controllers/AddProductController.js';
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
import ChangeRestTagsController from '../controllers/ChangeRestTagsController';
import AdminOrderController from '../controllers/AdminOrderController';
import NotificationPopup
    from '../render/blocks/NotificationPopup/NotificationPopup';
import IconedHeader from '../render/blocks/iconedHeader/IconedHeader';
import WavingMenue from '../render/blocks/wavingMenue/WavingMenue';

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
        document.getElementById('login').outerHTML = loginPopup.toString();
        loginPopup.bind();
        loginPopup.disappear();

        const signupPopup = new SignupPopup();
        document.getElementById('signup').outerHTML = signupPopup.toString();
        signupPopup.bind();
        signupPopup.disappear();

        const geoPopup = new GeoPopup();
        document.getElementById('geo').outerHTML = geoPopup.toString();
        geoPopup.bind();
        geoPopup.disappear();

        const notifPopup = new NotificationPopup();
        document.getElementById('notif').outerHTML = notifPopup.toString();
        notifPopup.bind();
        notifPopup.disappear();
        notifPopup.startWebsocket();

        const wavingMenue = new WavingMenue();
        document.getElementById('waving-menue').outerHTML = wavingMenue.toString();
        wavingMenue.bind();

        const iconedHeader = new IconedHeader();
        document.getElementById('header').outerHTML = iconedHeader.toString();
        iconedHeader.bind();
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

    _goto({url}, withHistRecords = true) {
        let matchData;
        let pageRecord;

        // eslint-disable-next-line prefer-const
        [pageRecord, matchData] = this._matchUrl(url)
            || [Controller404];

        if (pageRecord.needLogin) {
            if (pageRecord.needAdmin && UserController.logined
                && UserController.User.role !== 'Admin') {
                sessionStorage.message = 'Недостаточно прав для перехода'
                + ' по данному url';
                if (this._currentController === null) {
                    EventBus.publish(Events.setPage, {url: '/'});
                } else {
                    this.reload();
                }
                return;
            }

            if (pageRecord.needSupport && UserController.logined
                && UserController.User.role !== 'Support') {
                sessionStorage.message = 'Недостаточно прав для перехода'
                + ' по данному url';
                if (this._currentController === null) {
                    EventBus.publish(Events.setPage, {url: '/'});
                } else {
                    this.reload();
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
        if (withHistRecords) this._setNewHistoryRecord(this._currentController, url);
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
        this._registerPage(MainController, '/', {
            needGeo: true,
            button: 'm',
        });
        this._registerPage(ProfileController, '/me', {
            needLogin: true,
            button: 'p',
        });
        this._registerPage(RestaurantController, '/restaurants/:int');
        this._registerPage(CheckoutController, '/checkout', {
            needLogin: true,
        });
        this._registerPage(RestaurantInfoController, '/restaurants/:int/info');
        this._registerPage(OrderHistoryController, '/orders', {
            needLogin: true,
            button: 'o',
        });
        this._registerPage(SupportChatController, '/support', {
            button: 's',
        });
        this._registerPage(MapController, '/map');
        this._registerPage(LocationController, '/location');
        this._registerPage(ChangeRestTagsController, '/admin/restaurants/:id/tags', {needAdmin: true});
        this._registerPage(AddRestaurantController, '/admin/restaurants/add', {needAdmin: true});
        this._registerPage(AddProductByRestaurantController, '/admin/restaurants/:int/add/product', {needAdmin: true});
        this._registerPage(AdminChatListController, '/support/chats', {
            needSupport: true,
            button: 'c',
        });
        this._registerPage(SupportChatController, '/admin/chats/:hash', {needSupport: true});
        this._registerPage(AdminOrderController, '/admin/restaurants/:id/orders', {needAdmin: true});
        this._registerPage(AdminRestaurantListController, '/admin/restaurants', {
            needAdmin: true,
            button: 'r',
        });
        this._registerPage(AddRestaurantPointController, '/admin/restaurants/:id/add/point', {needAdmin: true});
        this._registerHotKeys();
    }

    _registerHotKeys() {
        const eBus = EventBus;
        const events = Events;

        let keyDownFuncBody = 'if (e.key === \'Escape\')'
            + ' eBus.publish(events.escButPressed);';

        for (const record of this._pages) {
            if (record.button === null) continue;
            keyDownFuncBody += `else if (e.key === '${record.button}' && e.altKey) 
                eBus.publish(events.setPage, {url: '${record.path}'});`;
        }

        eval('document.body.onkeydown = (e) => {' + keyDownFuncBody + '};');
    }

    _registerPage(controller, path, {
        needAdmin = false,
        needSupport = false,
        needLogin = needAdmin || needSupport,
        needGeo = false,
        button = null,
    } = {}) {
        this._pages.push({
            path,
            pattern: new RegExp('^' + path.replace(/:\w+/, '([\\w-]+)') + '$'),
            page: controller,
            needSupport,
            needLogin,
            needAdmin,
            needGeo,
            button,
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

    reload(message = '') {
        sessionStorage.message = message;
        EventBus.publish('reload');
        this._goto({url: window.location.pathname}, false);
    }
}


export default new Router();
