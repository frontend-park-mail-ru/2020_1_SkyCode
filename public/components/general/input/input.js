
/**
 * Компонент поля ввода с настраиваемым именем,
 * placeholder-ом, типом и именем класса
 */
export class Input {
    constructor(name, placeholder, type, classname) {
        this.placeholder = placeholder;
        this.type = type;
        this.classname = classname;
        this.name = name;
    }

    render() {
        const template = '<input type={{type}} name={{name}} class={{classname}} placeholder={{placeholder}}>';
        const compileTemplate = Handlebars.compile(template);
        return compileTemplate({name: this.name, placeholder: this.placeholder, type: this.type, classname: this.classname});
    }
}
