#!/usr/bin/env node

const glob = require("glob");
const po2json = require("po2json");
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");

const argv = yargs
    .wrap(yargs.terminalWidth())
    .usage('Usage: $0 -i <folder> -o <folder>')
    .options('i', {
        alias: 'input',
        demandOption: true,
        describe: 'Path to the .po files, a glob is also valid',
        requiresArg: true,
        string: true
    })
    .options('o', {
        alias: 'output',
        demandOption: true,
        describe: 'Path to the folder where the json file will be output',
        requiresArg: true,
        string: true
    })
    .help('h')
    .alias('h', 'help')
    .argv;

const paths = glob.sync(argv.input);

for (const poFilePath of paths) {
    const splittedPath = poFilePath.split('/');
    const fileName = splittedPath.slice(-1).join('/');

    let jsonContents;

    try {
        jsonContents = po2json.parseFileSync(path.resolve(poFilePath), {
            format: "mf",
            stringify: true
        });
    } catch (error) {
        console.error(`Something went wrong with ${poFilePath}`);
        process.exit(1);
    }

    const jsonFileName = fileName.split(".")[0] + '.json'

    try {
        fs.writeFileSync(path.resolve(argv.output, jsonFileName), jsonContents);
    } catch (error) {
        console.error(`Something went wrong while writing ${jsonFileName}`);
        process.exit(1);
    }
}
