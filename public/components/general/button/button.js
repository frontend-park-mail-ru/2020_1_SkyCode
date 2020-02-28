
/**
 * Компонент кнопки с настраиваемым текстом и классом
 */
export class Button {
    constructor(text, classname) {
        this.text = text;
        this.classname = classname;
    }

    render() {
        const template = '<button class={{classname}} type="button">{{ text }}</button>';
        const compileTemplate = Handlebars.compile(template);
        return compileTemplate({classname: this.classname, text: this.text});
    }
}
