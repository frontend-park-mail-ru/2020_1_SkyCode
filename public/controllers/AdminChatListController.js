import BaseController from './BaseController.js';
import ChatModel from '../models/ChatModel.js';
import AdminChatListView from '../render/views/AdminChatListView/AdminChatListView.js';
import EventBus from '../services/Events/EventBus';
import Event from '../services/Events/Events.js';

class AdminChatListController extends BaseController {
    constructor(title = 'chat list') {
        super(title);
    }

    execute() {
        ChatModel.getChats()
            .then((response) => {
                if (response.error) {
                    EventBus.publish(Event.setPage, {url: '/login'});
                }
                super.execute(new AdminChatListView({chatArray: response}));
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default new AdminChatListController();
