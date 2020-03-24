import Block from '../../Block.js';
import input from '../../elements/input/input.js';


export default class imageHref extends Block {
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
