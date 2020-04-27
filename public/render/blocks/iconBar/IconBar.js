import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import Img from '../../elements/img/Img.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './IconBar.hbs';


export default class IconBar extends Component {
    constructor({classes}) {
        super(classes, {
            Profile: new ImageHref({
                classes: 'icon-bar-profile-href icon',
                imageClasses: 'icon-bar-profile-image',
                src: '/static/profile.png',
                href: '/login',
            }),
            Support: new ImageHref({
                classes: 'order__support-href icon',
                src: '/static/support.svg',
                imageClasses: 'icon-bar-support-image',
                href: '/support',
            }),
            Basket: new Img({
                classes: 'icon-bar-basket-image icon',
                id: 'icon-bar-basket-href',
                src: '/static/shopping-basket.svg',
                callback: () => {
                    EventBus.publish('order-button-clicked');
                },
            }),
            Map: new ImageHref({
                classes: 'icon map-href',
                src: '/static/map-pin.svg',
                href: '/map',
                imageClasses: 'map-image',
            }),
        });
        super.template = template;
    }
}
