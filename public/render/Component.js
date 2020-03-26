export default class Component {
    constructor(classes, contextObj) {
        this.toString = this.HTML;

        // templateData --- информация, передающаяся в template
        this._context = {};
        // Добавляем классы
        this.addContextData({classes: []}, false);

        if (classes) {
            this.addClasses(classes);
        }

        if (contextObj) {
            this.addContextData(contextObj);
        }
    }

    get context() {
        return this._context;
    }

    addContextData(contextObject) {
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
        for (const value in Object.values(this.context)) {

            if (!value instanceof Component){
                continue;
            }

            value.bind();
        }
    }

    unbind() {
        for (const value in Object.values(this.context)) {

            if (!value instanceof Component){
                continue;
            }

            value.unbind();
        }
    }

    HTML() {
        return Handlebars.templates[this.constructor.name + '.hbs'](this.context);
    }

    set id(id) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    get domElement() {
        if (this._id) {
            return document.getElementById(this.id);
        }

        let me = document.getElementsByClassName(this.strClasses);
        if (me.length === 0) {
            return;
        }

        return me[0];
    }
}
