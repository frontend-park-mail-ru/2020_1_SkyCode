
export default class Block {

    set children(children) {
        this._children = children;
    }

    get children() {
        return this._children;
    }

    set classes (classes) {
        if (Array.isArray(classes)) {
            this._classes = classes;
            return;
        }

        if (typeof classes === 'string') {
            this._classes = classes.split(' ');
            return;
        }

        console.trace('bad param');
    }

    get arrClasses () {
        return this._classes;
    }

    get strClasses () {
        return this._classes.reduce((previous, current) => {
            return previous + (' ' + current);
        }, '');
    }

    bind() {
        for (let child in this._children) {
            if (typeof child !== 'object') {
                console.trace('child ' + child + ' is not an object');
                return;
            }

            if (child.hasOwnProperty('bind')) {
                child.bind();
                continue;
            }

            console.trace('child' + child.constructor.name + ' has no bind method');
        }
    }

    unbind() {
        for (let child in this._children) {
            if (typeof child !== 'object') {
                console.trace('child ' + child + ' is not an object');
                return;
            }

            if (child.hasOwnProperty('unbind')) {
                child.unbind();
                continue;
            }

            console.trace('child ' + child.constructor.name + ' has no bind method');
        }
    }

    HTML() {
        return Handlebars.templates[this.constructor.name + '.hbs'](this.children)
    }

    get myDomNode() {
        let me = document.getElementsByClassName(this.classes);
        if (me.length === 0) {
            return;
        }

        return me[0];
    }
}
