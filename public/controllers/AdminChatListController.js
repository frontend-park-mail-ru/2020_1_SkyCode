import BaseController from './BaseController.js';
import ChatModel from '../models/ChatModel.js';
import AdminChatListView from '../render/views/AdminChatListView/AdminChatListView.js';
import EventBus from '../services/Events/EventBus';

class AdminChatListController extends BaseController {
    constructor(title = 'chat list') {
        super(title);
    }

    execute() {
        ChatModel.getChats()
            .then((response) => {
                if (response.error) {
                    EventBus.publish('set-page', {url: '/login'});
                }
                console.log(response);
                super.execute(new AdminChatListView({chatArray: response}));
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default new AdminChatListController();
