export default class Component {
    constructor(classes) {
        this.toString = this.HTML;

        // templateData --- информация, передающаяся в template
        this._context = {};
        // Добавляем классы
        this.addTemplateData({classes: []}, false);

        if (classes) {
            this.addClasses(classes);
        }
    }

    get context() {
        return this._context;
    }

    addTemplateData(templateDataObj, is_blocks) {
        Object.assign(this.context, templateDataObj);

        if (is_blocks) return;
        // Если добавлены блоки, то они должны быть перечисляемыми, чтобы их можно было длрекурсивно связать
        for (const key in templateDataObj) {
            if (templateDataObj.hasOwnProperty(key)) {
                Object.defineProperty(this.context, key, {
                    enumerable: false,
                });
            }
        }
    }

    addClasses(classes) {
        let isArr = Array.isArray(classes);
        let isStr = typeof classes === 'string';

        if (!(isArr || isStr)) {
            throw 'bad usage: must be str or strArr on entry'
        }

        let addClasses = classes;

        if (isStr) {
            addClasses = classes.split(' ');
        }

        this.context.classes.push(addClasses);
    }

    get arrClasses() {
        return this._context.classes;
    }

    get strClasses() {
        return this.arrClasses.join(' ');
    }

    bind() {
        for (const key in this.context) {
            if (!this.context.hasOwnProperty(key)) {
                continue;
            }

            const child = this.context[key];

            if (typeof child !== 'object') {
                continue;
            }

            if (! ('bind' in child)) {
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

            if (typeof child !== 'object') {
                continue;
            }

            if (! ('unbind' in child)) {
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
