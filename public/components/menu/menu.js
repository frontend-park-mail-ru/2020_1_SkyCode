import {Product} from '../general/product/product.js';

/**
 * Компонент меню
 */
export class Menu {

    /**
     * @param context объекты класса Product
     * @returns {string} html предсталение меню
     */
    render(context) {
        //let html = new Nav().render(this.menuSections);
        const product = new Product();
        let html = '<div class="menu">';
        context.products.forEach(function (item) {
            html += product.render(item);
        });
        html += '</div>';
        return html;
    }
}