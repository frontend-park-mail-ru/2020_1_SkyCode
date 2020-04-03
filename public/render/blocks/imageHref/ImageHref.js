import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import EventBus from "../../../services/Events/EventBus.js";


export default class ImageHref extends Component {
    constructor({src, href, classes = 'imageHref', imageClasses = 'imageClasses'}) {
        super(classes, {
            image: new Input({
                type: 'image',
                classes: imageClasses,
                src,
            }),
            href,
        });
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
            EventBus.publish('set-page', {url: this.context.href});
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
