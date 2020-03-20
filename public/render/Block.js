export default class Block {
    constructor(hasChildren = true) {
        this.toString = this.HTML;
        if (!hasChildren) {
            this.bind = () => {};
            this.unbind = () => {};
        }
    }

    set children(children) {
        this._children = (this._children || {});
        Object.assign(this._children, children);
    }

    get children() {
        return this._children;
    }

    set classes(classes) {
        let isArr = Array.isArray(classes);
        let isStr = typeof classes === 'string';

        if (!(isArr || isStr)) {
            console.trace('bad param');
            return;
        }

        let cls;

        if (isArr) {
            cls = classes;
        } else {
            cls = classes.split(' ');
        }

        this._children = (this._children || {});
        this._children.classes = cls;
        this._classes = cls;
    }

    get arrClasses() {
        return this._classes;
    }

    get strClasses() {
        return this._classes.reduce((previous, current) => {
            return previous + (' ' + current);
        }, '');
    }

    bind() {
        for (let key in this._children) {
            if (key === 'classes') continue;
            let child = this._children[key];

            if (typeof child !== 'object') {
                console.trace('child ' + child + ' is not an object');
                return;
            }

            if ('bind' in child) {
                child.bind();
                continue;
            }

            console.trace('child ' + child.constructor.name + ' has no bind method');
        }
    }

    unbind() {
        for (let child in this._children) {
            if (typeof child !== 'object') {
                console.trace('child ' + child + ' is not an object');
                return;
            }

            if ('unbind' in child) {
                child.unbind();
                continue;
            }

            console.trace('child ' + child.constructor.name + ' has no bind method');
        }
    }

    HTML() {
        return Handlebars.templates[this.constructor.name + '.hbs'](this.children);
    }

    get myDomNode() {
        let me = document.getElementsByClassName(this.classes);
        if (me.length === 0) {
            return;
        }

        return me[0];
    }
}
