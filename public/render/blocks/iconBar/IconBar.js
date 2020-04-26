import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import Img from '../../elements/img/Img.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './IconBar.hbs';


export default class IconBar extends Component {
    constructor({classes}) {
        super(classes, {
            Profile: new ImageHref({
                classes: 'icon-bar-profile-href',
                imageClasses: 'icon-bar-profile-image',
                src: '/static/profile.png',
                href: '/login',
            }),
            Support: new ImageHref({
                classes: 'order__support-href',
                src: '/static/support.svg',
                imageClasses: 'icon-bar-support-image',
                href: '/support',
                needNewWindow: true,
            }),
            Basket: new Img({
                classes: 'icon-bar-basket-image',
                id: 'icon-bar-basket-href',
                src: '/static/shopping-basket.svg',
                callback: () => {
                    EventBus.publish('open-basket-button-clicked');
                },
            }),
        });
        super.template = template;
    }
}
