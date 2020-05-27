import Component from '../../Component.js';
import template from './ActionBar.hbs';
import Button from '../../elements/button/Button.js';

export default class ActionBar extends Component {
    constructor({classes = 'action-bar', actionArr}) {
        super(classes);
        this.addContextData({
            LeftButton: new Button({
                classes: [
                    'scroll-bar__button',
                    'action-bar__left-button',
                ],
                id: 'action-bar__left-button',
                text: '<',
                callback: this.scroll(-1),
            }),
            RightButton: new Button({
                classes: [
                    'scroll-bar__button',
                    'action-bar__right-button',
                ],
                id: 'action-bar__right-button',
                text: '>',
                callback: this.scroll(1),
            }),
        });
        super.template = template;
        const actions = [];

        for (const actionData of actionArr) {
            actions.push({
                src: actionData.src,
                alt: actionData.alt,
            });
        }

        this.addContextData({actions}, true);
    }

    scroll(multiplier) {
        return function() {
            const list = document.getElementsByClassName('action-bar__list')[0];
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
