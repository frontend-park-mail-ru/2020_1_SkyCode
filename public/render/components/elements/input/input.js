import Block from '../../../Block.js';

export default class input extends Block {
    constructor({type, placeholder, classes}) {
        classes += ' input';
        super();

        this.addClasses(classes);
        this.addTemplateData({
            type: type,
            placeholder: placeholder,
        }, false);
    }
}
