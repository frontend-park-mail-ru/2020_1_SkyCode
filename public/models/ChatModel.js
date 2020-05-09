import Http from './Http.js';

class ChatModel {
    getChats() {
        return Http.fetchGet({path: '/api/v1/chats'})
            .then((response) => response.json());
    }

    getChatHistory(chatId) {
        return Http.fetchGet({path: `/api/v1/chats/${chatId}/details`})
            .then((response) => response.json());
    }
}

export default new ChatModel();
