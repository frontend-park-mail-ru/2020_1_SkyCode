import Component from '../../Component.js';
import template from './HamburgerButton.hbs';
import Events from '../../../services/Events/Events';
import EventBus from '../../../services/Events/EventBus';

export default class HamburgerButton extends Component {
    constructor({classes = 'hamburger-button', callback}) {
        super();
        super.template = template;

        this.addClasses(classes);
        this.callback = callback;
    }

    reboot() {
        this.unbind();
        this.domElement.outerHTML = this.toString();
        this.bind();
    }

    bind() {
        EventBus.subscribe(Events.setPage, this.reboot.bind(this));
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = this.callback;
    }

    unbind() {
        EventBus.unsubscribe(Events.setPage, this.reboot.bind(this));
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = null;
    }
}
