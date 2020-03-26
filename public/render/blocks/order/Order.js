import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';

export default class Order extends Component {
    constructor({profile = {src: '/static/profile.png', href: 'login'},
                    restaurant, basket, classes = 'order'}) {
        super();
        this.addClasses(classes);
        this.addContextData({
            profileButton: new ImageHref({
                classes: 'order__profile-href',
                imageClasses: 'order__profile-image',
                src: profile.src,
                href: profile.href,
            }),
        }, true);
    }
}
