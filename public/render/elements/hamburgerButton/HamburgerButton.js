import Component from '../../Component.js';

export default class HamburgerButton extends Component {
    constructor({classes = 'hamburger-button', callback}) {
        super();
        this.addClasses(classes);
        this.callback = callback;
    }

    bind() {
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = this.callback;
    }

    unbind() {
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = null;
    }
}
