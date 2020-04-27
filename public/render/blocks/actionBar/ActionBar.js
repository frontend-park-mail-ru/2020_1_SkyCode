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

    scroll(value) {
        return function() {
            const list = document.getElementsByClassName('action-bar__list')[0];
            list.scrollLeft += value;
        }.bind(this);
    }

    bind() {
        const list = document.getElementsByClassName('action-bar__list')[0];
        const minScrollLeft = 0;
        const leftButtonId = 'action-bar__left-button';
        const rightButtonId = 'action-bar__right-button';

        if (window.matchMedia('(max-width: 768px)').matches) {
            document.getElementById(leftButtonId).style.visibility = 'hidden';
            document.getElementById(rightButtonId).style.visibility = 'hidden';
        }

        let hasTimer = false;

        list.onscroll = () => {
            if (window.matchMedia('(max-width: 768px)').matches) {
                document.getElementById(leftButtonId).style.visibility = 'hidden';
                document.getElementById(rightButtonId).style.visibility = 'hidden';
                return;
            }

            if (hasTimer) {
                return;
            }
            hasTimer = true;
            setTimeout(() => {
                const maxScrollLeft = list.scrollWidth - list.clientWidth;
                const pos = Math.ceil(list.scrollLeft);
                const leftVisibility = pos === minScrollLeft ? 'hidden' : 'visible';
                const rightVisibility = pos === maxScrollLeft ? 'hidden' : 'visible';
                document.getElementById(leftButtonId).style.visibility = leftVisibility;
                document.getElementById(rightButtonId).style.visibility = rightVisibility;
                hasTimer = false;
            }, 500);
        };

        super.bind();
    }
}
