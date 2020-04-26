import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';


export default class CornerIcons extends Component {
    constructor({classes}) {
        super(classes, {
            Profile: new ImageHref({
                classes: 'corner-profile-href',
                imageClasses: 'corner-profile-image',
                src: '/static/profile.png',
                href: '/login',
            }),
            BasketIcon: '<i class="fas fa-shopping-basket"></i>',

        });
    }
}
