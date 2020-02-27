export class Product {
    constructor() {

    }

    render(context) {
        const template = '<div class="card">' +
            '<div class="card_image">' +
            '<img src={{src}}>' +
            '</div>'+
            '<div class="card_title title-white">' +
            '<p>{{name}}</p>' +
            '</div>' +
            '</div>';

        const compileTemplate = Handlebars.compile(template);
        return compileTemplate({src: context.image, name: context.name});
    }
}