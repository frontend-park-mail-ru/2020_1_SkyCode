import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import Img from '../../elements/img/Img.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './IconBar.hbs';
import Events from '../../../services/Events/Events';


export default class IconBar extends Component {
    constructor({classes = 'iconed-header__icon-bar', Icons = [
        new ImageHref({
            classes: 'icon-bar-profile-href icon',
            imageClasses: 'icon-bar__profile-image',
            src: '/static/profile.png',
            href: '/me',
        }),
        new ImageHref({
            classes: 'order__support-href icon',
            src: '/static/support.svg',
            imageClasses: 'icon-bar__support-image',
            href: '/support',
        }),
        new Img({
            classes: 'icon-bar__basket-image icon',
            id: 'icon-bar-basket-href',
            src: '/static/shopping-basket.svg',
            callback: () => {
                EventBus.publish('order-button-clicked');
            },
        }),
        new Img({
            classes: 'icon map-href',
            src: '/static/notif.svg',
            imageClasses: 'icon-bar__map-image',
            callback: () => {
                EventBus.publish(Events.notifRequest);
            },
        }),
        new ImageHref({
            classes: 'icon order-history-href',
            src: '/static/order_history.svg',
            href: '/orders',
            imageClasses: 'icon-bar__history-image',
        }),
    ]} = {}) {
        super(classes, {
            Icons,
        });

        super.template = template;
    }

    bind() {
        let active = false;
        EventBus.subscribe('order-button-clicked', () => {
            if (active) {
                this.domElement.style.background = 'white';
            } else {
                this.domElement.style.background = 'rgba(0, 0, 0, 0)';
            }
            active = !active;
        });
        super.bind();
    }
}
