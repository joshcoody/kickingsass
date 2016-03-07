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
	                mangle: false,
	                inject: true
	            },
                files: {
                    "source/js/eventsListBundle.js": "source/js/events.js",
                    "source/js/eventDetailBundle.js": "source/js/detail.js",
                    "source/js/favoritesListBundle.js": "source/js/favorites.js"
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
							'source/js/config.js',
							'source/js/eventsListBundle.js',
							'source/js/eventDetailBundle.js',
							'source/js/favoritesListBundle.js'
						],
						dest: 'public/js/',
					}
				],
			}
		},
		watch: {
			css: {
		        files: [
		        	"source/css/**/*.css"
		        ],
		        tasks: ["postcss"],
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
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-jspm');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default',['watch']);
};