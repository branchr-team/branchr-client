import http from 'http';

const base = 'http://localhost:3000';
//const base = 'https://branchr.herokuapp.com';

var engineCache = {};

export default {
    feed: {
        get: function(id) {
            return http.get(`${base}/feed/${id}`);
        },
        create: function(feed) {
            return http.post(`${base}/feed`, feed);
        },
        update: function(id, feed) {
            return http.put(`${base}/feed/${id}`, feed);
        },
        list: function() {
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
        }

    },
    engine: {
        get: function(engineId) {
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
        }
    }
}
