import Component from '../../Component.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './WavingMenue.hbs';
import Href from '../../elements/href/Href';
import UserController from '../../../controllers/UserController';

export default class WavingMenue extends Component {
    constructor({classes} = {}) {
        classes = classes || 'waving-menue';
        super(classes);
        const userHrefs = [];

        userHrefs.push(new Href({
            classes: 'waving-menue__href',
            text: 'Профиль',
            href: '/me',
        }));

        userHrefs.push(new Href({
            classes: 'waving-menue__href',
            text: 'Поддержка',
            href: '/support',
        }));

        userHrefs.push(new Href({
            classes: 'waving-menue__href',
            text: 'Карта',
            href: '/map',
        }));

        userHrefs.push(new Href({
            classes: 'waving-menue__href',
            text: 'История заказов',
            href: '/orders',
        }));
        this.addContextData({userHrefs});

        if (UserController.logined && UserController.User.role === 'Admin') {
            const adminHrefs = [];

            adminHrefs.push(new Href({
                classes: 'waving-menue__href',
                text: 'Управление ресторанами',
                href: '/admin/restaurants',
            }));

            this.addContextData({adminHrefs});
        }

        if (UserController.logined && UserController.User.role === 'Support') {
            const supportHrefs = [];

            supportHrefs.push(new Href({
                classes: 'waving-menue__href',
                text: 'Список чатов',
                href: '/support/chats',
            }));

            this.addContextData({supportHrefs});
        }

        this.isVisible = false;
        super.template = template;
    }

    bind() {
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
