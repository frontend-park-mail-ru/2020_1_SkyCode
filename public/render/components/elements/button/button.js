import Block from '../../../Block.js';

export default class button extends Block {
    constructor({text, callback, classes = 'button'}) {

        super();
        this.addClasses(classes);
        this.addTemplateData({
            text: text,
        }, false);

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