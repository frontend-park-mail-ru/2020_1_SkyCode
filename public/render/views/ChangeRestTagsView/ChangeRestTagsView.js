import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import Order from '../../blocks/order/Order';
import Component from '../../Component';
import temp from './ChangeRestTagsView.hbs';
import Input from '../../elements/input/Input';
import NeonButton from '../../elements/neonButton/NeonButton';
import TagModel from '../../../models/TagModel';
import RestaurantModel from '../../../models/RestaurantModel';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';
import Router from '../../../routing/Router';

export default class ChangeRestTagsView extends BaseView {
    constructor({rest, tags, restTagIds}) {
        super({
            Main: new MainArea({
                rest,
                tags,
                restTagIds,
            }),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
            AddOnes: [
                new Order(),
            ],
        });
    }
}

class MainArea extends Component {
    constructor({rest, tags, restTagIds}) {
        const message = sessionStorage.message;
        sessionStorage.message = '';

        super('change-rest-tags-view', {
            message,
            rest,
        }, 'change-rest-tags-view', temp);

        const tagsComponents = [];

        tags.forEach((tagModel) => {
            tagsComponents.push(new Input({
                classes: 'change-rest-tags__checkbox',
                type: 'checkbox',
                value: tagModel.name,
                id: tagModel.id,
                isChecked: restTagIds.includes(tagModel.id),
            }));
        });

        this.addContextData({
            tagsComponents,
            Submit: new NeonButton({
                id: 'change-rest-tags__submit',
                text: 'Сохранить',
                callback: this.saveTags.bind(this),
            }),
        });

        this.restId = rest.id;
        this.allTagIds = tags.map((tagModel) => tagModel.id);
    }

    saveTags() {
        const selectedTagIds = this.context.tagsComponents
            .filter((tagComp) => tagComp.domElement.checked)
            .map((tagComp) => tagComp.domElement.id);

        Promise.all(this.allTagIds.map((tagId) => RestaurantModel.deleteTag(this.restId, tagId)))
            .then((resp) => console.log('tags deleted:\n' + resp))
            .then(() => Promise.all(selectedTagIds.map((tagId) => RestaurantModel.addTag(this.restId, tagId))))
            .then((resp) => console.log('tags added: \n' + resp))
            .catch((err) => console.log('error: \n' + err))
            .then(() => {
                Router.reload('Теги успешно изменены');
            });
    }
}
