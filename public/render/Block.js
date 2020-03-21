export default class Block {
    constructor() {
        this.toString = this.HTML;
    }

    set templateData(templateData) {
        this.templateData = (this.templateData || {});
        Object.assign(this.templateData, templateData);
    }

    get templateData() {
        return this.templateData;
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

        this.templateData = (this.templateData || {});
        this.templateData.classes = cls;
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
        for (let key in this.templateData) {
            if (key === 'classes') continue;
            let child = this.templateData[key];

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
        for (let child in this.templateData) {
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
        return Handlebars.templates[this.constructor.name + '.hbs'](this.templateData);
    }

    get myDomNode() {
        let me = document.getElementsByClassName(this.classes);
        if (me.length === 0) {
            return;
        }

        return me[0];
    }

    unnumerableChildren(...unnumChildren) {
        for (let child of unnumChildren) {
            Object.defineProperty(this.templateData, child, {
                enumerable: false,
            });
        }
    }
}
