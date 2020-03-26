import Component from '../../Component.js';

export default class Input extends Component {
    constructor({type, placeholder, classes = 'input', src}) {
        super();

        this.addClasses(classes);
        this.addContextData({
            src: src,
            type: type,
            placeholder: placeholder,
        }, false);
    }
}
