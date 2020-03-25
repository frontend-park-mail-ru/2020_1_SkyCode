import Component from '../../Component.js';
import imageHref from '../imageHref/imageHref.js';

export default class order extends Component {
    constructor({profile = {src: '/static/profile.png', href: 'login'},
                    restaurant, basket, classes = 'order'}) {
        super();
        this.addClasses(classes);
        this.addTemplateData({
            profileButton: new imageHref({
                classes: 'order__profile-href',
                imageClasses: 'order__profile-image',
                src: profile.src,
                href: profile.href,
            }),
        }, true);
    }
}