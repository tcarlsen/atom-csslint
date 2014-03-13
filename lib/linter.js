/*global atom, require, module*/

var CSSLINT = require('csslint').CSSLint;
var msgPanel = require('atom-message-panel');
var loophole = require('loophole').allowUnsafeEval;

module.exports = function () {
    'use strict';

    var editor = atom.workspace.getActiveEditor(),
        content,
        result,
        error,
        i;

    if (!editor) {
        return;
    }

    if (editor.getGrammar().name === 'CSS') {
        content = editor.getText();
        result = loophole(function () {
            return CSSLINT.verify(content);
        });

        if (atom.workspaceView.find('.am-panel').length !== 1) {
            msgPanel.init('CSSLint report');
        } else {
            msgPanel.clear();
        }

        if (result.messages.length === 0) {
            msgPanel.append.header('√ No errors were found!', 'text-success');
        } else {
            for (i = 0; i < result.messages.length; i += 1) {
                error = result.messages[i];

                if (error.evidence) {
                    error.evidence = error.evidence.trim();

                    msgPanel.append.lineMessage(error.line, error.col, error.message, error.evidence, 'text-error');
                }
            }
        }

        atom.workspaceView.on('pane-container:active-pane-item-changed destroyed', function () {
            msgPanel.destroy();
        });
    }
};
