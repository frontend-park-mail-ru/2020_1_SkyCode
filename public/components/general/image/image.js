export class Image {
	constructor(src, className) {
		this.src = src;
		this.className = className;
	}

	render() {
		const template = '<img class={{className}} src={{src}}>';
		const compileTemplate = Handlebars.compile(template);
		return compileTemplate({className: this.className, src: this.src});
	}
}