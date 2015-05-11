import Vue from 'vue';
import APIService from 'services/api';
import * as AuthService from 'services/auth';
import template from 'templates/pages/new-post.html!';
import {stateParams} from 'lib/router';
import * as PostFields from 'components/post-fields';
import {debounce} from 'lib/util';

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
            loadState: false,
            showPreview: false,
            title: '',
            feed: null,
            engine: null,
            fields: null
        }
    },
    methods: {
        submit(e) {
            e.preventDefault();
            let contrib = {
                title: this.title,
                creator: AuthService.user._id,
                engine: this.engine._id,
                feed: this.feed._id,
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
        },
        onRouteUpdate(params) {
            APIService.feed.get(params[0])
                .then(resp => {
                    this.feed = resp.data;
                    return APIService.engine.get(resp.data.engine);
                })
                .then(resp => {
                    this.engine = resp.data;
                    this.fields = this.engine.fields.map(f => {
                        return {
                            component: PostFields.getComponentFromCode(f.type),
                            key: f.key,
                            name: f.key,
                            model: f.default || null
                        };
                    });
                    this.loadState = true;
                    this.$watch('fields', debounce(this.updatePreview, 500), true);
                });
        }
    }
});
