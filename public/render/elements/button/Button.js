import Component from '../../Component.js';

export default class Button extends Component {
    constructor({text, callback, classes = 'button'}) {

        super();
        this.addClasses(classes);
        this.addContextData({
            text: text,
        }, false);

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