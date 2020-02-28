/**
 * Компонент логотипа
 */
export class Logo {
    constructor() {}

    render() {
        const template = '<div class="logo"><h1><a class="main__logo" data-section="main" href="/">Delivery</a></h1></div>';
        const compileTemplate =  Handlebars.compile(template);
        return compileTemplate({});
    }
}