import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import PlaceTimeCard from '../restaurantInput/PlaceTimeCard.js';


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
            // placeTimeCard: new PlaceTimeCard({
            //     classes: 'order__place-time-card',
            //     restaurant,
            // })
        });
    }
}
