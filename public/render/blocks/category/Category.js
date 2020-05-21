import Component from '../../Component.js';
import template from './Category.hbs';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';

export default class Category extends Component {
    constructor({id, src, text, classes = ''}) {
        super(classes, {
            src: '/images/' + src,
            text,
        }, Category.categoryId(id), template);
        this.catId = id;
    }

    bind() {
        this.domElement.onclick = () => {
            EventBus.publish(Events.restCategorySelected, this.catId);
        };
        super.bind();
    }

    static categoryId(id) {
        return 'category_' + id;
    }
}
