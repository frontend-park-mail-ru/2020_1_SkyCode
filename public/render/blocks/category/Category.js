import Component from '../../Component.js';
import template from './Category.hbs';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';

export default class Category extends Component {
    constructor({id, src, text, classes = ''}) {
        super(classes, {
            src,
            text,
        }, Category.categoryId(id), template);
        this.catId = id;
    }

    bind() {
        this.domElement.onclick = () => {
            EventBus.broadcast(Events.restCategorySelected, this.catId);
        };
        super.bind();
    }

    unbind() {
        this.domElement.onclick = null;
        super.unbind();
    }

    static categoryId(id) {
        return 'category_' + id;
    }
}
