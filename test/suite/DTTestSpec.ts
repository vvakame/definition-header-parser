/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/assert/assert.d.ts" />

/// <reference path="../../typings/glob/glob.d.ts" />
/// <reference path="../../typings/minimatch/minimatch.d.ts" />

import assert = require("power-assert");

import glob = require("glob");
import minimatch = require("minimatch");

import fs = require("fs");

import peg = require("../../lib/PEG");
import model = require("../../lib/Model");

module Test {
	"use strict";

	describe("Test for DefinitelyTyped", () => {
		var fileList = glob.sync("./dt/**/*.d.ts")
			.filter(fileName => minimatch.match([fileName], "./dt/_infrastructure/**/*.d.ts", {}).length === 0);

		var excludeList = [
			// not target
			"yui/yui-test.d.ts",
			"test-module/test-module.d.ts",
			// malformed header format
			"angular-translate/angular-translate.d.ts",
			"angular-ui/angular-ui-router.d.ts",
			"angularjs/angular-animate.d.ts",
			"angularjs/angular-cookies.d.ts",
			"angularjs/angular-route.d.ts",
			"angularjs/angular-scenario.d.ts",
			"angularjs/legacy/angular-cookies-1.0.d.ts",
			"angularjs/legacy/angular-scenario-1.0.d.ts",
			"asciify/asciify.d.ts",
			"assert/assert.d.ts",
			"casperjs/casperjs.d.ts",
			"chai-fuzzy/chai-fuzzy-assert.d.ts",
			"chai/chai-assert.d.ts",
			"createjs/createjs.d.ts",
			"createjs-lib/createjs-lib.d.ts",
			"d3/plugins/d3.superformula.d.ts",
			"dcjs/dc.d.ts",
			"dock-spawn/dock-spawn.d.ts",
			"domready/domready.d.ts",
			"filesystem/filesystem.d.ts",
			"filewriter/filewriter.d.ts",
			"ftdomdelegate/ftdomdelegate.d.ts",
			"gldatepicker/gldatepicker.d.ts",
			"googlemaps.infobubble/google.maps.infobubble.d.ts",
			"i18next/i18next.d.ts",
			"ix.js/ix.d.ts",
			"ix.js/l2o.d.ts",
			"jasmine-matchers/jasmine-matchers.d.ts",
			"jqrangeslider/jqrangeslider.d.ts",
			"jquery.address/jquery.address.d.ts",
			"jquery.colorbox/jquery.colorbox.d.ts",
			"jquery.cycle/jquery.cycle.d.ts",
			"jquery.cycle2/jquery.cycle2.d.ts",
			"jquery.dynatree/jquery.dynatree.d.ts",
			"jquery.menuaim/jquery.menuaim.d.ts",
			"jquery.pnotify/jquery.pnotify.d.ts",
			"jquery.tagsmanager/jquery.tagsmanager.d.ts",
			"jquery.timepicker/jquery.timepicker.d.ts",
			"jquery.ui.datetimepicker/jquery.ui.datetimepicker.d.ts",
			"jquery.validation/jquery.validation.d.ts",
			"jquery.watermark/jquery.watermark.d.ts",
			"jsplumb/jquery.jsPlumb.d.ts",
			"jsrender/jsrender.d.ts",
			"karma-jasmine/karma-jasmine.d.ts",
			"knockout.mapper/knockout.mapper.d.ts",
			"knockout.mapping/knockout.mapping.d.ts",
			"kolite/kolite.d.ts",
			"linq/linq.3.0.3-Beta4.d.ts",
			"linq/linq.d.ts",
			"linq/linq.jquery.d.ts",
			"microsoft-live-connect/microsoft-live-connect.d.ts",
			"moment/moment.d.ts",
			"mousetrap/mousetrap.d.ts",
			"node/node-0.8.8.d.ts",
			"node/node.d.ts",
			"phantomjs/phantomjs.d.ts",
			"promises-a-plus/promises-a-plus.d.ts",
			"q/Q.d.ts",
			"raphael/raphael.d.ts",
			"rx.js/rx-lite.d.ts",
			"rx.js/rx.async-lite.d.ts",
			"rx.js/rx.backpressure-lite.d.ts",
			"rx.js/rx.binding-lite.d.ts",
			"rx.js/rx.time-lite.d.ts",
			"scroller/easyscroller.d.ts",
			"scroller/scroller.d.ts",
			"should/should.d.ts",
			"state-machine/state-machine.d.ts",
			"svgjs.draggable/svgjs.draggable.d.ts",
			"titanium/titanium.d.ts",
			"underscore-ko/underscore-ko.d.ts",
			"unity-webapi/unity-webapi.d.ts",
			"viewporter/viewporter.d.ts",
			"webaudioapi/waa-20120802.d.ts",
			"webaudioapi/waa-nightly.d.ts"
		];

		fileList.forEach(fileName => {
			var _: (expectation: string, assertion?: () => void) => void;
			if (excludeList.every(exclude => fileName.indexOf(exclude) === -1)) {
				_ = it;
			} else {
				_ = it.skip;
			}
			_("DT " + fileName, () => {
				var content = fs.readFileSync(fileName, {encoding: "utf-8"});
				var syntaxTree: model.IHeader = peg.parse(content);

				assert(syntaxTree.module);
				assert(syntaxTree.module.name);
				assert(syntaxTree.project);
				assert(syntaxTree.project.url);
				assert(syntaxTree.authors);
				assert(syntaxTree.authors.length !== 0);
				syntaxTree.authors.forEach(author => {
					assert(author.name);
					assert(author.url);
				});
				assert(syntaxTree.definitions);
				assert(syntaxTree.definitions.url);
			});
		});
	});
}
