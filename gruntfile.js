module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		json_server: {
			dist: {
				options: {
	            	hostname: 'localhost',
					port: 5555,
	            	db: 'db.json'
				}
			}
		},
		sass_globbing: {
			dist: {
				files: {
					"source/css/main.css": [
						"source/css/**/*.css",
						"!source/css/main.css"
					]
				}
			}
		},
		postcss: {
			dist: {
				options: {
	            	map: false,
		            processors: [
		                require("postcss-import")(),
		                require("postcss-mixins")(),
		                require("postcss-custom-properties")(),
		                require("postcss-custom-media")(),
		                require("postcss-color-function")(),
		                require("postcss-nested")(),
		                require("postcss-calc")(),
		                require("autoprefixer")({
		                    browsers: 'last 2 versions'
		                }),
		                require('csswring')
		            ]
		        },
		        files: [
		            {
		                expand: false,
		                src: ["source/css/main.css"],
		                dest: "public/css/main.css",
		                ext: '.css'
		            }
		        ]
		    }
		},
		jspm: {
            dist: {
				options: {
	                sfx: false,
	                minify: false,
	                mangle: false
	            },
                files: {
                    "public/js/event-list-bundle.js": "source/js/events.js"
                }
            }
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							'source/js/jspm_packages/system.js',
							'source/js/config.js'
						],
						dest: 'public/js/',
					}
				],
			}
		},
		watch: {
			css: {
		        files: [
		        	"source/css/**/*.css",
		        	"!source/css/main.css"
		        ],
		        tasks: ["sass_globbing","postcss"],
		        options: {
		            "spawn": true
		        }
		    },
		    js: {
		        files: [
		        	"source/js/**/*.js",
		        	"!source/js/jspm_packages/**/*.js",
		        	"!source/js/config.js"
		        ],
		        tasks: ["jspm", "copy"],
		        options: {
		            "spawn": true
		        }		    	
		    }
		}
	});
	grunt.loadNpmTasks('grunt-json-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass-globbing');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-jspm');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default',['watch']);
};