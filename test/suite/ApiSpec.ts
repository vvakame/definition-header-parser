/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/assert/assert.d.ts" />

import assert = require("power-assert");

import api = require("../../lib/Api");

module Test {
	"use strict";

	describe("api module", () => {
		describe("parse function", () => {
			it("parse single author data", () => {
				var input = [
					"// Type definitions for Atom",
					"// Project: https://atom.io/",
					"// Definitions by: vvakame <https://github.com/vvakame/>",
					"// Definitions: https://github.com/borisyankov/DefinitelyTyped"
				].join("\n") + "\n";
				var header = api.parse(input);

				assert(header.module.name === "Atom");
				assert(header.module.version === null);
				assert(header.project.url === "https://atom.io/");
				assert(header.authors.length === 1);
				assert(header.authors[0].name === "vvakame");
				assert(header.authors[0].url === "https://github.com/vvakame/");
				assert(header.definitions.url === "https://github.com/borisyankov/DefinitelyTyped");
			});

			it("parse multi author data (type div comma)", () => {
				var input = [
					"// Type definitions for Atom",
					"// Project: https://atom.io/",
					"// Definitions by: vvakame <https://github.com/vvakame/>, cat <http://www.tumblr.com/tagged/pretty-cat>",
					"// Definitions: https://github.com/borisyankov/DefinitelyTyped"
				].join("\n") + "\n";
				var header = api.parse(input);

				assert(header.module.name === "Atom");
				assert(header.module.version === null);
				assert(header.project.url === "https://atom.io/");
				assert(header.authors.length === 2);
				assert(header.authors[0].name === "vvakame");
				assert(header.authors[0].url === "https://github.com/vvakame/");
				assert(header.authors[1].name === "cat");
				assert(header.authors[1].url === "http://www.tumblr.com/tagged/pretty-cat");
				assert(header.definitions.url === "https://github.com/borisyankov/DefinitelyTyped");
			});

			it("parse multi author data (type div and)", () => {
				var input = [
					"// Type definitions for Atom",
					"// Project: https://atom.io/",
					"// Definitions by: vvakame <https://github.com/vvakame/> and cat <http://www.tumblr.com/tagged/pretty-cat>",
					"// Definitions: https://github.com/borisyankov/DefinitelyTyped"
				].join("\n") + "\n";
				var header = api.parse(input);

				assert(header.module.name === "Atom");
				assert(header.module.version === null);
				assert(header.project.url === "https://atom.io/");
				assert(header.authors.length === 2);
				assert(header.authors[0].name === "vvakame");
				assert(header.authors[0].url === "https://github.com/vvakame/");
				assert(header.authors[1].name === "cat");
				assert(header.authors[1].url === "http://www.tumblr.com/tagged/pretty-cat");
				assert(header.definitions.url === "https://github.com/borisyankov/DefinitelyTyped");
			});

			it("parse multi author data (type div linefeed)", () => {
				var input = [
					"// Type definitions for Atom",
					"// Project: https://atom.io/",
					"// Definitions by: vvakame <https://github.com/vvakame/>",
					"//                 cat <http://www.tumblr.com/tagged/pretty-cat>",
					"// Definitions: https://github.com/borisyankov/DefinitelyTyped"
				].join("\n") + "\n";
				var header = api.parse(input);

				assert(header.module.name === "Atom");
				assert(header.module.version === null);
				assert(header.project.url === "https://atom.io/");
				assert(header.authors.length === 2);
				assert(header.authors[0].name === "vvakame");
				assert(header.authors[0].url === "https://github.com/vvakame/");
				assert(header.authors[1].name === "cat");
				assert(header.authors[1].url === "http://www.tumblr.com/tagged/pretty-cat");
				assert(header.definitions.url === "https://github.com/borisyankov/DefinitelyTyped");
			});
		});

		describe("build function", () => {
			it("build single author data", () => {
				var result = api.build({
					module: {
						name: "Atom"
					},
					project: {
						url: "https://atom.io/"
					},
					authors: [
						{
							name: "vvakame",
							url: "https://github.com/vvakame/"
						}
					],
					definitions: {
						url: "https://github.com/borisyankov/DefinitelyTyped"
					}
				});

				var expected = [
					"// Type definitions for Atom",
					"// Project: https://atom.io/",
					"// Definitions by: vvakame <https://github.com/vvakame/>",
					"// Definitions: https://github.com/borisyankov/DefinitelyTyped"
				].join("\n") + "\n";

				assert(result === expected);
			});

			it("build multi author data", () => {
				var result = api.build({
					module: {
						name: "Atom"
					},
					project: {
						url: "https://atom.io/"
					},
					authors: [
						{
							name: "vvakame",
							url: "https://github.com/vvakame/"
						},
						{
							name: "cat",
							url: "http://www.tumblr.com/tagged/pretty-cat"
						}
					],
					definitions: {
						url: "https://github.com/borisyankov/DefinitelyTyped"
					}
				});

				var expected = [
					"// Type definitions for Atom",
					"// Project: https://atom.io/",
					"// Definitions by: vvakame <https://github.com/vvakame/>, cat <http://www.tumblr.com/tagged/pretty-cat>",
					"// Definitions: https://github.com/borisyankov/DefinitelyTyped"
				].join("\n") + "\n";

				assert(result === expected);
			});
		});

		describe("validate function", () => {
			it("ok", () => {
				var result = api.validate({
					module: {
						name: "Atom",
						version: "0.85.0"
					},
					project: {
						url: "https://atom.io/"
					},
					authors: [
						{
							name: "vvakame",
							url: "https://github.com/vvakame/"
						},
						{
							name: "cat",
							url: "http://www.tumblr.com/tagged/pretty-cat"
						}
					],
					definitions: {
						url: "https://github.com/borisyankov/DefinitelyTyped"
					}
				});
				assert(result.length === 0);
			});

			it("not exists header", () => {
				var result = api.validate(null);
				assert(result.length === 1);
			});

			it("not exists module", () => {
				var result = api.validate({
					module: null,
					project: {
						url: "https://atom.io/"
					},
					authors: [
						{
							name: "vvakame",
							url: "https://github.com/vvakame/"
						},
						{
							name: "cat",
							url: "http://www.tumblr.com/tagged/pretty-cat"
						}
					],
					definitions: {
						url: "https://github.com/borisyankov/DefinitelyTyped"
					}
				});
				assert(result.length === 1);
			});

			it("not exists module.name", () => {
				var result = api.validate({
					module: {
						name: null,
						version: "0.85.0"
					},
					project: {
						url: "https://atom.io/"
					},
					authors: [
						{
							name: "vvakame",
							url: "https://github.com/vvakame/"
						},
						{
							name: "cat",
							url: "http://www.tumblr.com/tagged/pretty-cat"
						}
					],
					definitions: {
						url: "https://github.com/borisyankov/DefinitelyTyped"
					}
				});
				assert(result.length === 1);
			});

			it("not exists project", () => {
				var result = api.validate({
					module: {
						name: "Atom",
						version: "0.85.0"
					},
					project: null,
					authors: [
						{
							name: "vvakame",
							url: "https://github.com/vvakame/"
						},
						{
							name: "cat",
							url: "http://www.tumblr.com/tagged/pretty-cat"
						}
					],
					definitions: {
						url: "https://github.com/borisyankov/DefinitelyTyped"
					}
				});
				assert(result.length === 1);
			});

			it("not exists project.url", () => {
				var result = api.validate({
					module: {
						name: "Atom",
						version: "0.85.0"
					},
					project: {
						url: null
					},
					authors: [
						{
							name: "vvakame",
							url: "https://github.com/vvakame/"
						},
						{
							name: "cat",
							url: "http://www.tumblr.com/tagged/pretty-cat"
						}
					],
					definitions: {
						url: "https://github.com/borisyankov/DefinitelyTyped"
					}
				});
				assert(result.length === 1);
			});

			it("authors.length is 0", () => {
				var result = api.validate({
					module: {
						name: "Atom",
						version: "0.85.0"
					},
					project: {
						url: "https://atom.io/"
					},
					authors: [],
					definitions: {
						url: "https://github.com/borisyankov/DefinitelyTyped"
					}
				});
				assert(result.length === 1);
			});

			it("not exists authors[0]", () => {
				var result = api.validate({
					module: {
						name: "Atom",
						version: "0.85.0"
					},
					project: {
						url: "https://atom.io/"
					},
					authors: [
						null,
						{
							name: "cat",
							url: "http://www.tumblr.com/tagged/pretty-cat"
						}
					],
					definitions: {
						url: "https://github.com/borisyankov/DefinitelyTyped"
					}
				});
				assert(result.length === 1);
			});

			it("not exists authors[1].name", () => {
				var result = api.validate({
					module: {
						name: "Atom",
						version: "0.85.0"
					},
					project: {
						url: "https://atom.io/"
					},
					authors: [
						{
							name: "vvakame",
							url: "https://github.com/vvakame/"
						},
						{
							name: null,
							url: "http://www.tumblr.com/tagged/pretty-cat"
						}
					],
					definitions: {
						url: "https://github.com/borisyankov/DefinitelyTyped"
					}
				});
				assert(result.length === 1);
			});

			it("not exists authors[1].url", () => {
				var result = api.validate({
					module: {
						name: "Atom",
						version: "0.85.0"
					},
					project: {
						url: "https://atom.io/"
					},
					authors: [
						{
							name: "vvakame",
							url: "https://github.com/vvakame/"
						},
						{
							name: "cat",
							url: null
						}
					],
					definitions: {
						url: "https://github.com/borisyankov/DefinitelyTyped"
					}
				});
				assert(result.length === 1);
			});

			it("not exists definitions", () => {
				var result = api.validate({
					module: {
						name: "Atom",
						version: "0.85.0"
					},
					project: {
						url: "https://atom.io/"
					},
					authors: [
						{
							name: "vvakame",
							url: "https://github.com/vvakame/"
						},
						{
							name: "cat",
							url: "http://www.tumblr.com/tagged/pretty-cat"
						}
					],
					definitions: null
				});
				assert(result.length === 1);
			});

			it("not exists definitions.url", () => {
				var result = api.validate({
					module: {
						name: "Atom",
						version: "0.85.0"
					},
					project: {
						url: "https://atom.io/"
					},
					authors: [
						{
							name: "vvakame",
							url: "https://github.com/vvakame/"
						},
						{
							name: "cat",
							url: "http://www.tumblr.com/tagged/pretty-cat"
						}
					],
					definitions: {
						url: null
					}
				});
				assert(result.length === 1);
			});
		});
	});
}
