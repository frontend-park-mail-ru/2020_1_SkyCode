import BaseController from './BaseController.js';
import ChatModel from '../models/ChatModel.js';
import AdminChatListView
    from '../render/views/AdminChatListView/AdminChatListView.js';
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
                    throw response.error;
                }
                super.execute(new AdminChatListView({chatArray: response.chats}));
            })
            .catch((err) => {
                console.log(err);
                EventBus.broadcast(Event.setPage, {url: '/'});
            });
    }
}

export default new AdminChatListController();
