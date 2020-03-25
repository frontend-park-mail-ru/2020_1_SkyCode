import Component from '../../Component.js';
import EventBus from '../../../services/EventBus.js';

export default class href extends Component {
    constructor({text, href, classes = 'href'}) {

        super();
        this.addClasses(classes);
        this.addTemplateData({
            text: text,
            href: href,
        }, false);
    }

    bind() {
        let me = super.domElement;
        if (me === undefined) {
            console.trace('cat\' ret myself from DOM');
            return;
        }

        me.onclick = function (event) {
            event.preventDefault();
            console.log('href ' + this.href + ' clicked');
            EventBus.publish('goto', this.href);
        }.bind(this);
    }

    unbind() {
        let me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = null;
    }
}
