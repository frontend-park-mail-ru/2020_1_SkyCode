import Block from '../../../Block.js';

export default class input extends Block {
    constructor({type, placeholder, classes}) {
        classes += ' input';
        super(false);

        this.classes = classes;
        this.children = {
            type: type,
            placeholder: placeholder,
        };
    }
}
