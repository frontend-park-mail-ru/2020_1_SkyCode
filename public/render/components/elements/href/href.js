import Block from '../../../Block.js';
import EventBus from '../../../../services/EventBus.js';

export default class href extends Block {
    constructor({text, href, classes}) {
        classes += ' href';

        super(false);
        this.classes = classes;
        this.children = {
            text: text,
            href: href,
        };
    }

    bind() {
        let me = super.myDomNode;
        if (me === undefined) {
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
