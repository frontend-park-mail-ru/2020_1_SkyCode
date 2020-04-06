import Component from '../../Component.js';
import template from './NeonButton.hbs';

export default class NeonButton extends Component {
    constructor({classes, text, callback}) {
        super(classes, {text});
        super.template = template;
        this.callback = callback;
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
