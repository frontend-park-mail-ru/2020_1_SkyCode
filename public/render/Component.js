export default class Component {
    constructor(classes, contextObj, id, template) {
        this.toString = () => template(this.context);

        // TemplateData --- информация, передающаяся в template
        this._context = {};
        // Добавляем классы
        this.addContextData({classes: ''}, false);

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

    set template(template) {
        this.toString = () => template(this.context);
    }

    static isComponent(object) {
        return object instanceof Component;
    }

    get context() {
        return this._context;
    }

    addContextData(contextObject) {
        for (const i in contextObject) {
            if (Array.isArray(contextObject[i])) {
                for (const j in contextObject[i]) {
                    if (contextObject[i][j] instanceof Component) {
                        contextObject[i][j].contextParent = this;
                    }
                }
            } else {
                if (contextObject[i] instanceof Component) {
                    contextObject[i].contextParent = this;
                }
            }
        }
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

        if (this.context.classes !== '') {
            this.context.classes += ' ';
        }

        this.context.classes += addClasses.join(' ');
    }

    get classes() {
        return this.context.classes;
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

        const me = document.getElementsByClassName(this.classes);
        if (me.length === 0) {
            return undefined;
        }

        return me[0];
    }

    get state() {
        return {};
    }
}
