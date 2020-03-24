import Component from '../../Component.js';

export default class hamburgerButton extends Component{
    constructor({classes = 'hamburger-button', callback}) {
        super();
        this.addClasses(classes);
        this.callback = callback;
    }

    bind() {
        let me = super.myDomNode;
        if (me === undefined) {
            return;
        }

        me.onclick = this.callback;
    }

    unbind() {
        let me = super.myDomNode;
        if (me === undefined) {
            return;
        }

        me.onclick = null;

    }
}