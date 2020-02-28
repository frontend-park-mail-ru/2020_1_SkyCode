
/**
 * Компонент картинки с из нужного источника с настраиваемым классом
 */
export class Image {
	constructor(src, className, name = '') {
		this.src = src;
		this.className = className;
		this.name = name;
	}

	render() {
		const template = '<img name="{{name}}" class={{className}} src={{src}} alt="can`t load">';
		const compileTemplate = Handlebars.compile(template);
		return compileTemplate({className: this.className, src: this.src, name: this.name});
	}
}
