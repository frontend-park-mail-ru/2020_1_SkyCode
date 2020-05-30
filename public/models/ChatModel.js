import Http from './Http.js';

class ChatModel {
    getChats() {
        return Http.fetchGet({path: '/api/v1/chats'});
    }

    getChatHistory(chatId) {
        return Http.fetchGet({path: `/api/v1/chats/${chatId}/details`});
    }
}

export default new ChatModel();
