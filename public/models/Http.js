class Http {
    constructor() {
        this.serverPath = 'http://89.208.199.114:5000';
    }

    fetchRequest({path = '/', method = 'GET', body = null, headers = true, type = 'json'}) {
        const req = {
            method: method,
            mode: 'cors',
            credentials: 'include'
        };

        if (body != null) {
            req.body = body;
            if (headers === true) {
                if (type === 'json') {
                    req.headers = {
                        'Content-Type': 'application/json',
                    };
                }
            }

        }
        return fetch(`${this.serverPath}${path}`, req);
    }

    async fetchGet({path}) {
        return await this.fetchRequest({method: 'GET', path: path, m: 'cors'});
    }

    async fetchPost({path, body}) {
        return await this.fetchRequest({method: 'POST', path: path, body: body});
    }

    async fetchPut({path, body, type = 'json'}) {
        return await this.fetchRequest({method: 'PUT', path: path, body: body, type: type});
    }

    async fetchDelete({path, body}) {
        return await this.fetchRequest({method: 'DELETE', path: path, body: body});
    }

}

export default new Http();
