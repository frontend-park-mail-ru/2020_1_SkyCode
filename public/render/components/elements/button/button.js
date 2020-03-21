import Block from '../../../Block.js';

export default class button extends Block {
    constructor({text, callback, classes}) {
        classes += ' button';

        super(false);
        this.classes = classes;
        this.templateData = {
            text: text,
        };
        this.callback = callback;
    }

    bind() {
        let node = super.myDomNode;
        if (node === undefined) {
            return;
        }

        node.onclick = this.callback;
    }

    unbind() {
        let node = super.myDomNode;
        if (node  === undefined) {
            return;
        }

        node.onclick = null;
    }
}