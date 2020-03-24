import Block from '../../Block.js';

export default class category extends Block {
    constructor({src, text, classes = 'category'}) {
        super();
        this.addClasses(classes);
        this.addTemplateData({src, text}, false);
    }
}