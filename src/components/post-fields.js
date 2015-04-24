import Vue from 'vue';

Vue.component('post-field-string', {
	template: '{{name}}<input type="text" value="{{default}}" v-model="model">'
});

Vue.component('post-field-number', {
	template: '{{name}}<input type="number" v-model="model" number>'
});

Vue.component('post-field-color', {
	template: '{{name}}<input type="color" v-model="model"/>'
});

Vue.component('post-field-button', {
    template:'{{name}}<input type="button" v-model="model">'
});

Vue.component('post-field-checkbox', {
    template:'{{name}}<input type="checkbox" v-model="model">'
});
Vue.component('post-field-date', {
    template:'{{name}}<input type="date" v-model="model">'
});
Vue.component('post-field-time', {
    template:'{{name}}<input type="time" v-model="model">'
});
Vue.component('post-field-datetime', {
    template:'{{name}}<input type="datetime" v-model="model">'
});
Vue.component('post-field-datetime-local', {
    template:'{{name}}<input type="datetime-local" v-model="model">'
});
Vue.component('post-field-email', {
    template:'{{name}}<input type="email" v-model="model">'
});
Vue.component('post-field-file', {
    template:'{{name}}<input type="file" v-model="model">'
});
Vue.component('post-field-hidden', {
    template:'{{name}}<input type="hidden" v-model="model">'
});
Vue.component('post-field-image', {
    template:'{{name}}<input type="image" v-model="model">'
});
Vue.component('post-field-month', {
    template:'{{name}}<input type="month" v-model="model">'
});
Vue.component('post-field-password', {
    template:'{{name}}<input type="password" v-model="model">'
});
Vue.component('post-field-radio', {
    template:'{{name}}<input type="radio" v-model="model">'
});
Vue.component('post-field-range', {
    template:'{{name}}<input type="range" v-model="model">'
});
Vue.component('post-field-reset', {
    template:'{{name}}<input type="reset" v-model="model">'
});
Vue.component('post-field-search', {
    template:'{{name}}<input type="search" v-model="model">'
});
Vue.component('post-field-submit', {
    template:'{{name}}<input type="submit" v-model="model">'
});
Vue.component('post-field-tel', {
    template:'{{name}}<input type="tel" v-model="model">'
});
Vue.component('post-field-url', {
    template:'{{name}}<input type="url" v-model="model">'
});
Vue.component('post-field-week', {
    template:'{{name}}<input type="week" v-model="model">'
});

export function getComponentFromCode(code) {
    switch (code) {
        case 0:
            return 'post-field-string';
        case 1:
            return 'post-field-number';
        case 2:
            return 'post-field-button';
        case 3:
            return 'post-field-checkbox';
        case 4:
            return 'post-field-color';
        case 5:
            return 'post-field-date';
        case 6:
            return 'post-field-datetime';
        case 7:
            return 'post-field-datetime-local';
        case 8:
            return 'post-field-email';
        case 9:
            return 'post-field-file';
        case 10:
            return 'post-field-hidden';
        case 11:
            return 'post-field-image';
        case 12:
            return 'post-field-month';
        case 13:
            return 'post-field-password';
        case 14:
            return 'post-field-radio';
        case 15:
            return 'post-field-range';
        case 16:
            return 'post-field-reset';
        case 17:
            return 'post-field-search';
        case 18:
            return 'post-field-submit';
        case 19:
            return 'post-field-tel';
        case 20:
            return 'post-field-time';
        case 21:
            return 'post-field-url';
        case 22:
            return 'post-field-week';
        default:
            break;
    }
}

export var fieldTypeOptions = [
    {text: "Text", value: 0},
    {text: "Number", value: 1},
    {text: "Button", value: 2},
    {text: "Checkbox", value: 3},
    {text: "Color", value: 4},
    {text: "Date", value: 5},
    {text: "Time", value: 6},
    {text: "DateTime", value: 7},
    {text: "DateTime-Local", value: 8},
    {text: "Email", value: 9},
    {text: "File", value: 10},
    {text: "Hidden", value: 11},
    {text: "Image", value: 12},
    {text: "Month", value: 13},
    {text: "Password", value: 14},
    {text: "Radio", value: 15},
    {text: "Range", value: 16},
    {text: "Reset", value: 17},
    {text: "Search", value: 18},
    {text: "Submit", value: 19},
    {text: "Tel", value: 20},
    {text: "URL", value: 21},
    {text: "Week", value: 22}
];

