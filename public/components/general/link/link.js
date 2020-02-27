export class Link {
    constructor(className) {
        this.className = className;
    }

    render() {
        Handlebars.registerPartial('link', '<a class=this.className href={{href}} dataset-section={{section}}>{{text}}</a>');
        //const template = '<a class={{className}} href={{href}} dataset-section={{section}}>{{text}}</a>';
        //const compileTemplate = Handlebars.compile(template);
        //return compileTemplate({clasName: this.clasName, href: this.href, section: this.section, text: this.text});
    }
}