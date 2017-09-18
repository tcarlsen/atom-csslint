path = require("path")
fs = require("fs")
os = require("os")

module.exports = ->
  defaultConfigPath = path.normalize(path.join(os.homedir(), ".csslintrc"))
  projectConfigPath = path.normalize(path.join(atom.project.getPaths()[0], ".csslintrc"))
  config = null

  try
    config = JSON.parse(fs.readFileSync(defaultConfigPath, "utf-8"))
  catch err
    console.log "Error reading config file \"" + defaultConfigPath + "\": " + err  if defaultConfigPath and err.code isnt "ENOENT"
  try
    config = JSON.parse(fs.readFileSync(projectConfigPath, "utf-8"))
  catch err
    console.log "Error reading config file \"" + projectConfigPath + "\": " + err  if projectConfigPath and err.code isnt "ENOENT"

  return config
