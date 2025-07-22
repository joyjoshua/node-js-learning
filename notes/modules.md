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
        x. Relative and absolute path
            a. we can provide relative paths using (./ or ../) or provide the absolute path of the filr
            b. Parent - child relation bw files
                a. when we try to console.log(module) in a parent and child module, (id: '.') and (id: 'module path name') will be the module id for parent and child respectively
                b. sometimes, the parent module will not list the child module under 'children' property in the module obj.
                c. under child module in the parent property, children property will be mentioned as '[Circular]' the reason, is if Node tries to add the child module under the parent module obj inside the children module, it;ll go to an infinte loop, so the children module will replace the reference using [Circular]
                d. code example
                In index Module (parent){
                    id: '.',
                    exports: {},
                    parent: null,
                    filename: '/Users/samer/learn-node/index.js',
                    loaded: false,
                    children: [],
                    paths: [ ... ] }
                    ---------------------------------
                    In util Module (child) {
                    id: '/Users/samer/learn-node/lib/util.js',
                    exports: {},
                    parent:
                    Module {
                        id: '.',
                        exports: {},
                        parent: null,
                        filename: '/Users/samer/learn-node/index.js',
                        loaded: false,
                        children: [ [Circular] ], // this what we discussed above
                        paths: [...] },
                    filename: '/Users/samer/learn-node/lib/util.js',
                    loaded: false,
                    children: [],
                    paths: [...] }

    b. Loading the module
        i. loaded attribute: The module module uses the loaded attribute to track which modules have been loaded (true value) and which modules are still being loaded (false value). 
        ii. The exports object will be most likely empty when the module is logged but the exports object becomes complete after the module is commpletely loaded synchronously
        iii. When extennsion is not provided, Node js will try
            1. to resolve .js  file,
            2. If it can't find a js file, node will try to resolve a .json file
            3. If not found, it'll look for a .node(binary) file
    c. Wrapping
        1. All code written in Node will be wrapped inside a function
        2.  > require('module').wrapper
            [ '(function (exports, require, module, __filename, __dirname) { ',
            '\n});' ]
        3. This wrapper function has 5 arguments: exports, require, module, __filename, and __dirname. This is what makes them appear to look global when in fact they are specific to each module.
        4.  We can access wrapper function parameters by consoling 'argument'
             arguments [Arguments] {
            '0': {}, // export object
            '1': [Function: require] { // require object
                resolve: [Function: resolve] { paths: [Function: paths] },
                main: {
                id: '.',
                path: 'C:\\node\\node-js-learning\\code_snippets',
                exports: {},
                filename: 'C:\\node\\node-js-learning\\code_snippets\\app.js',
                loaded: false,
                children: [Array],
                paths: [Array],
                [Symbol(kIsMainSymbol)]: true,
                [Symbol(kIsCachedByESMLoader)]: false,
                [Symbol(kFormat)]: 'commonjs',
                [Symbol(kIsExecuting)]: true
                },
                extensions: [Object: null prototype] {
                '.js': [Function (anonymous)],
                '.json': [Function (anonymous)],
                '.node': [Function (anonymous)]
                },
                cache: [Object: null prototype] {
                'C:\\node\\node-js-learning\\code_snippets\\app.js': [Object],
                'C:\\node\\node-js-learning\\code_snippets\\modules\\index.js': [Object],
                'C:\\node\\node-js-learning\\code_snippets\\modules\\calculate\\index.js': [Object],   
                'C:\\node\\node-js-learning\\code_snippets\\modules\\calculate\\sum.js': [Object],     
                'C:\\node\\node-js-learning\\code_snippets\\modules\\calculate\\multiply.js': [Object],
                'C:\\node\\node-js-learning\\code_snippets\\node_modules\\find_me.js': [Object],       
                'C:\\node\\node-js-learning\\code_snippets\\modules\\utils\\util.config.js': [Object]  
                }
            },
            '2': { // module object
                id: '.',
                path: 'C:\\node\\node-js-learning\\code_snippets',
                exports: {},
                filename: 'C:\\node\\node-js-learning\\code_snippets\\app.js',
                loaded: false,
                children: [ [Object] ],
                paths: [
                'C:\\node\\node-js-learning\\code_snippets\\node_modules',
                'C:\\node\\node-js-learning\\node_modules',
                'C:\\node\\node_modules',
                'C:\\node_modules'
                ],
                [Symbol(kIsMainSymbol)]: true,
                [Symbol(kIsCachedByESMLoader)]: false,
                [Symbol(kFormat)]: 'commonjs',
                [Symbol(kIsExecuting)]: true
            },
            '3': 'C:\\node\\node-js-learning\\code_snippets\\app.js', //filename
            '4': 'C:\\node\\node-js-learning\\code_snippets' //directory name
            }
        
        5. A wrapped function will look the below way
            function (require, module, __filename, __dirname) {
                let exports = module.exports;

                // Your Code...

                return module.exports;
            }
        
    d. Evaulating 
        a. require object - t’s an object that acts mainly as a function that takes a module name or path and returns the module.exports object. We can simply override the require object with our own logic if we want to.
    
    e. Caching
        a. The cache registry is simply an object that has a property for every required module. Those properties values are the module objects used for each module

    