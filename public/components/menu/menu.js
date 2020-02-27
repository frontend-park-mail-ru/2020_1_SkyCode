import {Product} from '../general/product/product.js';

export class Menu {
    constructor() {
        // this.menuSections = {
        //     combo: 'Combo Meal',
        //     burgers: 'Burgers',
        //     salads: 'Salads',
        //     beverages: 'Beverages'
        // }
    }

    render(context) {
        //let html = new Nav().render(this.menuSections);
        const product = new Product();
        let html = '<div class="menu">';
        context.products.forEach(function (item, i, arr) {
            html += product.render(item);
        });
        html += '</div>';
        return html;
    }
}