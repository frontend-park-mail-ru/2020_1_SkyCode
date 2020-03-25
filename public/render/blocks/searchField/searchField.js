import Component from '../../Component.js';
import input from '../../elements/input/input.js';

export default class searchField extends Component {
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
        const me = this.domElement;
        if (me === undefined) return;

        const button = me.getElementsByClassName('search-field__input-button')[0];
        button.onclick = this.callback;
    }

    unbind() {
        let me = this.domElement;
        if (me === undefined) return;

        let but = me.getElementsByClassName('search-field__input-button')[0];
        but.onclick = null;
    }
}