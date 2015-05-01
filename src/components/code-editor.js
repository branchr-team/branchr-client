import Vue from 'vue';
import APIService from 'services/api';
import {user} from 'services/auth';

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
            console.log(this.$el);
            // Create CodeMirror instance
            this.editor = new CodeMirror(this.$el, {
                value: this.value || "",
                mode: mode,
                keyMap: keyMap,
                lineNumbers: true,
                theme: "monokai"
            });
            // Register listener to bind with value
            this.editor.on('change', e => this.value = e.getValue());
        });

    },
    destroyed() {
        this.editor.off('change');
    },
    watch: {
        value(v) {
            if (this.editor && v !== this.editor.getValue())
                this.editor.setOption('value', v);
        }
    }
});