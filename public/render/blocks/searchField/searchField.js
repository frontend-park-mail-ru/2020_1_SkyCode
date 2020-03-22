import Block from '../../Block.js';
import input from '../../elements/input/input.js';

export default class searchField extends Block {
    constructor({classes = 'search-field', callback}) {
        super();
        this.addClasses(classes);
        this.addTemplateData({
            inputButton: new input({
                type: 'image',
                src: '/static/loupe.png',
                classes: 'search-field__input-button'
            }),
            inputField: new input({
                type: 'text',
                placeholder: 'Search',
                classes: 'search-field__input-field'
            }),
        }, true);

        this.callback = callback;
    }

    bind() {
        let me = this.myDomNode;
        if (me === undefined) return;

        let but = me.getElementsByClassName('search-field__input-button')[0];
        but.onclick = this.callback;
    }

    unbind() {
        let me = this.myDomNode;
        if (me === undefined) return;

        let but = me.getElementsByClassName('search-field__input-button')[0];
        but.onclick = null;
    }
}