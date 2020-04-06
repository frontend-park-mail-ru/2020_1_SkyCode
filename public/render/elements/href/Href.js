import Component from '../../Component.js';
import EventBus from '../../../services/Events/EventBus.js';

export default class Href extends Component {
    constructor({text, href, classes = 'href', id}) {
        super(classes, {
            text,
            href,
        }, id);
    }

    bind() {
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = function(event) {
            event.preventDefault();
            EventBus.publish('set-page', {url: this.context.href});
        }.bind(this);
        console.log('qwe');
    }

    unbind() {
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = null;
    }
}
