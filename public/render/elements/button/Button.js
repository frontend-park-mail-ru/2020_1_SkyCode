import Component from '../../Component.js';
import template from './Button.hbs';
import EventBus from '../../../services/Events/EventBus';

export default class Button extends Component {
    constructor({text, callback, classes = 'button', id, isHidden = false}) {
        super(classes, {
            text,
            isHidden,
        }, id);
        this.callback = callback;
        super.template = template;
    }

    bind() {
        const node = super.domElement;
        if (node === undefined || this.callback === undefined) {
            return;
        }

        node.onclick = () => {
            this.callback();
            EventBus.broadcast(this.id + '-clicked');
        };
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
