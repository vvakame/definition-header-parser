module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        opt: {
            client: {
                "tsMain": "lib",
                "tsTest": "test/suite",
                "tsTestLib": "test/suite/libs",
                "peg": "resources",

                "jsTestOut": "test",
                "jsEspowerOut": "test/suiteEspowered"
            }
        },

        ts: {
            options: {
                compile: true,                 // perform compilation. [true (default) | false]
                comments: false,               // same as !removeComments. [true | false (default)]
                target: 'es5',                 // target javascript language. [es3 (default) | es5]
                module: 'commonjs',            // target javascript module style. [amd (default) | commonjs]
                noImplicitAny: true,
                sourceMap: true,              // generate a source map for every output js file. [true (default) | false]
                sourceRoot: '',                // where to locate TypeScript files. [(default) '' == source ts location]
                mapRoot: '',                   // where to locate .map.js files. [(default) '' == generated js location.]
                declaration: false             // generate a declaration .d.ts file for every output js file. [true | false (default)]
            },
            clientCli: {
                src: ['<%= opt.client.tsMain %>/Cli.ts']
            },
            clientMain: {
                src: ['<%= opt.client.tsMain %>/Api.ts']
            },
            clientTest: {
                src: ['<%= opt.client.tsTest %>/MainSpec.ts']
            }
        },
        tslint: {
            options: {
                formatter: "prose",
                configuration: grunt.file.readJSON('tslint.json')
            },
            files: {
                src: [
                    '<%= opt.client.tsMain %>/**/*.ts',
                    '!<%= opt.client.tsMain %>/PEG-definition.d.ts',
                    '<%= opt.client.tsTest %>/**/*.ts'
                ]
            }
        },
        espower: {
            test: {
                files: [
                    {
                        expand: true,        // Enable dynamic expansion.
                        cwd: '<%= opt.client.tsTest %>/',        // Src matches are relative to this path.
                        src: ['**/*.js'],    // Actual pattern(s) to match.
                        dest: '<%= opt.client.jsEspowerOut %>/',  // Destination path prefix.
                        ext: '.js'           // Dest filepaths will have this extension.
                    }
                ]
            }
        },
        tsd: {
            client: {
                options: {
                    // execute a command
                    command: 'reinstall',

                    //optional: always get from HEAD
                    latest: false,

                    // optional: specify config file
                    config: './tsd.json'
                }
            }
        },
        clean: {
            clientScript: {
                src: [
                    // client
                    '<%= opt.client.tsMain %>/*.js',
                    '<%= opt.client.tsMain %>/*.d.ts',
                    '<%= opt.client.tsMain %>/*.js.map',
                    '!<%= opt.client.tsMain %>/PEG-definition.d.ts',
                    // client test
                    '<%= opt.client.tsTest %>/*.js',
                    '<%= opt.client.tsTest %>/*.js.map',
                    '<%= opt.client.tsTest %>/*.d.ts',
                    // peg.js
                    '<%= opt.client.peg %>/grammer.js'
                ]
            },
            tsd: {
                src: [
                    // tsd installed
                    "typings/"
                ]
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'power-assert'
                },
                src: [
                    '<%= opt.client.tsMain %>/*.js',
                    '!<%= opt.client.tsMain %>/Cli.js',
                    '<%= opt.client.jsEspowerOut %>/*.js'
                ]
            }
        },
        exec: {
            "pegjs": {
                cmd: function () {
                    var peg = grunt.config.get("opt.client.peg") + "/";
                    return peg + "/parser-generator > " + peg + "/grammer.js";
                }
            }
        }
    });

    grunt.registerTask(
        'setup',
        ['clean', 'tsd']);

    grunt.registerTask(
        'default',
        ['clean:clientScript', 'exec:pegjs', 'ts', 'tslint']);

    grunt.registerTask(
        'test',
        ['default', 'espower', 'mochaTest']);

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
