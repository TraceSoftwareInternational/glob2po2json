# Glob2PO2JSON

![NPM version](https://flat.badgen.net/npm/v/@tracesoftwareinternational/glob2po2json)

This package will let you "glob" some `.po` files and convert them into JSON files with same name as source files.

## Installation

`npm install @tracesoftware/glob2po2json`

## Usage

At this moment, only CLI usage is supported.

```
Usage: glob2po2json.js -i <folder> -o <folder>

Options:
  --version     Show version number
  -i, --input   Path to the .po files, a glob is also valid
  -o, --output  Path to the folder where the json file will be output
  -h, --help    Show help
```