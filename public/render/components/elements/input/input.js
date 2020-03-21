import Block from '../../../Block.js';

export default class input extends Block {
    constructor({type, placeholder, classes}) {
        classes += ' input';
        super(false);

        this.classes = classes;
        this.templateData = {
            type: type,
            placeholder: placeholder,
        };
    }
}
