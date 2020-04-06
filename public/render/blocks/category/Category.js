import Component from '../../Component.js';
import template from './Category.hbs';

export default class Category extends Component {
    constructor({src, text, classes = 'category'}) {
        super();
        super.template = template;

        this.addClasses(classes);
        this.addContextData({src,
            text}, false);
    }
}
