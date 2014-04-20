/// <reference path="../typings/node/node.d.ts" />
/// <reference path="./PEG-definition.d.ts" />

/* tslint:disable */
var vm = require("vm");
var fs = require("fs");

var fileName = __dirname + "/../resources/grammer.js";
var pegCode = fs.readFileSync(fileName, {encoding: "utf-8"});
/* tslint:enable */

var sandbox: { PEG: typeof PEG; } = <any>{};
vm.runInNewContext(pegCode, sandbox, "grammer.js");
var PEG: typeof PEG = sandbox.PEG;

export = PEG;
