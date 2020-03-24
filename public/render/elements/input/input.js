import Component from '../../Component.js';

export default class input extends Component {
    constructor({type, placeholder, classes = 'input', src}) {
        super();

        this.addClasses(classes);
        this.addTemplateData({
            src: src,
            type: type,
            placeholder: placeholder,
        }, false);
    }
}
