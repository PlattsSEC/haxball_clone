module.exports = function(grunt) {

const PACKAGE = require("./package.json");

// All paths should end in "/". I'm lazy.

const SRC_DIR = "./src/";
const BUILD_DIR = "./build/";
const TMP_DIR = "./tmp/";

// Also, I'm adding an extra layer onto the build/src directories in case we
// ever want to build for a differenct platform.

const WWW_SRC = SRC_DIR + "www/";
const WWW_BUILD = BUILD_DIR + "www/";
const WWW_TMP = TMP_DIR + "www/";

// Now begins the clusterfuck.

var config = {};

config.sass = {};
config.sass.www = {
	files: [{
		options: {
			style: "compressed",
		},
		src: WWW_SRC + "css/style.scss",
		dest: WWW_BUILD + "css/style.min.css"
	}]
};

config.htmlmin = {};
config.htmlmin.www = {
	options: {
		removeComments: true,
		collapseWhitespace: true,
		conservativeCollapse: true,
		removeEmptyAttributes: true
	},
	src: WWW_SRC + "index.html",
	dest: WWW_BUILD + "index.html"
};

config.babel = {
	options: {
		sourceMap: true,
		presets: ['babel-preset-es2015']
  }
};
config.babel.www = {
	files: [{
		src: WWW_SRC + 'js/**/*.es2015',
		dest: WWW_TMP + "js/babel.es2015.js"
	}]
};

config.uglify = {
    options: {
		mangle: false,
		beautify: true
    }
};
config.uglify.www = {
	src: [WWW_SRC + 'js/**/*.js', WWW_TMP + "babel.es2015.js"],
	dest: WWW_BUILD + "js/script.min.js"
};

config.copy = {};
config.copy.www = {
	files: [{
		expand: true,
		cwd: WWW_SRC + 'js_ext/',
		src: '**/*',
		dest: WWW_BUILD + "js/"
	}, {
		expand: true,
		cwd: WWW_SRC + 'img/',
		src: '**/*.{svg,png,jpg,jpeg,gif}',
		dest: WWW_BUILD + "img/"
	}]
};

config['string-replace'] = {};
config['string-replace'].www = {
	files: [{
		src: WWW_BUILD + "index.html",
		dest: WWW_BUILD + "index.html"
	}],
	options: {
		replacements: [{
			pattern: '{{VERSION}}',
			replacement: PACKAGE.version
		}]
	}
};

grunt.initConfig(config);

require('load-grunt-tasks')(grunt); // Automatically loads all grunt tasks.
// jfc why isn't this just included by default

grunt.registerTask('default', [
	"www"
]);

grunt.registerTask('www', [
	'sass:www',
	'htmlmin:www',
	'babel:www',
	'uglify:www',
	'copy:www',
	'string-replace:www'
]);

};