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
                atom.workspaceView.prependToBottom('<div class="csslint tool-panel panel-bottom" />');
                atom.workspaceView.find('.csslint')
                    .append('<div class="panel-heading">CSSLint report <button type="button" class="close" aria-hidden="true">&times;</button></div>')
                    .append('<div class="panel-body padded" />');
                atom.workspaceView.find('.csslint .close').click(function () {
                    atom.workspaceView.find('.csslint').remove();
                });
            }
            if (result.messages.length === 0) {
                atom.workspaceView.find('.csslint .panel-body').html('<h1 class="text-success">√ No errors was found!</h1>');
            } else {
                for (i = 0; i < result.messages.length; i += 1) {
                    atom.workspaceView.find('.csslint .panel-body').append('<cite><address>line ' +  result.messages[i].line + ' charactor ' + result.messages[i].col  + '</address>' + result.messages[i].message + '</cite>');
                    atom.workspaceView.find('.csslint .panel-body').append('<pre>' + result.messages[i].evidence + '</pre>');
                }
            }

            atom.workspaceView.on('pane-container:active-pane-item-changed destroyed', function () {
                atom.workspaceView.find('.csslint').remove();
            });
        }
    }
};
