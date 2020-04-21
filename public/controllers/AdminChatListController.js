import BaseController from './BaseController.js';
import ChatModel from '../models/ChatModel.js';
import AdminChatListView from '../render/views/AdminChatListView/AdminChatListView.js';

class AdminChatListController extends BaseController {
    constructor(title = 'chat list') {
        super(title);
    }

    execute() {
        ChatModel.getChats()
            .then((response) => {
                console.log(response);
                super.execute(new AdminChatListView({chatArray: response}));
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default new AdminChatListController();
