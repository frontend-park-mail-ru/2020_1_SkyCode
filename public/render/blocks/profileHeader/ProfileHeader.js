import IconedHeader from '../iconedHeader/IconedHeader';
import IconBar from '../iconBar/IconBar';
import Img from '../../elements/img/Img';
import EventBus from '../../../services/Events/EventBus';
import ImageHref from '../imageHref/ImageHref';
import Events from '../../../services/Events/Events';


export default class ProfileHeader extends IconedHeader {
    constructor({classes}) {
        super({classes,
            Icons: new IconBar({
                classes: 'iconed-header__icon-bar',
                Icons: [
                    new Img({
                        classes: 'icon-bar__logout-image icon',
                        id: 'icon-bar__logout',
                        src: '/static/sign-out.svg',
                        callback: () => {
                            EventBus.broadcast(Events.logout);
                        },
                    }),
                    new ImageHref({
                        classes: 'order__support-href icon',
                        src: '/static/support.svg',
                        imageClasses: 'icon-bar__support-image',
                        href: '/support',
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
                ],
            }),
        });
    }
}
