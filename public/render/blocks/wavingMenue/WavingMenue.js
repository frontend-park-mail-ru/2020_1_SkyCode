import Component from '../../Component.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './WavingMenue.hbs';
import Href from '../../elements/href/Href';
import UserController from '../../../controllers/UserController';
import Events from '../../../services/Events/Events';

export default class WavingMenue extends Component {
    constructor({classes} = {}) {
        classes = classes || 'waving-menue';
        super(classes);
        this.initHrefs();
        this.isVisible = false;
        super.template = template;
        setTimeout(this.tryReboot.bind(this), 500);
    }

    initHrefs() {
        const userHrefs = [];

        userHrefs.push(new Href({
            id: 'waving-menue__profile-href',
            classes: 'waving-menue__href',
            text: 'Профиль',
            href: '/me',
        }));

        userHrefs.push(new Href({
            id: 'waving-menue__support-href',
            classes: 'waving-menue__href',
            text: 'Поддержка',
            href: '/support',
        }));

        userHrefs.push(new Href({
            id: 'waving-menue__map-href',
            classes: 'waving-menue__href',
            text: 'Карта',
            href: '/map',
        }));

        userHrefs.push(new Href({
            id: 'waving-menue__history-href',
            classes: 'waving-menue__href',
            text: 'История заказов',
            href: '/orders',
        }));
        this.addContextData({userHrefs});

        if (UserController.logined && UserController.User.role === 'Admin') {
            const restManagementHrefs = [];

            restManagementHrefs.push(new Href({
                id: 'waving-menue__rest-href',
                classes: 'waving-menue__href',
                text: 'Управление ресторанами',
                href: '/admin/restaurants',
            }));

            this.addContextData({
                restManagementHrefs,
            });
        }

        if (UserController.logined && UserController.User.role === 'Support') {
            const supportHrefs = [];

            supportHrefs.push(new Href({
                id: 'waving-menue__chats-href',
                classes: 'waving-menue__href',
                text: 'Список чатов',
                href: '/support/chats',
            }));

            this.addContextData({supportHrefs});
        }
    }

    tryReboot() {
        if (UserController.logined) {
            this.unbind();
            this.initHrefs();
            this.domElement.outerHTML = this.toString();
            this.bind();
        }
    }

    bind() {
        EventBus.subscribe(Events.setPage, () => {
            this.disappear();
        });
        EventBus.subscribe(Events.successLogin, () => {
            this.tryReboot();
        });
        EventBus.subscribe(Events.successSignup, () => {
            this.tryReboot();
        });
        EventBus.subscribe(Events.successLogout, () => {
            this.tryReboot();
        });
        EventBus.subscribe('hamburger-button-clicked', () => {
            if (this.isVisible) {
                this.disappear();
            } else {
                this.appear();
            }
        });

        document.body.getElementsByClassName('waving-menue__hider')[0]
            .onclick = (e) => {
                e.preventDefault();
            };

        super.bind();
    }

    unbind() {
        EventBus.unsubscribe(Events.setPage, () => {
            this.disappear();
        });
        EventBus.unsubscribe(Events.successLogin, () => {
            this.tryReboot();
        });
        EventBus.unsubscribe(Events.successSignup, () => {
            this.tryReboot();
        });
        EventBus.unsubscribe(Events.successLogout, () => {
            this.tryReboot();
        });
        EventBus.unsubscribe('hamburger-button-clicked', () => {
            if (this.isVisible) {
                this.disappear();
            } else {
                this.appear();
            }
        });

        document.body.getElementsByClassName('waving-menue__hider')[0]
            .onclick = null;

        super.unbind();
    }

    appear() {
        if (!this.isVisible) {
            document.body.getElementsByClassName('waving-menue__hider')[0]
                .style.display = 'block';
            this.domElement.style.display = 'block';

            setTimeout(() => {
                document.body.getElementsByClassName('waving-menue__hider')[0]
                    .style.opacity = '1';
                this.domElement.style.opacity = '1';
                this.isVisible = true;
            }, 100);
        }
    }

    disappear() {
        if (this.isVisible) {
            document.body.getElementsByClassName('waving-menue__hider')[0]
                .style.opacity = '0';
            this.domElement.style.opacity = '0';

            setTimeout(() => {
                document.body.getElementsByClassName('waving-menue__hider')[0]
                    .style.display = 'none';
                this.domElement.style.display = 'none';
                this.isVisible = false;
            }, 500);
        }
    }
}
