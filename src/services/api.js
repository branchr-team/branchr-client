import {HTTP} from 'http';
import {vm} from 'main';

//const base = 'http://localhost:3000';
const base = 'https://branchr.herokuapp.com';

var httpNoAuth = new HTTP();

var http = new HTTP([
    function(resp, next, retry) {
        if (resp.status === 401 && resp.retryCount <= 3)
            vm.openLoginDialog("You must login first!").then(() => {
                console.log(`Auth: ${resp.retryCount} Retrying!`);
                retry();
            });
        else next();
    }
]);

export function setAuthHeaders(username, token) {
    http.setHeader('X-Username', username);
    http.setHeader('X-Token', token);
}

var engineCache = {};

export default {
    login(username, password) {
        return httpNoAuth.post(`${base}/login`, {username: username, password: password})
            .then(resp => {
                console.log('Got token: ', resp.data.token);
                setAuthHeaders(username, resp.data.token);
                return resp;
            });
    },
    logout(username) {
        return http.post(`${base}/logout`, {username: username})
            .then(resp => {
                http.setHeader('X-Username', null);
                http.setHeader('X-Token', null);
                return resp;
            });
    },
    feed: {
        get(id) {
            return http.get(`${base}/feed/${id}`);
        },
        create(feed) {
            return http.post(`${base}/feed`, feed);
        },
        update(id, feed) {
            return http.put(`${base}/feed/${id}`, feed);
        },
        updateEngine(id, engine) {
            return http.put(`${base}/feed/${id}/engine`, engine);
        },
        list() {
            return http.get(`${base}/feed/`);
        }
    },
    contrib: {
        get(contribId) {
            return http.get(`${base}/contrib/${contribId}`);
        },
        create(contrib) {
            return http.post(`${base}/contrib`, contrib);
        },
        delete(contribId) {
            return http.delete(`${base}/contrib/${contribId}`);
        },
        listByFeedId(feedId) {
            return http.get(`${base}/contrib/?feedId=${feedId}`);
        },
        list() {
            return http.get(`${base}/contrib/`);
        },
        vote(contribId, vote) {
            return http.post(`${base}/contrib/${contribId}/vote/${vote}`);
        }
    },
    engine: {
        get(engineId) {
            if (engineId in engineCache) {
                // Cache hit
                console.log('Cache hit!', engineId);
                return Promise.resolve(engineCache[engineId]);
            } else {
                // Cache miss
                console.log('Cache miss!', engineId);
                return http.get(`${base}/engine/${engineId}`)
                    .then(engine => {
                        engineCache[engineId] = engine;
                        return engine;
                    });
            }
        },
        create(engine) {
            return http.post(`${base}/engine`, engine);
        }
    }
}
