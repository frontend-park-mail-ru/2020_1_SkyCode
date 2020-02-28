
/**
 * Компонент поля ввода с настраиваемым именем,
 * placeholder-ом, типом и именем класса
 */
export class Input {
    constructor(name, placeholder, type, classname, isRequired = false, value = '',maxlen = 256) {
        this.placeholder = placeholder;
        this.type = type;
        this.classname = classname;
        this.name = name;
        this.required = isRequired;
        this.maxlen = maxlen;
        this.value = value;
    }

    render() {
        const template = '<input type={{type}} name={{name}} class={{classname}} ' +
            'placeholder={{placeholder}} maxlength={{maxlen}} required={{required}} value={{value}}>';
        const compileTemplate = Handlebars.compile(template);

        return compileTemplate({
            name: this.name,
            placeholder: this.placeholder,
            type: this.type, classname: this.classname,
            maxlen: this.maxlen,
            required: this.required,
            value: this.value,
        });
    }
}
