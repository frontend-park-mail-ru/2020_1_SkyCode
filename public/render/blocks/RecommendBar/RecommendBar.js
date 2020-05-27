import Component from '../../Component.js';
import template from './RecommendBar.hbs';
import Button from '../../elements/button/Button.js';
import Restaurant from '../restaurant/Restaurant';

export default class RecommendBar extends Component {
    constructor({classes = 'recommend-bar', recommendArr}) {
        super(classes);
        this.addContextData({
            LeftButton: new Button({
                classes: [
                    'scroll-bar__button',
                    'action-bar__left-button',
                ],
                id: 'recommend-bar__left-button',
                text: '<',
                callback: this.scroll(-1),
            }),
            RightButton: new Button({
                classes: [
                    'scroll-bar__button',
                    'action-bar__right-button',
                ],
                id: 'recommend-bar__right-button',
                text: '>',
                callback: this.scroll(1),
            }),
        });
        super.template = template;
        const recommends = [];
        if (!recommendArr) recommendArr = [];

        for (const restaurant of recommendArr) {
            recommends.push(new Restaurant({
                classes: 'recommend-bar__restaurant',
                name: restaurant.name,
                avgDeliveryTime: 30,
                rate: restaurant.rating,
                imageHref: `/images/${restaurant.image}`,
                href: `/restaurants/${restaurant.id}`,
            }));
        }

        this.addContextData({recommends}, true);
    }

    scroll(multiplier) {
        return function() {
            const list = document.getElementsByClassName('recommend-bar__list')[0];
            const child = list.firstElementChild;
            const marginRight = 35;
            // eslint-disable-next-line no-mixed-operators,
            const fraction = (child.width + 2 * marginRight);
            list.scrollLeft += multiplier * fraction;
        }.bind(this);
    }

    normalize(list) {
        const child = list.firstElementChild;
        const marginRight = 35;
        const fraction = (child.width + 2 * marginRight);
        const div = Math.round(list.scrollLeft / fraction);
        list.scrollLeft = div * fraction;
    }
}
