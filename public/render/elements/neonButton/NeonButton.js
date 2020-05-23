import Component from '../../Component.js';
import template from './NeonButton.hbs';

export default class NeonButton extends Component {
    constructor({classes, text, callback, id}) {
        super(classes, {text}, id);
        super.template = template;
        this.callback = callback;
    }

    bind() {
        const node = super.domElement;
        if (node === undefined || this.callback === undefined) {
            return;
        }

        node.onclick = this.callback;
        super.bind();
    }

    unbind() {
        const node = super.domElement;
        if (node  === undefined) {
            return;
        }

        node.onclick = null;
        super.unbind();
    }
}
