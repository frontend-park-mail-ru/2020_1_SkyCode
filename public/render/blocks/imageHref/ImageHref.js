import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './ImageHref.hbs';

export default class ImageHref extends Component {
    constructor({
        src,
        href,
        classes = 'imageHref',
        imageClasses = 'imageClasses',
        needNewWindow = false,
    }) {
        super(classes, {
            image: new Input({
                type: 'image',
                classes: imageClasses,
                src,
            }),
            href,
            needNewWindow,
        });
        super.template = template;
    }

    bind() {
        const me = super.domElement;
        if (me === undefined) {
            console.trace('cat\' ret myself from DOM');
            return;
        }

        me.onclick = (event) => {
            event.preventDefault();
            EventBus.publish('set-page', {url: this.context.href});
        };
    }

    unbind() {
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = null;
    }
}
