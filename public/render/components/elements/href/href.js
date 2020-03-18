import Block from '../../../block.js';
import EventBus from '../../../../services/EventBus.js';

class href extends Block {
    constructor({text, href, classes}) {
        classes.push('href');

        super([], classes);
        this.text = text;
        this.href = href;
    }

    HTML() {
        return Handlebars.templates['href.hbs']({
            text: this.text,
            href: this.href,
            classes: super.classes,
        });
    }

    bind() {
        let me = super.myDomNode;
        if (me === undefined) {
            return;
        }

        me.onclick = function (event) {
            event.preventDefault();
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

export default href;