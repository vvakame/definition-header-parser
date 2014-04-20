# DefinitionHeadder parser [![Build Status](https://travis-ci.org/vvakame/definition-header-parser.svg)](https://travis-ci.org/vvakame/definition-header-parser)

## what is DefinitionHeader?

[here](https://github.com/borisyankov/DefinitelyTyped/wiki/How-to-contribute#header)

## How to develop?

```
$ git clone https://github.com/vvakame/definition-header-parser.git
$ cd definition-header-parser
$ npm install
$ grunt setup
$ grunt test
```

## usage

```
$ ./bin/dthp -h

  Usage: dthp [options]

  Options:

    -h, --help           output usage information
    -v, --version        output the version number
    -j, --json           output header json
    -o, --show-original  show original header
    -q, --quiet          quiet mode
```

```
$ ./bin/dthp dt/atom/atom.d.ts
// Type definitions for Atom
// Project: https://atom.io/
// Definitions by: vvakame <https://github.com/vvakame/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
```

```
$ ./bin/dthp dt/atom/atom.d.ts
// Type definitions for Atom
// Project: https://atom.io/
// Definitions by: vvakame <https://github.com/vvakame/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
```

```
$ ./bin/dthp --show-original dt/atom/atom.d.ts
original:

// Type definitions for Atom
// Project: https://atom.io/
// Definitions by: vvakame <https://github.com/vvakame/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


modified:

// Type definitions for Atom
// Project: https://atom.io/
// Definitions by: vvakame <https://github.com/vvakame/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
```

```
$ ./bin/dthp --json dt/atom/atom.d.ts
{
  "syntax": "Header",
  "line": 1,
  "column": 1,
  "offset": 0,
  "endPos": 19065,
  "module": {
    "syntax": "ModuleNameLine",
    "line": 1,
    "column": 1,
    "offset": 0,
    "endPos": 29,
    "name": "Atom",
    "version": null
  },
  "project": {
    "syntax": "ProjectInfoLine",
    "line": 2,
    "column": 1,
    "offset": 29,
    "endPos": 58,
    "url": "https://atom.io/"
  },
  "authors": [
    {
      "syntax": "AuthorInfo",
      "line": 3,
      "column": 20,
      "offset": 77,
      "endPos": 114,
      "name": "vvakame",
      "url": "https://github.com/vvakame/"
    }
  ],
  "definitions": {
    "syntax": "DefinitionsLine",
    "line": 4,
    "column": 1,
    "offset": 115,
    "endPos": 178,
    "url": "https://github.com/borisyankov/DefinitelyTyped"
  }
}
```
