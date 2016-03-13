"use strict";

var fs = require("fs");
var projectStructure = JSON.parse(fs.readFileSync("Gruntfile.config.json"));

module.exports = function (grunt) {

    grunt.initConfig({

        jshint: {
            serverSide: {
                src: ['Gruntfile.js'],
                options: {
                    unused: true,
                    strict: true,
                    curly: true,
                    node: true
                }
            },
            clientSide: {
                src: [projectStructure.appJsFiles],
                options: {
                    unused: true,
                    strict: true,
                    curly: true,
                    browser: true
                }
            }
        },

        htmlhint: {
            options: {
                'attr-lower-case': true,
                'attr-value-not-empty': true,
                'tag-pair': true,
                'tag-self-close': true,
                'tagname-lowercase': true,
                'id-class-value': true,
                'id-class-unique': true,
                'src-not-empty': true,
                'img-alt-required': true
            },
            src: [projectStructure.htmlFiles]
        },

        // WARNING!!! html minification seems to be breaking link tags
        // <link /> to <link>; thymeleaf doesn't like that
        htmlmin: {
            dev: {
                options: {
                    //removeEmptyAttributes: true,
                    //removeEmptyElements: true,
                    //removeRedundantAttributes: true,
                    //removeComments: true,
                    // html and body are OPTIONAL, so will be removed by below option
                    // this will blow-up the thymeleaf engine, so careful with that
                    // removeOptionalTags: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/main/webapp/WEB-INF/',
                    dest: 'src/main/webapp/WEB-INF/',
                    src: ["*.html"],
                    ext: ".min.html",
                    extDot: "last"
                }]
            }
        },

        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2
                },
                files: projectStructure.lessToCssFiles
            },
            production: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: projectStructure.lessToCssFiles
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            development: {
                // the output files for development are the same as for uglify output
                // uglify will not be run for development
                files: [
                    {
                        src: projectStructure.libJsFiles,
                        dest: projectStructure.outputMinifyLibsJsPath
                    },
                    {
                        src: projectStructure.appJsFiles,
                        dest: projectStructure.outputMinifyAppJsPath
                    }
                ]
            },
            production: {
                files: [
                    {
                        src: projectStructure.libJsFiles,
                        dest: projectStructure.outputConcatLibsJsPath
                    },
                    {
                        src: projectStructure.appJsFiles,
                        dest: projectStructure.outputConcatAppJsPath
                    }
                ]
            }
        },

        uglify: {
            options: {
                /* options placeholder */
            },
            application: {
                files: [
                    {
                        src: projectStructure.outputConcatLibsJsPath,
                        dest: projectStructure.outputMinifyLibsJsPath
                    }
                ]
            },

            libraries: {
                files: [
                    {
                        src: projectStructure.outputConcatAppJsPath,
                        dest: projectStructure.outputMinifyAppJsPath
                    }
                ]
            }
        },

        copy: {
            main: {
                files: projectStructure.miscFilesToCopy
            }
        },

        watch: {
            javascript: {
                files: [
                    'project_structure.json',
                    '<%= jshint.clientSide.src %>',
                    '<%= jshint.serverSide.src %>'],
                tasks: ['jshint', 'concat:development']
            },
            html: {
                files: [projectStructure.htmlFiles],
                tasks: ['htmlhint']
            },
            css: {
                files: [projectStructure.lessFiles],
                tasks: ['less:development']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default',
        ['jshint', 'htmlhint', 'less:development', 'concat:development', 'copy', 'watch']);

    grunt.registerTask('development', ['default']);
    grunt.registerTask('production',
        ['jshint', 'htmlhint', 'less:production', 'concat:production', 'uglify', 'copy']);
};

