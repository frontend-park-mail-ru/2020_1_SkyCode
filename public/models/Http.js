class Http {
    constructor() {
        this.serverPath = 'http://89.208.199.114:5000';
    }

    fetchRequest({
        path = '/',
        method = 'GET',
        body = null,
        headers = true,
        type = 'json',
    }) {
        const req = {
            method,
            mode: 'cors',
            credentials: 'include',
        };

        if (body != null) {
            req.body = body;
        }
        if (headers === true) {
            if (type === 'json') {
                req.headers = {
                    'Content-Type': 'application/json',
                    'X-Csrf-Token': localStorage.getItem('token'),
                };
            } else if (type === 'file') {
                req.headers = {
                    'X-Csrf-Token': localStorage.getItem('token'),
                };
            }
        }
        return fetch(`${this.serverPath}${path}`, req);
    }

    async fetchGet({path}) {
        return await this.fetchRequest({method: 'GET',
            path,
            m: 'cors'});
    }

    async fetchPost({path, body, type = 'json'}) {
        return await this.fetchRequest({method: 'POST',
            path,
            body,
            type});
    }

    async fetchPut({path, body, type = 'json'}) {
        return await this.fetchRequest({method: 'PUT',
            path,
            body,
            type});
    }

    async fetchDelete({path, body}) {
        return await this.fetchRequest({method: 'DELETE',
            path,
            body});
    }
}

export default new Http();
