{MessagePanelView, PlainMessageView, LineMessageView} = require 'atom-message-panel'
config = require("./config")
cssLint = require("csslint").CSSLint
loophole = require("loophole").allowUnsafeEval
messages = new MessagePanelView
  title: "<span class=\"icon-bug\"></span> CSSLint report"
  rawTitle: true
  closeMethod: "destroy"

module.exports = ->
  editor = atom.workspace.getActiveTextEditor()

  return unless editor
  return unless editor.getGrammar().name is "CSS"

  content = editor.getText()
  result = loophole -> cssLint.verify content, config()

  messages.clear()
  messages.attach()
  messages.toggle() if atom.config.get "csslint.useFoldModeAsDefault"

  if result.messages.length is 0
    atom.config.observe "csslint.hideOnNoErrors", (value) ->
      if value is true
        messages.close()
      else
        messages.add new PlainMessageView
          message: "No errors were found!"
          className: "text-success"
  else
    for msg in result.messages
      messages.add new LineMessageView
        message: msg.message
        line: msg.line
        character: msg.col
        preview: msg.evidence.trim() if msg.evidence
        className: "text-#{msg.type}"

  atom.workspace.onDidChangeActivePaneItem ->
    messages.close()
