import Block from '../../Block.js';

export default class input extends Block {
    constructor({type, placeholder, classes = 'input', src}) {
        super();

        this.addClasses(classes);
        this.addTemplateData({
            src: src,
            type: type,
            placeholder: placeholder,
        }, false);
    }
}
