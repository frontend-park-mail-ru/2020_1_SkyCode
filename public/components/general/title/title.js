/**
 * Компонент заголовка с настраиваемым
 * именем класса и текстом
 */
export class Title {
    constructor(text, className) {
        this.text = text;
        this.className = className;
    }

    render() {
        const template = '<h1 class={{className}}>{{text}}</h1>';
        const compileTemplate = Handlebars.compile(template);
        return compileTemplate({className: this.className, text: this.text});
        //this.parent.innerHTML += compileTemplate({className: this.className, text: this.text});
    }

}