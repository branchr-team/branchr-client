import Vue from 'vue';
import APIService from 'services/api';
import {user} from 'services/auth';
import {debounce} from 'lib/util';

import CodeMirror from 'lib/CodeMirror/lib/codemirror';
import 'lib/CodeMirror/lib/codemirror.css!';
import 'lib/CodeMirror/theme/monokai.css!';

var modes = [
    'javascript',
    'htmlmixed',
    'css',
    'clike'
];
var modeMap = {
    'js': 'javascript',
    'html': 'htmlmixed',
    'shader': 'clike'
};
var keyMaps = [
    'default',
    'sublime',
    'vim'
];

Vue.component('code-editor', {
    template: '<div v-el="codemirror"></div>',
    paramAttributes: ['lang-type'],
    data: function() { return {
        editor: null,
        value: ''
    }},
    ready() {
        var deps = [];

        // Mode
        let mode = modeMap[this.langType] || this.langType;
        if (modes.indexOf(mode) == -1) return console.error("Bad mode", mode);
        else deps.push(`lib/CodeMirror/mode/${mode}/${mode}`);

        // Keymap
        let keyMap = function() {
            try {
                return user.settings.keyMap;
            } catch (e) {
                console.log('Could not find user keyMap setting, falling back to default');
                return 'default';
            }}();
        if (keyMaps.indexOf(keyMap) == -1) return console.error("Bad keyMap", keyMap);
        else if (keyMap !== 'default') deps.push(`lib/CodeMirror/keymap/${keyMap}`);

        Promise.all(deps.map(dep => System.import(dep))).then(() => {
            // Create CodeMirror instance
            this.editor = new CodeMirror(this.$$.codemirror, {
                value: this.value || "",
                mode: mode,
                keyMap: keyMap,
                lineNumbers: true,
                theme: "monokai",
                viewportMargin: Infinity
            });
            this.editor.save = () => {console.log("save");this.$emit("save");};
            // Register listener to bind with value
            this.editor.on('change', debounce(e => this.value = e.getValue(), 500));
        });

    },
    beforeDestroy() {
        this.editor.off('change');
    },
    watch: {
        value(v) {
            if (this.editor && v !== this.editor.getValue())
                this.editor.setOption('value', v);
        }
    }
});
