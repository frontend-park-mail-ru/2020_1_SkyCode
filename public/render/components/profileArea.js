import Block from "../block.js";

class profileArea extends Block {
    #user;

    constructor({user} = {}) {
        super([], [
            'searchbar',
            'header'
        ]);

        this.#user = user;
    }

    HTML() {
        if (this.#user === undefined) {
            return `<a class="${super.classes}" href="/login">login</a>`;
        }

        return `<a class="${super.classes}" href="/profile">profile</a>`;
    }
}

export default profileArea;