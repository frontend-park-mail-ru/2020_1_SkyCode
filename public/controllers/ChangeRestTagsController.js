import BaseController from './BaseController';
import RestaurantModel from '../models/RestaurantModel';
import EventBus from '../services/Events/EventBus';
import Events from '../services/Events/Events';
import ChangeRestTagsView
    from '../render/views/ChangeRestTagsView/ChangeRestTagsView';
import TagModel from '../models/TagModel';

class ChangeRestTagsController extends BaseController {
    execute([restId]) {
        Promise.all([
            RestaurantModel
                .getRestaurant(restId),
            TagModel.all(),
            RestaurantModel.tags(restId),
        ])
            .then(([restResp, tagsResp, restTagsResp]) => {
                if (restResp.error) throw restResp.error;
                if (tagsResp.error) throw tagsResp.error;
                if (restTagsResp.error) throw tagsResp.error;
                if (restTagsResp.tags === null) restTagsResp.tags = [];

                super.execute(new ChangeRestTagsView({
                    rest: restResp,
                    tags: tagsResp.rest_tags,
                    restTagIds: restTagsResp.tags.map((tagModel) => tagModel.id),
                }));
            })
            .catch((err) => {
                console.log(err);
                EventBus.publish(Events.setPage, {url: '/'});
            });
    }
}

export default new ChangeRestTagsController();
