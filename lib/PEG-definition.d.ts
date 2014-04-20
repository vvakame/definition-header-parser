declare module PEG {
	function parse(input: string): any;

	var SyntaxError: ISyntaxErrorStatic;

	interface ISyntaxErrorStatic {
		new (message: string, expected: string, found: string, offset: number, line: number, column: number): ISyntaxError;
	}

	interface ISyntaxError extends Error {
		message: string;
		expected: string;
		found: string;
		offset: number;
		line: number;
		column: number
	}
}
