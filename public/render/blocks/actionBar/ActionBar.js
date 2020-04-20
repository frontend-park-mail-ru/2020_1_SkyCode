import Component from '../../Component.js';
import Action from '../action/Action.js';
import template from './ActionBar.hbs';
import Button from '../../elements/button/Button';

export default class ActionBar extends Component {
    constructor({classes = 'action-bar', actionArr}) {
        super(classes);
        super.template = template;

        super.addContextData({
            LeftButton: new Button({
                classes: [
                    'scroll-bar__button',
                    'action-bar__left-button',
                ],
                id: 'action-bar__left-button',
                text: '<',
                callback: this.scroll(-190),
                isHidden: true,
            }),
            RightButton: new Button({
                classes: [
                    'scroll-bar__button',
                    'action-bar__right-button',
                ],
                id: 'action-bar__right-button',
                text: '>',
                callback: this.scroll(190),
            }),
        });
        const actions = [];
        for (const actionData of actionArr) {
            actions.push(new Action({
                classes: 'action-bar__action',
                src: actionData.src,
                alt: actionData.alt,
            }));
        }

        this.addContextData({actions}, true);
    }

    scroll(value,
        leftButtonId = 'action-bar__left-button',
        rightButtonId = 'action-bar__right-button') {
        return function() {
            const container = document.getElementsByClassName('action-bar__container')[0];
            container.scrollLeft += value;

            const minScrollLeft = 0;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;

            setTimeout(() => {
                const pos = Math.ceil(container.scrollLeft);
                document.getElementById(leftButtonId).hidden = pos === minScrollLeft;
                document.getElementById(rightButtonId).hidden = pos === maxScrollLeft;
            }, 500);
        }.bind(this);
    }
}
