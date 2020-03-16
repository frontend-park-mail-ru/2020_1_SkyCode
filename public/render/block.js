class Block {
    #children;
    #classes;

    constructor(children = [], classes = []) {
        this.#children = children;
        this.#classes = classes;
    }

    HTML() {
        return this.#children.reduce((previous, current) => {
            previous += current.HTML();
        }, '');
    }

    bind() {
        this.#children.forEach(element => element.bind());
    }

    unbind() {
        this.#children.forEach(element => element.unbind());
    }

    get classes() {
        return this.#classes.reduce((previous, current) => {
            previous += (' ' + current);
        }, '');
    }
}

// export default Block;