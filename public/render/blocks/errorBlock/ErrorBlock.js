import Component from '../../Component.js';
import template from './ErrorBlock.hbs';

export default class ErrorBlock extends Component {
    constructor({classes, id, text}) {
        super(classes, {
            text,
        }, id, template);
    }

    appendClasses(classes) {
        this.domElement.className += ' ' + classes;
    }

    replaceClasses(classes) {
        this.domElement.className = classes;
    }

    addMessage(message) {
        this.domElement.innerText += message;
    }

    replaceMessage(message) {
        this.domElement.innerText = message;
    }

    clean() {
        this.replaceMessage('');
    }
}
