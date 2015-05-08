import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/pages/developer-tools.html!';
import {user} from 'services/auth';
import * as PostFields from 'components/post-fields';

import 'components/loading-content';
import 'components/code-editor';
import 'components/engine-form-builder';

export default Vue.extend({
    template: template,
    data() {return {
        stateParams: null,
        loadState: false,
        fieldTypeOptions: PostFields.fieldTypeOptions,
        tab: 0,
        feed: {
            name: ""
        },
        fields: [],
        js: '',
        html: '',
        css: ''
    }},
    methods: {
        getComponentFromCode: PostFields.getComponentFromCode,
        addField() {
            this.fields.push({
                key: '',
                type: 0
            })
        },
        removeField(i) {
            this.fields.splice(i, 1);
        },
        save() {
            APIService.engine.create({
                js: this.js,
                html: this.html,
                css: this.css,
                fields: this.fields,
                feed: this.feed._id
            }).then(resp => {
                this.feed.engine = resp.data._id;
                return APIService.feed.update(this.feed._id, this.feed);
            }).then(resp => {
                alert("Saved!");
            }).catch(resp => {
                alert("Something went wrong!");
                console.error(resp);
            });
        }
    },
    watch: {
        stateParams(stateParams) {
            if (stateParams[0] === "new")
                this.loadState = true;
            else
                APIService.feed.get(stateParams[0])
                    .then(resp => {
                        this.feed = resp.data;
                        return APIService.engine.get(resp.data.engine);
                    })
                    .then(resp => {
                        this.fields = resp.data.fields;
                        this.js = resp.data.js;
                        this.html = resp.data.html;
                        this.css = resp.data.css;
                        this.loadState = true;
                    });
        }
    }
});
