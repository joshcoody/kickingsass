# Kicking Sass: How to Write CSS in a PostCSS World

For years, front-end developers have turned to preprocessors like Sass and CoffeeScript to fill in the gaps in native CSS and JavaScript. Although these tools have transformed and enhanced the way we write code, they've also forced us to work in nonstandard syntaxes, bouncing from one compiler to the next as we try to find the perfect build process. But what if there's a better way? Learn how postprocessors and transpilers can revolutionize your code and workflow. If the idea of writing proposed CSS4 and ES7 code today without compromising browser support sounds crazy, you're in for a surprise.

## Understanding the Git branches
Throughout the course of the workshop, we'll take a project built with Sass and jQuery and rebuild it using PostCSS, System.js and JSPM. The workshop will be broken up into several different stages, each of which corresponds with a Git branch:

* **[step1](https://github.com/degdigital/kickingsass):** Start with this branch. CSS is written in Sass, and JavaScript uses jQuery with no script loader or ES6 transpiler.
* **[step2](https://github.com/degdigital/kickingsass/tree/step2):** Sass removed, and PostCSS added.
* **[step3](https://github.com/degdigital/kickingsass/tree/step3):** jQuery removed, and Babel added.
* **[step4](https://github.com/degdigital/kickingsass/tree/step4):** Final branch. Babel removed, and System.js and JSPM added.

If at any time you lose your place, just check out the corresponding branch to catch back up with the completed code.

## Software Requirements

In order to follow along with the workshop sample project, you will need to have installed:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)

All other dependencies are defined in the package.json file and will be installed during the workshop.

Also, make sure you have:
* A web browser (preferably Chrome)
* A text editor
* A terminal
* Admin rights to your computer

## Step 1 Instructions
In (roughly) this order, complete the following steps to advance to Step 2:

1. **Stop:**
    * watch task
2. **Delete files:**
    * Gemfile
    * Gemfile.lock
3. **Empty files:**
    * /public/css/main.css
4. **Add files:**
    * Manually add a reset.css file to /source/css (https://necolas.github.io/normalize.css/3.0.3/normalize.css)
    * Manually add a mixins.css file to /source/css
5. **Rename files/folders:**
    * /source/sass directory to /source/css
    * All /source/css file extensions to .css
    * All /source/css files should not have "_" before file name
    * Make sure /source/css/reset.css is reset.css
6. **Change in package.json:**
    * "version": "2.0.0"
7. **Remove from package.json:**
    * "grunt-contrib-compass": "~1.1.0"
8. **Add to package.json:**
    * "postcss": "^5.0.11"
    * "grunt-postcss": "^0.6.0"
    * "postcss-import": "^7.0.0"
    * "postcss-nested": "^1.0.0np"
    * "autoprefixer": "^6.0.0"
    * "postcss-color-function": "^2.0.0"
    * "postcss-custom-properties": "^5.0.0"
    * "postcss-custom-media": "^5.0.0"
    * "postcss-mixins": "^1.0.0"
    * “postcss-calc”: “^5.0.0"
    * "csswring": "^4.0.0"
9. **Remove from gruntfile.js:**
    * entire compass config object
    * empty out watch tasks array
    * grunt.loadNpmTasks('grunt-contrib-compass');
10. **Add to gruntfile.js:**
    * postcss object
    * grunt.loadNpmTasks('grunt-postcss');
11. **Update in gruntfile.js:**
    * watch task
12. **Update in /source/css/main.css:**
	* Change all @import statement names    
12. **Update in all CSS files:**
    * Change all variable names from $varname to --varname, scoped to root
    * Change all variable references to var(--varname)
    * Change all vendor prefix compass mixins to native css rule
    * Change all timing references to timing variable
    * Set up mixin for color transition
    * Set up mixin for list-bare
    * Add variable for media query
    * Apply media query variable to all stylesheets
    * Add calc'ed timing variable
13. **Run:**
    * npm install
    * grunt