import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';

export default class SearchField extends Component {
    constructor({classes = 'search-field', callback}) {
        super();
        this.addClasses(classes);
        this.addContextData({
            inputButton: new Input({
                type: 'image',
                src: '/static/loupe.png',
                classes: 'search-field__input-button'
            }),
            inputField: new Input({
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