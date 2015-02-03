{MessagePanelView, PlainMessageView, LineMessageView} = require 'atom-message-panel'
config = require("./config")
cssLint = require("csslint").CSSLint
loophole = require("loophole").allowUnsafeEval
messages = new MessagePanelView
  title: "<span class=\"icon-bug\"></span> CSSLint report"
  rawTitle: true
  closeMethod: "destroy"
editor = null
content = null
result = null

module.exports = ->
  editor = atom.workspace.getActiveTextEditor()

  return unless editor
  return unless editor.getGrammar().name is "CSS"

  content = editor.getText()
  result = loophole -> cssLint.verify content, config()

  messages.clear()
  messages.attach()
  if atom.config.get("csslint.useFoldModeAsDefault") and messages.summary.css("display") is "none"
    messages.toggle()

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
