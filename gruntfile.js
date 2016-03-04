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
		compass: {
			dist: {
				options: {
					sassDir: 'source/sass/',
					cssDir: 'public/css',
					outputStyle: 'compressed',
					require: [
						'compass-normalize'
					]
    			}
			}
		},
		watch: {
			css: {
				files: 'source/sass/**/*.scss',
				tasks: ['compass']
			},
			options: {
				"spawn": true
			}
		}
	});
	grunt.loadNpmTasks('grunt-json-server');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
};