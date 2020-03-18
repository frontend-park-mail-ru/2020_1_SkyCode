import Block from '../../../block.js';

export default class input extends Block {
    constructor({type, placeholder, classes}) {
        classes.push('input');
        super([], classes);

        this.type = type;
        this.placeholder = placeholder;
    }

    HTML() {
        return Handlebars.templates['input.hbs']({
            classes: super.classes,
            type: this.type,
            placeholder: this.placeholder,
        });
    }
}
