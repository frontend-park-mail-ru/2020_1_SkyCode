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
        const response = await this.fetchRequest({method: 'GET',
            path,
            m: 'cors',
        });

        Http.retreiveCSRFToken(response);
        return response;
    }

    async fetchPost({path, body, type = 'json'}) {
        const response = await this.fetchRequest({method: 'POST',
            path,
            body,
            type,
        });

        Http.retreiveCSRFToken(response);
        return response;
    }

    async fetchPut({path, body, type = 'json'}) {
        const response = await this.fetchRequest({method: 'PUT',
            path,
            body,
            type,
        });

        Http.retreiveCSRFToken(response);
        return response;
    }

    async fetchDelete({path, body}) {
        const response = await this.fetchRequest({method: 'DELETE',
            path,
            body,
        });

        Http.retreiveCSRFToken(response);
        return response;
    }

    static retreiveCSRFToken(response) {
        const token = response.headers.get('X-Csrf-Token');
        if (token) {
            localStorage.setItem('token', token);
        }

        return response;
    }
}

export default new Http();
