import Component from '../../Component.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './Href.hbs';

export default class Href extends Component {
    constructor({text, href: ref, classes = 'href', id}) {
        super(classes, {
            text,
            ref,
        }, id);
        super.template = template;
    }

    bind() {
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = (event) => {
            event.preventDefault();
            event.stopPropagation();
            EventBus.broadcast('set-page', {url: this.context.ref});
        };

        super.bind();
    }

    unbind() {
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = null;
        super.unbind();
    }
}
