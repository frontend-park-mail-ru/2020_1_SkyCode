import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';


export default class ImageHref extends Component {
    constructor({src, href, classes = 'imageHref', imageClasses = 'imageClasses'}) {
        super();
        this.addClasses(classes);
        this.addContextData({href}, false);
        this.addContextData({
            image: new Input({
                type: 'image',
                classes: imageClasses,
                src,
            }),
        }, true);
    }
}
