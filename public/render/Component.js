export default class Component {
    constructor(classes, contextObj) {
        this.toString = this.HTML;

        // templateData --- информация, передающаяся в template
        this._context = {};
        // Добавляем классы
        this.addTemplateData({classes: []}, false);

        if (classes) {
            this.addClasses(classes);
        }

        if (contextObj) {
            this.addTemplateData(contextObj);
        }
    }

    get context() {
        return this._context;
    }

    addTemplateData(contextObject) {
        Object.assign(this.context, contextObject);
    }

    addClasses(classes) {
        let isArr = Array.isArray(classes);
        let isStr = typeof classes === 'string';

        if (!(isArr || isStr)) {
            throw 'bad usage: must be str or strArr on entry';
        }

        let addClasses = classes;

        if (isStr) {
            addClasses = classes.split(' ');
        }

        this.context.classes.push(addClasses);
    }

    get strClasses() {
        return this.context.classes.join(' ');
    }

    bind() {
        for (const key in this.context) {
            if (!this.context.hasOwnProperty(key)) {
                continue;
            }

            const child = this.context[key];

            if (!child instanceof Component){
                continue;
            }

            if (typeof child !== 'object') {
                continue;
            }

            if (!('bind' in child)) {
                continue;
            }

            child.bind();
        }
    }

    unbind() {
        for (const child in this.context) {
            if (!this.context.hasOwnProperty(key)) {
                continue;
            }

            let child = this.context[key];

            if (!child instanceof Component){
                continue;
            }

            if (typeof child !== 'object') {
                continue;
            }

            if (!('unbind' in child)) {
                continue;
            }

            child.unbind();
        }
    }

    HTML() {
        return Handlebars.templates[this.constructor.name + '.hbs'](this.context);
    }

    get myDomNode() {
        let me = document.getElementsByClassName(this.strClasses);
        if (me.length === 0) {
            return;
        }

        return me[0];
    }
}
