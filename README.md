# mdfm-mklist (Mark Down File Manager - Make List)

Makes an Array of Objects that contains info on any and all markdown files found in a given source path.

This tool is meant to be used with other mdfm tools. All of my mdfm tools involve parsing, processing, analyzing, or doing something with a bunch of markdown files. As such a basic tool to just do this is required. As such mdfm-mklist is just that tool.

## install
Because I have not published this to NPM, it needs to be cloned and installed globally.

```
$ git clone https://github.com/dustinpfister/mdfm-mklist
$ node install -g
```
## Basic use (CLI)

cd to a folder that has makdown files in it, and just call it like normal.

```
$ cd folder/with/markdown/files
$ mdfm-mklist 
```

If all goes well it should spit out the desired JSON.

## Basic use (as module)

```js
var mklist = require('./index.js');
 
mklist.list(function(li){
 
    console.log('this is test');
    console.log(li);
 
},{recursive:true,source:'./'});
```

## Recursive

To get a list of all files in all folders just use the -r flag

```
$ mdfm-mklist -r
```
