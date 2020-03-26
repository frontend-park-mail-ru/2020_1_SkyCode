import Component from '../../Component.js';

export default class Category extends Component {
    constructor({src, text, classes = 'category'}) {
        super();
        this.addClasses(classes);
        this.addContextData({src, text}, false);
    }
}