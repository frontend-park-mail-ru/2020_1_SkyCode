import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import PlaceTimeCard from '../PlaceTimeCard/PlaceTimeCard.js';
import Basket from '../basket/Basket.js';

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
            title: 'My Order',
            placeTimeCard: new PlaceTimeCard({
                classes: 'order__place-time-card',
            }),
            basket: new Basket({
                classes: 'order__basket',
                products: [{
                    imageHref: 'static/basket/BBQBurger.jpg',
                    quantity: 1,
                    name: 'BBQ Burger',
                    cost: 339,
                }, {
                    imageHref: 'static/basket/FrenchFries.jpg',
                    quantity: 2,
                    name: 'French fries',
                    cost: 139,
                }, {
                    imageHref: 'static/basket/CocaCola.jpg',
                    quantity: 1,
                    name: 'Coca-cola',
                    cost: 99,
                }],
            }),
        });
    }
}
