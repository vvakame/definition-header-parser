/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/assert/assert.d.ts" />

import assert = require("power-assert");

module Test {
	"use strict";

	describe("sample describe", () => {
		it("sample it", () => {
			assert([1, 2, 3].length === 3);
		});
	});
}
