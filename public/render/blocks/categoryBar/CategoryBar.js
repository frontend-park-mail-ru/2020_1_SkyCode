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

    scroll(value) {
        return function() {
            const list = document.getElementsByClassName('category-bar__list')[0];
            list.scrollLeft += value;
        }.bind(this);
    }

    bind() {
        const list = document.getElementsByClassName('category-bar__list')[0];
        const minScrollLeft = 0;
        const leftButtonId = 'category-bar__left-button';
        const rightButtonId = 'category-bar__right-button';

        if (window.matchMedia('(max-width: 768px)')) {
            document.getElementById(leftButtonId).style.visibility = 'hidden';
            document.getElementById(rightButtonId).style.visibility = 'hidden';
        }

        let hasTimer = false;

        list.onscroll = () => {
            if (window.matchMedia('(max-width: 768px)')) {
                document.getElementById(leftButtonId).style.visibility = 'hidden';
                document.getElementById(rightButtonId).style.visibility = 'hidden';
                return;
            }

            if (hasTimer) {
                return;
            }
            hasTimer = true;
            setTimeout(() => {
                const maxScrollLeft = list.scrollWidth - list.clientWidth + 1;
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
