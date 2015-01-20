path = require("path")
fs = require("fs")

module.exports = ->
  defaultConfigPath = path.normalize(path.join(process.env.HOME or process.env.HOMEPATH, ".csslintrc"))
  projectConfigPath = path.normalize(path.join(atom.project.getPath(), ".csslintrc"))
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
