import Component from '../../Component.js';
import template from './restaurantItem.hbs';
import Href from '../../elements/href/Href';

export default class RestaurantItem extends Component {
    constructor({classes, name, id}) {
        const hrefClass = 'admin-restaurant-list__href';
        super(classes, {
            Name: name,
            Hrefs: [
                new Href({
                    id: id + '_geo-point-href',
                    text: 'Добавление точки',
                    href: `/admin/restaurants/${id}/add/point`,
                    classes: hrefClass,
                }),
                new Href({
                    id: id + '_tag-href',
                    text: 'Изменение тегов',
                    href: `/admin/restaurants/${id}/change/tags`,
                    classes: hrefClass,
                }),
            ],
        }, id, template);
    }

    bind() {
        const me = this.domElement;
        me.onclick = () => {
            Array.prototype.forEach.call(
                document.getElementsByClassName('restaurant-item'),
                (li) => {
                    li.className = 'restaurant-item';
                },
            );

            me.classList.add('restaurant-item__clicked');
        };

        super.bind();
    }

    unbind() {
        const me = this.domElement;
        me.onclick = null;
        super.unbind();
    }
}
