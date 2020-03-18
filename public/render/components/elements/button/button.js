import Block from '../../../block.js';

export default class button extends Block {
    constructor({text, callback, classes}) {
        classes.push('button');

        super([], classes);

        this.text = text;
        this.callback = callback;
    }

    HTML() {
        return Handlebars.templates['button.hbs']({
            classes: this.classes,
            text: this.text,
        });
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