class HTTPResponse {
    constructor(request) {
        this.status = request.status;
        this.headers = {
            get: function(name) {
                return request.getResponseHeader(name);
            }
        };
        this.data = (this.headers.get('Content-Type').indexOf('json') != -1)?
            JSON.parse(request.responseText) :
            request.response;
    }
}
class HTTP {
    request(method, url, data) {
        let self = this;
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.addEventListener('load', function() {
                let res = new HTTPResponse(this);
                if (res.status == 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
            req.addEventListener('error', function() {
                reject(res);
            });
            req.open(method, url, true);
            if (data) {
                req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                req.send(JSON.stringify(data));
            } else {
                req.send();
            }
        });
    }
    get(url) {
        return this.request('get', url);
    }
    post(url, data) {
        return this.request('post', url, data);
    }
    put(url, data) {
        return this.request('put', url, data);
    }
}

export default new HTTP();