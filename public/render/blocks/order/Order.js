import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import PlaceTimeCard from '../PlaceTimeCard/PlaceTimeCard.js';
import Basket from '../basket/Basket.js';
import Mocks from '../../../mocks.js';

export default class Order extends Component {
    constructor({profile = {src: '/static/profile.png', href: '/login'},
                    products, classes = 'order'}) {
        super();
        this.addClasses(classes);
        this.addContextData({
            title: 'My Order',
            total: products.reduce(
                (accumulate, current) => accumulate + current.cost * current.quantity, 0
            ),
            profileButton: new ImageHref({
                classes: 'order__profile-href',
                imageClasses: 'order__profile-image',
                src: profile.src,
                href: profile.href,
            }),
            placeTimeCard: new PlaceTimeCard({
                classes: 'order__place-time-card',
            }),
            basket: new Basket({
                classes: 'order__basket',
                products
            }),
        });
    }
}
