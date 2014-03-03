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
            error,
            pre,
            i,
            addClick = function (pre, line, character) {
                pre.click(function () {
                    editor.cursors[0].setBufferPosition([line - 1, character - 1]);
                });
            };

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
            } else {
                atom.workspaceView.find('.csslint .panel-body').html('');
            }

            if (result.messages.length === 0) {
                atom.workspaceView.find('.csslint .panel-body').append('<h1 class="text-success">√ No errors was found!</h1>');
            } else {
                for (i = 0; i < result.messages.length; i += 1) {
                    error = result.messages[i];

                    atom.workspaceView.find('.csslint .panel-body')
                        .append('<div class="text-subtle inline-block">at line' + String(error.line) + ', character ' + String(error.col) + '</div>')
                        .append('<div class="text-error inline-block">' + error.message + '</div>')
                        .append('<pre>' + error.evidence.trim() + '</pre>');

                    pre = atom.workspaceView.find('.csslint .panel-body pre:last-child');

                    addClick(pre, error.line, error.col);
                }
            }

            atom.workspaceView.on('pane-container:active-pane-item-changed destroyed', function () {
                atom.workspaceView.find('.csslint').remove();
            });
        }
    }
};
