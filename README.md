# CSSLint

![](https://img.shields.io/apm/v/csslint.svg)
![](https://img.shields.io/apm/dm/csslint.svg)
![](https://img.shields.io/apm/l/csslint.svg)

> [CSSLint](https://github.com/stubbornella/csslint) error reports for your [Atom](http://atom.io) editor.

![preview](https://cloud.githubusercontent.com/assets/145288/5824124/9d6ddf2e-a0e2-11e4-8732-ef75c38c51d1.png)


## Installation

You can install this plugin via the Packages manager in Atom itself or manually through the terminal

```bash
$ apm install csslint
```

## Usage

CSSLint is by default validating on save (this can be changed in the package settings), you can also execute it by hitting `ctrl-alt-l`.

If you like you can even set it to validate while typing in the package settings.

A global [.csslintrc](https://github.com/ebednarz/csslintrc/blob/master/.csslintrc) config file can be placed in your home folder and used in any project. However you can specify a project .csslintrc config file (found in root folder of project) that takes precedence over the global file.

## Features

 * Validate on keymap (`ctrl-alt-l`)
 * Validate on command
 * Validate on save *(toggle in settings)*
 * Validate on change *(toggle in settings)*
 * Option to hide the error panel if no errors were found *(toggle in settings)*
 * Option to use `fold mode` by default *(toggle in settings)*
 * Supports [.csslintrc](https://github.com/ebednarz/csslintrc/blob/master/.csslintrc) config files *(project located file takes precedence over the global file)*

## License

[MIT](LICENSE.md) © tcarlsen
