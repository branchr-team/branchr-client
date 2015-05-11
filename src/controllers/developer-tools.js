import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/pages/developer-tools.html!';
import {user} from 'services/auth';
import * as PostFields from 'components/post-fields';

import 'components/loading-content';
import 'components/code-editor';
import 'components/engine-form-builder';
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
    data() {return {
        loadState: false,
        fieldTypeOptions: PostFields.fieldTypeOptions,
        tab: 0,
        force: false,
        fields: null,
        showPreview: false,
        feed: {
            name: ""
        },
        engine: {
            fields: [],
            js: '',
            html: '',
            css: ''
        }
    }},
    methods: {
        getComponentFromCode: PostFields.getComponentFromCode,
        addField() {
            this.engine.fields.push({
                key: '',
                type: 0
            })
        },
        removeField(i) {
            this.engine.fields.splice(i, 1);
        },
        save() {
            ((this.feed && this.feed._id)?
                APIService.feed.update(this.feed._id, this.feed) :
                APIService.feed.create(this.feed)
            ).then(resp => {
                    return APIService.feed.updateEngine(resp.data._id, {
                        js: this.engine.js,
                        html: this.engine.html,
                        css: this.engine.css,
                        fields: this.engine.fields,
                        feed: resp.data._id
                    }, this.force);
                }).then(resp => {
                    this.feed = resp.data;
                    alert("Saved!");
                }).catch(resp => {
                    alert("Something went wrong!");
                    console.error(resp);
                });
        },
        updatePreview() {
            this.$.preview.updateSrcdoc(fieldsToParams(this.fields));
            this.showPreview = true;
        },
        onRouteUpdate(stateParams, route) {
            if (route[1] === "new") {
                this.loadState = true;
                this.tab = 0;
                this.feed = {
                    name: ""
                };
                this.engine = {
                    fields: [],
                        js: '',
                        html: '',
                        css: ''
                };
            } else
                APIService.feed.get(stateParams[0])
                    .then(resp => {
                        this.feed = resp.data;
                        return APIService.engine.get(resp.data.engine);
                    })
                    .then(resp => {
                        this.engine.fields = resp.data.fields;
                        this.engine.js = resp.data.js;
                        this.engine.html = resp.data.html;
                        this.engine.css = resp.data.css;
                        this.loadState = true;
                    })
                    .catch(err => {
                        this.loadState = true;
                    });
        }
    },
    ready() {
        this.$watch('engine.fields', fields => {
            this.fields = this.engine.fields.map(f => {
                return {
                    component: PostFields.getComponentFromCode(f.type),
                    key: f.key,
                    name: f.key,
                    model: f.default || null
                };
            });
        }, true, true)
    }
});
