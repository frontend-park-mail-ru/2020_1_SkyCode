export default class Component {
    constructor(classes, contextObj, id) {
        this.toString = this.html;

        // TemplateData --- информация, передающаяся в template
        this._context = {};
        // Добавляем классы
        this.addContextData({classes: []}, false);

        if (classes) {
            this.addClasses(classes);
        }

        if (contextObj) {
            this.addContextData(contextObj);
        }

        if (id) {
            this._id = id;
            this.addContextData({id});
        }
    }

    static isComponent(object) {
        return object instanceof Component;
    }

    get context() {
        return this._context;
    }

    addContextData(contextObject) {
        Object.assign(this.context, contextObject);
    }

    addClasses(classes) {
        const isArr = Array.isArray(classes);
        const isStr = typeof classes === 'string';

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
        for (const value of Object.values(this.context)) {
            if (Array.isArray(value)) {
                value.forEach((value) => {
                    if (Component.isComponent(value)) {
                        value.bind();
                    }
                });
            }

            if (Component.isComponent(value)) {
                value.bind();
            }
        }
    }

    unbind() {
        for (const value of Object.values(this.context)) {
            if (!(value instanceof Component)) {
                continue;
            }

            value.unbind();
        }
    }

    html() {
        // eslint-disable-next-line no-undef
        return Handlebars.templates[
            this.constructor.name + '.hbs'
        ](this.context);
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

        const me = document.getElementsByClassName(this.strClasses);
        if (me.length === 0) {
            return undefined;
        }

        return me[0];
    }

    get state() {
        return {};
    }
}
