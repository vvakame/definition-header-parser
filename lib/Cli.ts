/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/commander/commander.d.ts" />

import program = require("commander");
import fs = require("fs");
import api = require("./Api");

var packageJson:any = JSON.parse(fs.readFileSync(__dirname + "/../package.json", "utf8"));

(<any>program)
	.version(packageJson.version, "-v, --version")
	.option("-j, --json", "output header json")
	.option("-o, --show-original", "show original header")
	.option("-q, --quiet", "quiet mode")
	.parse(process.argv);

var quiet = !!(<any>program).quiet;
var jsonOutput = !!(<any>program).json;
var showOriginal = !!(<any>program).showOriginal;
var fileList:string[] = (<any>program).args;

fileList.forEach(fileName => {
	if (!fs.existsSync(fileName)) {
		console.error(fileName + " is not exists");
		process.exit(1);
		return;
	}

	var content = fs.readFileSync(fileName, {encoding: "utf-8"});
	/* tslint:disable */
	try {
		var result = api.parse(content);
	} catch (e) {
		console.error(fileName + " is invalid format.\n");
		throw e;
	}
	/* tslint:enable */

	if (jsonOutput) {
		console.log(JSON.stringify(result, null, 2));

	} else if (!quiet && showOriginal) {
		console.log("original:\n");
		console.log(content.substr(result.offset, result.definitions.endPos).trim());
		console.log("\n");
		console.log("modified:\n");
		console.log(api.build(result));

	} else if (!quiet) {
		console.log(api.build(result));
	}
});
