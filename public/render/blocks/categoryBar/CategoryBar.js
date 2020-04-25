import Component from '../../Component.js';
import Category from '../category/Category.js';
import template from './CategoryBar.hbs';
import Button from '../../elements/button/Button';

export default class CategoryBar extends Component {
    constructor({categoryArr, classes = 'categoryBar'}) {
        super(classes);

        super.addContextData({
            LeftButton: new Button({
                classes: [
                    'scroll-bar__button',
                    'category-bar__left-button',
                ],
                id: 'category-bar__left-button',
                text: '<',
                callback: this.scroll(-190),
            }),
            RightButton: new Button({
                classes: [
                    'scroll-bar__button',
                    'category-bar__right-button',
                ],
                id: 'category-bar__right-button',
                text: '>',
                callback: this.scroll(190),
            }),
        });
        super.template = template;

        const categories = [];
        for (const categoryData of categoryArr) {
            categories.push(new Category({
                src: categoryData.src,
                text: categoryData.text,
                classes: 'category-bar__category',
            }));
        }

        this.addContextData({categories}, true);
    }

    scroll(value,
        leftButtonId = 'category-bar__left-button',
        rightButtonId = 'category-bar__right-button') {
        return function() {
            const container = document.getElementsByClassName(this.context.classes)[0];
            container.scrollLeft += value;

            const minScrollLeft = 0;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;

            setTimeout(() => {
                const pos = Math.ceil(container.scrollLeft);
                const leftVisibility = pos === minScrollLeft ? 'hidden' : 'visible';
                const rightVisibility = pos === maxScrollLeft ? 'hidden' : 'visible';
                document.getElementById(leftButtonId).style.visibility = leftVisibility;
                document.getElementById(rightButtonId).style.visibility = rightVisibility;
            }, 500);
        }.bind(this);
    }
}
