import Block from "../block";

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
            return '<a class="${classes}" href="/login">login</a>';
        }

        return '<a class="${classes}" href="/profile">profile</a>';
    }
}
