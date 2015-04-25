import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/components/engine-form-builder.html!';
import {fieldTypeOptions} from 'components/post-fields';

Vue.component('b-engine-form-builder', {
    template: template,
    data: function() { return {
        fieldTypeOptions: fieldTypeOptions,
        field: {type: "", name: "", options: ""},
        fields: {}
    }},
    methods: {
        addField(e) {
            e.preventDefault();
            this.fields.$add(this.field.name, this.field);
            console.log(this.fields);
        },
        deleteField(name) {
            if (this.fields[name])
                this.fields.$delete(name);
        }
    }
});