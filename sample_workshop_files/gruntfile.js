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
		babel: {
		    dist: {
		        files: [
		            {
		                expand: true,
		                cwd: "source/js",
		                src: [
		                    '**/*.js'
		                ],
		                dest: "public/js",
		                ext: '.js'
		            }
		        ]
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
		        	"source/js/**/*.js"
		        ],
		        tasks: ["babel"],
		        options: {
		            "spawn": true
		        }
		    }
		}
	});
	grunt.loadNpmTasks('grunt-json-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-babel');
	grunt.registerTask('default',['watch']);
};