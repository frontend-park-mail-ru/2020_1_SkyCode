import Block from '../../Block.js';


// В actionData должны присутствовать href, src, alt
export default class action extends Block {
    constructor({classes = 'action', href, src, alt = 'default alt'}) {
        super();
        this.addClasses(classes);
        this.addTemplateData({
            href,
            src,
            alt
        }, false);
    }
}