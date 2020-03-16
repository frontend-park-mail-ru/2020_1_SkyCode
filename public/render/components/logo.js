import Block from "../block"

class logo extends Block {
    constructor() {
        super([], [
            'logo',
        ]);
    }

    HTML() {
        return '<button class="${classes}>Delivery</button>';
    }

    bind() {
        // TODO: забаиндить прослушивание нажатия от window
    }

    unbind() {
        // TODO: отбаиндиться прослушивание нажатия от window
    }
}

export default logo;