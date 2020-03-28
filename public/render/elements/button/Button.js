import Component from '../../Component.js';

export default class Button extends Component {
    constructor({text, callback, classes = 'button', id}) {
        super(classes, {text}, id);
        this.callback = callback;
    }

    bind() {
        let node = super.domElement;
        if (node === undefined) {
            return;
        }

        node.onclick = this.callback;
    }

    unbind() {
        let node = super.domElement;
        if (node  === undefined) {
            return;
        }

        node.onclick = null;
    }
}