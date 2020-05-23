import Component from '../../Component.js';
import template from './chatItem.hbs';

export default class ChatItem extends Component {
    constructor({classes, user, id, callback}) {
        super(classes, {
            User: user,
            Id: id,
        }, id);
        super.template = template;
        this.callback = callback;
    }

    bind() {
        const node = super.domElement;
        if (node === undefined || this.callback === undefined) {
            return;
        }

        node.onclick = this.callback;
        this.bind();
    }

    unbind() {
        const node = super.domElement;
        if (node  === undefined) {
            return;
        }

        node.onclick = null;
        this.unbind();
    }
}
