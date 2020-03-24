import Component from '../../Component.js';
import input from '../../elements/input/input.js';


export default class imageHref extends Component {
    constructor({src, href, classes = 'imageHref', imageClasses = 'imageClasses'}) {
        super();
        this.addClasses(classes);
        this.addTemplateData({href}, false);
        this.addTemplateData({
            image: new input({
                type: 'image',
                classes: imageClasses,
                src,
            }),
        }, true);
    }
}
