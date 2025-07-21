Requiring modules in JS
Ref: https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/

1. Node uses 2 core modules for managing dependencies
    a. 'require' module
    b. 'module' module
        i. Both are available on the global scope - no need to require('require) or require('module')
        ii. You can think of the 'require' module as the command and the 'module' module as the organizer of all required modules.
    c. 5 steps that Node goes through when we try to require a module using 'require'
        i. Resolving: To find the absolute path of the file
        ii. Loading: To determine the type of the file content
        iii. Wrapping:  To give the file its private scope. This is what makes both the require and module objects local to every file we require. It wraps the content using IIFE
        (function(require, module, exports, __filename, __dirname) {
            //exported file content
        })
        iv. Evaluating:  This is what the VM eventually does with the loaded code.
        v. Caching: So that when we require this file again, we don’t go over all the steps another time.

2. 5 steps in detail
    a. Resolving the path
        i. Node modules have a one-to-one relation with files on the file-system. We require a module by loading the content of a file into memory.
        ii. Node allows to use relative, pre configured path
        iii. If we give 'require('find_me);', node'll look for find_me.js in all the paths specified by module.paths
            'C:\\node\\node-js-learning\\code_snippets\\node_modules',
            'C:\\node\\node-js-learning\\node_modules',
            'C:\\node\\node_modules',
            'C:\\node_modules'
        iv. If Node can’t find find-me.js in any of these paths, it will throw a “cannot find module error.”
        v. But if we create a node_module folder and create find_me.js file, node will be find the path and load the content of find_me
        vi. If there's a find_me.js outside of node_modules, node will load the content of the local find_me.js not the one in the node_module folder
        vii. An index.js file will be used by default when we require a folder, but we can control what file name to start with under the folder using the main property in package.json. For example, to make the require('find-me') line resolve to a different file under the find-me folder, all we need to do is add a package.json file in there and specify which file should be used to resolve this folder:
        viii. require.resolve: If you want to only resolve the module and not execute it, you can use the require.resolve function. This behaves exactly the same as the main require function, but does not load the file. It will still throw an error if the file does not exist and it will return the full path to the file when found.
            a. require.resolve('path name');
            b. require.resolve can be used to check if any optional package is installed or not and use it only when it's available
