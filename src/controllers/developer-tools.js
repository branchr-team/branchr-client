import Vue from 'vue';
import APIService from 'services/api';
import template from 'templates/pages/developer-tools.html!';
import CodeMirror from 'lib/CodeMirror/lib/codemirror';
import 'lib/CodeMirror/mode/javascript/javascript';
import 'lib/CodeMirror/keymap/sublime';
import 'lib/CodeMirror/keymap/vim';

import 'lib/CodeMirror/theme/monokai.css!';
import 'lib/CodeMirror/lib/codemirror.css!';

var editor;

export default Vue.extend({
    template: template,
    data() {return {
        stateParams: null,
        keyMap: false
    }},
    methods: {
    },
    ready() {
        editor = CodeMirror(document.getElementById("codemirror"), {
            lineNumbers: true,
            theme: "monokai",
            mode: "javascript"
        });
    },
    watch: {
        stateParams(stateParams) {
            APIService.engine.get(stateParams[0]).then(resp => {
                editor.setOption('value', resp.data.js);
            });
        },
        keyMap(keyMap) {
            editor.setOption('keyMap', keyMap);
        }
    }
});
