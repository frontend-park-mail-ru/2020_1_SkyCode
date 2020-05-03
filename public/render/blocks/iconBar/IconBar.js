import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import Img from '../../elements/img/Img.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './IconBar.hbs';


export default class IconBar extends Component {
    constructor({classes = 'iconed-header__icon-bar', Icons = [
        new ImageHref({
            classes: 'icon-bar-profile-href icon',
            imageClasses: 'icon-bar__profile-image',
            src: '/static/profile.png',
            href: '/login',
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
        new ImageHref({
            classes: 'icon map-href',
            src: '/static/map-pin.svg',
            href: '/map',
            imageClasses: 'icon-bar__map-image',
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
}
