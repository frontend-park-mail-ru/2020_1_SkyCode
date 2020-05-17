import Component from '../../Component.js';
import template from './restaurantItem.hbs';
import Href from '../../elements/href/Href';

export default class RestaurantItem extends Component {
    constructor({classes, name, id}) {
        super(classes, {
            Name: name,
            GeoPointHref: new Href({
                id: id + 'geo-point-href',
                text: 'Добавление точки',
                href: `/admin/restaurants/${id}/add/point`,
                classes: 'admin-restaurant-list__href',
            }),
            TagsHref: new Href({
                id: id + 'tag-gref',
                text: 'Изменение тегов',
                href: `/admin/restaurants/${id}/change/tags`,
                classes: 'admin-restaurant-list__href',
            }),
        }, id, template);
    }

    showList() {
        this.context.GeoPointHref.domElement.style.display = 'block';
        this.context.TagsHref.domElement.style.display = 'block';
        this.isVisible = true;
    }

    hideList() {
        this.context.GeoPointHref.domElement.style.display = 'none';
        this.context.TagsHref.domElement.style.display = 'none';
        this.isVisible = false;
    }

    bind() {
        const node = this.domElement.firstElementChild;
        if (node === undefined) {
            return;
        }

        node.onclick = () => {
            if (this.isVisible) {
                this.hideList();
            } else {
                this.showList();
            }
        };

        super.bind();
        this.hideList();
    }

    unbind() {
        this.showList();
        const node = super.domElement.firstElementChild;
        if (node === undefined || this.callback === undefined) {
            return;
        }

        node.onclick = null;
        super.unbind();
    }
}
