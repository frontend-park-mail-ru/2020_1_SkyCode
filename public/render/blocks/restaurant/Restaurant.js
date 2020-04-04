import Component from '../../Component.js';
import Img from '../../elements/img/Img.js';


export default class Restaurant extends Component {
    constructor({classes, name, imageHref, rate, avgDeliveryTime, href}) {
        super(classes, {name, rate, href,
            avgDeliveryMinTime: avgDeliveryTime,
            avgDeliveryMaxTime: avgDeliveryTime + 5,
            img: new Img({
                classes: 'restaurant__img',
                src: imageHref,
                alt: 'can\'t load image',
            }),
            rateImg: new Img({
                classes: 'restaurant__rate-img',
                src: 'static/star.svg',
                alt: 'cat\'t ;load star image',
            })});
    }
}