import Component from '../../Component.js';
import template from './Img.hbs';

export default class Img extends Component {
    constructor({classes, src, alt, id, callback}) {
        super(classes, {
            src,
            alt,
        }, id, template);
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
