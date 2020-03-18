class Block {
    #children;
    #classes;

    constructor(children = [], classes = []) {
        this.#children = children;
        this.#classes = classes;
    }

    HTML() {
        return this.#children.reduce((previous, current) => {
            return previous + current.HTML();
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
            return previous + (' ' + current);
        }, '');
    }

    get myDomNode() {
        let me = document.getElementsByClassName(this.classes);
        if (me.length === 0) {
            return;
        }

        return me[0];
    }
}

export default Block;