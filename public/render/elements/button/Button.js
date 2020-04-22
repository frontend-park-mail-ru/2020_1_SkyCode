import Component from '../../Component.js';
import template from './Button.hbs';

export default class Button extends Component {
    constructor({text, callback, classes = 'button', id, isHidden = false}) {
        super(classes, {
            text,
            isHidden,
        }, id);
        this.callback = callback;
        super.template = template;
    }

    bind() {
        const node = super.domElement;
        if (node === undefined || this.callback === undefined) {
            return;
        }

        node.onclick = this.callback;
    }

    unbind() {
        const node = super.domElement;
        if (node  === undefined) {
            return;
        }

        node.onclick = null;
    }
}
