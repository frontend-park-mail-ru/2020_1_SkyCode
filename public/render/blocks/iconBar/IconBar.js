import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import Img from '../../elements/img/Img.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './IconBar.hbs';
import Events from '../../../services/Events/Events';
import Point from '../../elements/point/Point';
import BasketController from '../../../controllers/BasketController';


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
                EventBus.broadcast('order-button-clicked');
            },
        }),
        new Img({
            id: 'notif-icon',
            classes: 'icon notif-href',
            src: '/static/notif.svg',
            imageClasses: 'icon-bar__map-image',
            callback: () => {
                EventBus.broadcast(Events.notifRequest);
            },
        }),
        new ImageHref({
            id: 'order-href',
            src: '/static/order_history.svg',
            classes: 'icon order-href',
            imageClasses: 'icon-bar__support-image',
            href: '/orders',
        }),
    ]} = {}) {
        super(classes, {
            Icons,
            BasketPoint: new Point({
                id: 'basket-point',
                classes: 'basket-point',
                color: 'red',
            }),
            NotifPoint: new Point({
                id: 'notif-point',
                classes: 'notif-point',
                color: 'orange',
            }),
        });

        super.template = template;
    }

    bind() {
        this.addUnbind(
            EventBus.subscribe(Events.addProduct, () => {
                if (document.getElementsByClassName('order')[0].style.display === 'none') {
                    this.context.BasketPoint.domElement.style.display = 'block';
                }
            }),
        );
        this.addUnbind(
            EventBus.subscribe(Events.updateBasket, () => {
                if (BasketController.isEmpty()) {
                    this.context.BasketPoint.domElement.style.display = 'none';
                }
            }),
        );
        this.addUnbind(
            EventBus.subscribe(Events.notifReceived, () => {
                if (document.getElementById('notif-popup').style.display === 'none') {
                    this.context.NotifPoint.domElement.style.display = 'block';
                }
            }),
        );
        this.addUnbind(
            EventBus.subscribe(Events.notifRequest, () => {
                this.context.NotifPoint.domElement.style.display = 'none';
            }),
        );
        this.addUnbind(
            EventBus.subscribe('order-button-clicked', () => {
                this.context.BasketPoint.domElement.style.display = 'none';
            }),
        );
        super.bind();
    }
}
