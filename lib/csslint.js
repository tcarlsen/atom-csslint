/*global atom, require, module*/

var CSSLINT = require('csslint').CSSLint;

module.exports = {
    activate: function () {
        'use strict';

        return atom.workspaceView.command('csslint', this.lint);
    },
    lint: function () {
        'use strict';

        var editor = atom.workspace.getActiveEditor(),
            content = editor.getText(),
            langues = editor.getGrammar().name,
            result,
            i;

        if (langues === 'CSS') {
            result = CSSLINT.verify(content);

            if (atom.workspaceView.find('.csslint').length !== 1) {
                atom.workspaceView.prependToBottom('<div class="csslint tool-panel panel-bottom padded"></div>');
            } else {
                atom.workspaceView.find('.csslint').html('');
            }

            for (i = 0; i < result.messages.length; i += 1) {
                atom.workspaceView.find('.csslint').append('<cite><address>line ' +  result.messages[i].line + ' charactor ' + result.messages[i].col  + '</address>' + result.messages[i].message + '</cite>');
                atom.workspaceView.find('.csslint').append('<pre>' + result.messages[i].evidence + '</pre>');
            }

        }
    }
};
