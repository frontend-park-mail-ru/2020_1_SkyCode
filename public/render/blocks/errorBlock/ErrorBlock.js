import Component from '../../Component.js';

export default class ErrorBlock extends Component {
    constructor({classes, id, text}) {
        super(classes, {
            text,
        }, id);
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
