import Component from '../../Component.js';

export default class neonButton extends Component {
    constructor({classes, text, callback}) {
        super(classes, {text});

        this.callback = callback;
    }

    bind() {
        let node = super.domElement;
        if (node === undefined || this.callback === undefined) {
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