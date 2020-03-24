import Component from '../../Component.js';

export default class category extends Component {
    constructor({src, text, classes = 'category'}) {
        super();
        this.addClasses(classes);
        this.addTemplateData({src, text}, false);
    }
}