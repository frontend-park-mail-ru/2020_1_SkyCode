export default class Block {
    constructor() {
        this.toString = this.HTML;

        // templateData --- информация, передающаяся в template
        this._templateData = {};
        // Добавляем классы
        this.addTemplateData({classes: []}, false);
    }

    get templateData() {
        return this._templateData;
    }

    addTemplateData(templateDataObj, is_blocks) {
        Object.assign(this.templateData, templateDataObj);

        if (is_blocks) return;
        // Если добавлены блоки, то они должны быть перечисляемыми, чтобы их можно было длрекурсивно связать
        for (let key in templateDataObj) {
            if (templateDataObj.hasOwnProperty(key)) {
                Object.defineProperty(this.templateData, key, {
                    enumerable: false,
                });
            }
        }
    }

    addClasses(classes) {
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

        this.templateData.classes.push(cls);
    }

    get arrClasses() {
        return this._templateData.classes;
    }

    get strClasses() {
        return this.arrClasses.reduce((previous, current) => {
            return previous + (' ' + current);
        }, '');
    }

    bind() {
        for (let key in this.templateData) {
            if (!this.templateData.hasOwnProperty(key)) {
                console.trace('the property ' + key + ' is not owned by this object');
                continue;
            }

            let child = this.templateData[key];

            if (typeof child !== 'object') {
                console.trace('child ' + child + ' is not an object');
                continue;
            }

            if (! ('bind' in child)) {
                console.trace('child ' + child.constructor.name + ' has no bind method');
                continue;
            }

            child.bind();
        }
    }

    unbind() {
        for (let child in this.templateData) {
            if (!this.templateData.hasOwnProperty(key)) {
                console.trace('the property ' + key + ' is not owned by this object');
                continue;
            }

            let child = this.templateData[key];

            if (typeof child !== 'object') {
                console.trace('child ' + child + ' is not an object');
                continue;
            }

            if (! ('unbind' in child)) {
                console.trace('child ' + child.constructor.name + ' has no unbind method');
                continue;
            }

            child.unbind();
        }
    }

    HTML() {
        return Handlebars.templates[this.constructor.name + '.hbs'](this.templateData);
    }

    get myDomNode() {
        let me = document.getElementsByClassName(this.strClasses);
        if (me.length === 0) {
            console.trace('cat\' ret myself from DOM');
            return;
        }

        return me[0];
    }
}
