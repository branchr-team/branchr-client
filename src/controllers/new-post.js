import Vue from 'vue';
import APIService from 'services/api';
import * as AuthService from 'services/auth';
import template from 'templates/pages/new-post.html!';
import {stateParams} from 'lib/router';
import * as PostFields from 'components/post-fields';

import 'components/loading-content';
import 'components/contrib';
import 'components/post-fields';

function fieldsToParams(fields = []) {
    fields = fields || [];
    return fields.reduce((prev, cur) => {
        prev[cur.key] = cur.model;
        return prev;
    }, {});
}

export default Vue.extend({
    template: template,
    data() {
        return {
            stateParams: null,
            loadState: false,
            showPreview: false,
            feed: null,
            engine: null,
            fields: null
        }
    },
    methods: {
        submit(e) {
            e.preventDefault();
            let contrib = {
                userId: AuthService.user._id,
                engineId: this.engine._id,
                feedId: this.feed._id,
                params: fieldsToParams(this.fields)
            };
            APIService.contrib.create(contrib)
                .then(() => {
                    window.location.href = `#/feed/${this.feed._id}`;
                });
        },
        updatePreview() {
            this.$.preview.updateSrcdoc(fieldsToParams(this.fields));
            this.showPreview = true;
        }
    },
    watch: {
        stateParams(stateParams) {
            APIService.feed.get(stateParams[0])
                .then(resp => {
                    this.feed = resp.data;
                    return APIService.engine.get(resp.data.engineId);
                })
                .then(resp => {
                    this.engine = resp.data;
                    this.fields = this.engine.fields.map(f => {
                        return {
                            component: PostFields.getComponentFromCode(f.type),
                            default: f.default,
                            key: f.key,
                            name: f.key,
                            model: null
                        };
                    });
                    this.loadState = true;
                });
        }
    }
});
