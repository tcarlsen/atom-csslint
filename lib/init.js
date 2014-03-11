/*global atom, require, module*/

var linter = require('./linter');

module.exports = {
    configDefaults: {
        validateOnSave: true,
        validateOnChange: false
    },
    activate: function () {
        'use strict';

        atom.workspaceView.command('csslint', linter);

        atom.config.observe('csslint.validateOnSave', {callNow: true}, function (value) {
            if (value === true) {
                atom.workspace.eachEditor(function (editor) {
                    editor.buffer.on('saved', linter);
                });
            } else {
                atom.workspace.eachEditor(function (editor) {
                    editor.buffer.off('saved', linter);
                });
            }
        });

        atom.config.observe('csslint.validateOnChange', {callNow: true}, function (value) {
            if (value === true) {
                atom.workspace.eachEditor(function (editor) {
                    editor.buffer.on('contents-modified', linter);
                });
            } else {
                atom.workspace.eachEditor(function (editor) {
                    editor.buffer.off('contents-modified', linter);
                });
            }
        });
    }
};
