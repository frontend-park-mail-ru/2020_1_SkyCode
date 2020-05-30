import Component from '../../Component.js';
import Img from '../../elements/img/Img.js';
import template from './restaurantBanner.hbs';

export default class restaurantBanner extends Component {
    constructor({classes, imgHref, name, rate}) {
        const strRate = rate === 0 ? '⭐' : '⭐'.repeat(Math.round(Number(rate)));
        super(classes, {
            imgHref,
            name,
            rateImg: new Img({
                classes: 'restaurant__rate-img',
                src: 'static/star.svg',
                alt: 'cat\'t ;load star image',
            }),
            rate: strRate,
        });

        super.template = template;
    }
}
