#!/usr/bin/env node

var fs = require('fs'),
dir = require('node-dir'),
path = require('path'),
nopt = require('nopt'),
traverse = require('traverse'),

// values for this tool
conf = {

    markPat: /.md$/,
    recursive: false,
    source: './'

},

// parse options using nopt
argv = nopt(

        // options
    {

        recursive: Boolean,
        source: String

    },

        // shorthands
    {

        r: ['--recursive'],
        s: ['--source']

    },

        process.argv, 2),

// log method
log = function (mess) {

    console.log(mess);

},

// set any given argumnets from the command line
setConf = function (obj) {

    // traverse over argv object, and set any values given at the
    // command line
    traverse(obj).forEach(function (prop, two) {

        if (this.path[0] != 'argv' && this.key) {

            conf[this.key] = this.node;

        }

    });

},

// for all method
forAll = (function () {

    var a = [];

    return function (forEach, done) {

        forEach = forEach || function () {};
        done = done || function () {};

        a = [];

        // get it done
        dir.readFiles(conf.source, {
            match: conf.markPat,
            recursive: conf.recursive
        },

            function (err, content, fn, next) {

            var obj;

            if (err) {

                log(err);

                next();

            } else {

                obj = {

                    //content: content,
                    fn: path.basename(fn),
                    path: fn

                };

                forEach.call(obj);
                a.push(obj);

                next();

            }

        },

            function (err, files) {

            done(a);

        });

    };

}
    ()),

// build List
buildList = function (done) {

    var obj = {},
    done = done || function () {};

    forAll(function () {}, function (a) {

        done(a);

    });

};


// if CLI
if (require.main === module) {

    // set any argumnets given from command line
    setConf(argv);

    // build the list, and spit out json
    buildList(function (list) {

        log(JSON.stringify(list));

    });

} else {
	
	// else provide an API

    exports.list = function (done,options) {

	    done = done || function(){};
	    options = options || {};
		
		setConf(options);
		
		buildList(function(list){
			
			done(list)
			
		});
	
    }

}
