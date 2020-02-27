export class Label {
    constructor(text, classname) {
        this.text = text;
        this. classname = classname;
    }

    render() {
        const template = '<label class={{classname}}>{{text}}</label>';
        const compileTemplate = Handlebars.compile(template);
        return compileTemplate({text: this.text, classname: this.classname});
        //this.parent.innerHTML += compileTemplate({text: this.text, classname: this.classname});
    }
}