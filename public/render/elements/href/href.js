import Block from '../../Block.js';
import EventBus from '../../../services/EventBus.js';

export default class href extends Block {
    constructor({text, href, classes = 'href'}) {

        super();
        this.addClasses(classes);
        this.addTemplateData({
            text: text,
            href: href,
        }, false);
    }

    bind() {
        let me = super.myDomNode;
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
        let me = super.myDomNode;
        if (me === undefined) {
            return;
        }

        me.onclick = null;
    }
}
