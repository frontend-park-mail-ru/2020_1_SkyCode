import Http from './Http.js';

class ChatModel {
    getChats() {
        return Http.fetchGet({path: '/api/v1/chats'})
            .then((response) => {
                const token = response.headers.get('X-Csrf-Token');
                if (token) {
                    localStorage.setItem('token', token);
                }
                return response.json();
            });
    }
}

export default new ChatModel();
