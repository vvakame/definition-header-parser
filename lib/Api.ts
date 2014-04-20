"use strict";

import model = require("./Model");
import peg = require("./PEG");

export function parse(input:string):model.IHeader {
	"use strict";

	var syntaxTree: model.IHeader = peg.parse(input);
	return syntaxTree;
}

export function build(header:model.IHeader):string {
	"use strict";

	var result = "";

	result += buildModule(header.module) + "\n";
	result += buildProject(header.project) + "\n";
	result += buildAuthors(header.authors) + "\n";
	result += buildDefinitions(header.definitions) + "\n";

	return result;

	function buildModule(module:model.IModule):string {
		var result = "// Type definitions for " + module.name;
		if (module.version) {
			result += " " + module.version;
		}

		return result;
	}

	function buildProject(project:model.IProject):string {
		return "// Project: " + project.url;
	}

	function buildAuthors(authors:model.IAuthor[]):string {
		return "// Definitions by: " + authors.map(author => {
			return author.name + " <" + author.url + ">";
		}).join(", ");
	}

	function buildDefinitions(definitions:model.IDefinitions):string {
		return "// Definitions: " + definitions.url;
	}
}

export interface IValidateResult {
	location: string;
	reason: string;
}

export function validate(header:model.IHeader):IValidateResult[] {
	"use strict";

	var result:IValidateResult[] = [];

	if (!header) {
		result.push({
			location: "header",
			reason: "header is required"
		});
		return result;
	}
	if (!header.module) {
		result.push({
			location: "module",
			reason: "module is required"
		});
	}
	if (header.module && !header.module.name) {
		result.push({
			location: "module.name",
			reason: "module name is required"
		});
	}
	if (!header.project) {
		result.push({
			location: "project",
			reason: "project is required"
		});
	}
	if (header.project && !header.project.url) {
		result.push({
			location: "project.url",
			reason: "project url is required"
		});
	}
	if (!header.authors) {
		result.push({
			location: "authors",
			reason: "authors is required"
		});
	}
	if (header.authors && header.authors.length === 0) {
		result.push({
			location: "authors",
			reason: "authors length must greater 0"
		});
	}
	header.authors.forEach((author, i) => {
		if (!author) {
			result.push({
				location: "authors[" + i + "]",
				reason: "authors[" + i + "] can't be falsy"
			});
		}
		if (author && !author.name) {
			result.push({
				location: "authors[" + i + "].name",
				reason: "authors[" + i + "].name is required"
			});
		}
		if (author && !author.url) {
			result.push({
				location: "authors[" + i + "].url",
				reason: "authors[" + i + "].url is required"
			});
		}
	});
	if (!header.definitions) {
		result.push({
			location: "definitions",
			reason: "definitions is required"
		});
	}
	if (header.definitions && !header.definitions.url) {
		result.push({
			location: "definitions.url",
			reason: "definitions url is required"
		});
	}

	return result;
}
