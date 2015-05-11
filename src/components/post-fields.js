import Vue from 'vue';

import 'components/code-editor';

Vue.component('post-field-string', {
	template: '{{name}}<input type="text" value="{{default}}" v-model="model">'
});
Vue.component('post-field-number', {
	template: '{{name}}<input type="number" v-model="model" number>'
});
Vue.component('post-field-color', {
	template: '{{name}}<input type="color" v-model="model">'
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
//Vue.component('post-field-file', {
//    template:'{{name}}<input type="file" v-model="model">'
//});
//Vue.component('post-field-image', {
//    template:'{{name}}<input type="image" v-model="model">'
//});
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
    template:'{{name}}<input type="range" v-model="model" v-attr="min: params.min, max: params.max, step: params.step">'
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
Vue.component('post-field-code-shader', {
    template:'{{name}}<code-editor v-with="value: model" lang-type="shader"></code-editor>'
});

var fieldTypes = {
    0: {
        component: 'post-field-string',
        text: "Text"
    },
    1: {
        component: 'post-field-number',
        text: "Number"
    },
    2: {
        component: 'post-field-checkbox',
        text: "Checkbox"
    },
    3: {
        component: 'post-field-color',
        text: "Color"
    },
    4: {
        component: 'post-field-date',
        text: "Date"
    },
    5: {
        component: 'post-field-datetime',
        text: "Datetime"
    },
    6: {
        component: 'post-field-datetime-local',
        text: "Datetime Local"
    },
    7: {
        component: 'post-field-email',
        text: "Email"
    },
    //8: {
    //    component: 'post-field-file',
    //    text: "File"
    //},
    //9: {
    //    component: 'post-field-image',
    //    text: "Image"
    //},
    10: {
        component: 'post-field-month',
        text: "Month"
    },
    11: {
        component: 'post-field-password',
        text: "Password"
    },
    12: {
        component: 'post-field-radio',
        text: "Radio"
    },
    13: {
        component: 'post-field-range',
        text: "Range",
        params: ["min", "max", "step"]
    },
    15: {
        component: 'post-field-tel',
        text: "Phone Number"
    },
    16: {
        component: 'post-field-time',
        text: "Time"
    },
    17: {
        component: 'post-field-url',
        text: "URL"
    },
    18: {
        component: 'post-field-week',
        text: "Week"
    },
    19: {
        component: 'post-field-code-shader',
        text: "Shader Program"
    }
};

export var fieldTypeOptions = Object.keys(fieldTypes).map(key => {
    return {value: key, text: fieldTypes[key].text}
});

export function getComponentFromCode(code) {
    return fieldTypes[code].component;
}

