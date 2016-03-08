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

## Step 3 Instructions
In (roughly) this order, complete the following to advance to Step 4:

* **Stop:**
     watch task
* **Add to package.json:**
    * "jspm": "^0.16.13"
    * "grunt-jspm": "^0.1.1"
    * "grunt-contrib-copy": "^0.8.2"
* **Remove from package.json:**
    *"grunt-babel": "^4.0.0"

* **Remove from gruntfile.js:**
    * Babel config object
    * grunt.loadNpmTasks('grunt-babel');
    * js watch object

* **Add to gruntfile.js:**
    * grunt.loadNpmTasks('grunt-jspm');
    * grunt.loadNpmTasks('grunt-contrib-copy');
    * grunt config object for jspm
    * grunt config object for copy

* **Update index.html, event-detail.html, favorites.html:**
    * bottom of page system calls

* **Update eventsList.js, eventDetail.js, favoritesList.js**
    * local modules
    * DEGJS fetchUtils module

* **Run:**
    * npm install
    * jspm install:
        * prefix package.json: default (yes)
        * server baseURL: source/js
        * jspm packages folder: default (source/js/jspm_packages)
        * config file path: default (source/js/config.js)
        * Configuration file source/js/config.js doesn't exist, create it? default (yes)
        * Enter client baseURL: js
        * Do you wish to use a transpiler? default (yes)
        * Which ES6 transpiler would you like to use, Babel, TypeScript or Traceur? default (babel)
    * jspm install github:DEGJS/fetchUtils
    * grunt