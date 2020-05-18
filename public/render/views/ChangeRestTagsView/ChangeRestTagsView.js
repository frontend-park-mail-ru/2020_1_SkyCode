import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import Order from '../../blocks/order/Order';
import Component from '../../Component';
import temp from './ChangeRestTagsView.hbs';
import Input from '../../elements/input/Input';
import NeonButton from '../../elements/neonButton/NeonButton';

export default class ChangeRestTagsView extends BaseView {
    constructor({restaurant}) {
        super({
            Main: new MainArea({restaurant}),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
            AddOnes: [
                new Order(),
            ],
        });
    }
}

class MainArea extends Component {
    constructor({restaurant, tagsArr = []}) {
        super('change-rest-tags-view', {
            rest: restaurant,
        }, 'change-rest-tags-view', temp);

        const tagsComponents = [];
        const allTags = [{
            id: 1,
            name: 'Все',
        }, {
            id: 2,
            name: 'Бургеры',
        }, {
            id: 3,
            name: 'Пицца',
        }, {
            id: 4,
            name: 'Азия',
        }, {
            id: 5,
            name: 'Барбекю',
        }, {
            id: 6,
            name: 'Десерты',
        }, {
            id: 7,
            name: 'Тай',
        }, {
            id: 8,
            name: 'Суши',
        }];

        allTags.forEach((tagModel) => {
            tagsComponents.push(new Input({
                classes: 'change-rest-tags__checkbox',
                type: 'checkbox',
                value: tagModel.name,
                id: tagModel.id,
                isChecked: tagsArr.includes(tagModel.id),
            }));
        });

        this.addContextData({
            tagsComponents,
            Submit: new NeonButton({
                text: 'Сохранить',
                callback: this.saveTags.bind(this),
            }),
        });
    }

    saveTags() {

    }
}
