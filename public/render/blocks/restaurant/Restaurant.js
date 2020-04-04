import Component from '../../Component.js';
import Img from '../../elements/img/Img.js';
import EventBus from '../../../services/Events/EventBus.js';


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

    bind() {
        let me = super.domElement;
        if (me === undefined) {
            console.trace('cat\' ret myself from DOM');
            return;
        }

        me.onclick = function (event) {
            event.preventDefault();
            console.log('href ' + this.href + ' clicked');
            EventBus.publish('set-page', {url: this.context.href});
        }.bind(this);
    }

    unbind() {
        let me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = null;
    }
}