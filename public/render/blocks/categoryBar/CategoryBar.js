import Component from '../../Component.js';
import Category from '../category/Category.js';
import template from './CategoryBar.hbs';
import Button from '../../elements/button/Button';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';

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
                callback: this.scroll(-1),
            }),
            RightButton: new Button({
                classes: [
                    'scroll-bar__button',
                    'category-bar__right-button',
                ],
                id: 'category-bar__right-button',
                text: '>',
                callback: this.scroll(1),
            }),
        });
        super.template = template;

        const categories = [new Category({
            src: '/static/categories/cat1.svg',
            text: 'Все',
            classes: 'category-bar__category category-bar__active',
            id: '-1',
        })];

        for (const categoryData of categoryArr) {
            categories.push(new Category({
                id: categoryData.id,
                src: '/images/' + categoryData.image + '.svg',
                text: categoryData.name,
                classes: 'category-bar__category',
            }));
        }

        this.addContextData({categories}, true);
    }

    scroll(multiplier) {
        return function() {
            const list = document.getElementsByClassName('category-bar__list')[0];
            const child = list.firstElementChild;
            const fraction = child.offsetWidth;
            list.scrollLeft += multiplier * fraction;
        }.bind(this);
    }

    normalize(list) {
        const child = list.firstElementChild;
        const fraction = child.offsetWidth;
        const div = Math.round(list.scrollLeft / fraction);
        list.scrollLeft = div * fraction;
    }

    bind() {
        const list = document.getElementsByClassName('category-bar__list')[0];
        const leftButton = this.context.LeftButton.domElement;
        const rightButton = this.context.RightButton.domElement;
        let hasTimer = false;
        const minScrollLeft = 0;

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

        EventBus.subscribe(Events.restCategorySelected, (id) => {
            for (const cat of this.context.categories) {
                cat.domElement.className = 'category-bar__category';
            }
            document.getElementById(Category.categoryId(id)).className += ' category-bar__active';
        });
        super.bind();
    }
}
