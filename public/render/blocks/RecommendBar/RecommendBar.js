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

        for (const restaurant of recommendArr) {
            recommends.push(new Restaurant({
                classes: `restaurant-list__restaurant-${restaurant.id}`,
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

    bind() {
        const list = document.getElementsByClassName('recommend-bar__list')[0];
        const minScrollLeft = 0;
        const leftButton = this.context.LeftButton.domElement;
        const rightButton = this.context.RightButton.domElement;

        let hasTimer = false;
        list.onscroll = () => {
            if (hasTimer) {
                return;
            }
            hasTimer = true;

            setTimeout(() => {
                const maxScrollLeft = list.scrollWidth - list.clientWidth;
                const pos = Math.ceil(list.scrollLeft);
                const leftVisibility = pos === minScrollLeft ? 'hidden' : 'visible';
                const rightVisibility = Math.abs(pos - maxScrollLeft) <= 3 ? 'hidden' : 'visible';
                leftButton.style.visibility = leftVisibility;
                rightButton.style.visibility = rightVisibility;
                this.normalize(list);
                hasTimer = false;
            }, 300);
        };
        super.bind();
    }
}
