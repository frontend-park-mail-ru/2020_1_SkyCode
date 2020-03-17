import Block from '../block.js';

class logo extends Block {
    constructor() {
        super([], [
            'logo',
        ]);
    }

    HTML() {
        return `<a href="./" class="${super.classes}">Delivery</a>`;
    }

    bind() {
        // TODO: забаиндить прослушивание нажатия от window
    }

    unbind() {
        // TODO: отбаиндиться прослушивание нажатия от window
    }
}

export default logo;