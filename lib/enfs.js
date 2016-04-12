/**
 * @project enfs
 * @filename enfs.js
 * @description shortcut provider for enfs modules
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2016 Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 18-02-2016.
 * @version 0.0.2
 */

"use strict";

const nodePath = require("path");
const enfs = require("enfspatch");
const mkdirp = require("enfsmkdirp");
const ensure = require("enfsensure");
const copy = require("enfscopy");
const move = require("enfsmove");
const find = require("enfsfind");
const list = require("enfslist");
const compare = require("enfscompare");
const rimraf = require("rimraf");


//Mkdir -p
enfs.mkdirp = mkdirp.mkdirp;
enfs.mkdirpSync = mkdirp.mkdirpSync;

//Ensure dir
enfs.ensureDir = ensure.ensureDir;
enfs.ensureDirSync = ensure.ensureDirSync;

//Ensure file
enfs.ensureFile = ensure.ensureFile;
enfs.ensureFileSync = ensure.ensureFileSync;


//Ensure link
enfs.ensureLink = ensure.ensureLink;
enfs.ensureLinkSync = ensure.ensureLinkSync;

//Ensure Symlink
enfs.ensureSymlink = ensure.ensureSymlink;
enfs.ensureSymlinkSync = ensure.ensureSymlinkSync;

//Copy
enfs.copy = copy.copy;
enfs.copySync = copy.copySync;

//Move
enfs.move = move.move;
enfs.moveSync = move.moveSync;

//Remove
enfs.remove = rimraf;
enfs.removeSync = rimraf.sync;


//Empty
enfs.emptyDir = function(path, callback) {
    enfs.exists(path, (err, exist) => {
        if (exist) {
            rimraf(nodePath.resolve(path) + nodePath.sep + "*", (errClear)=> {
                callback(errClear || null);
            });
        } else {
            enfs.mkdirp(path, callback);
        }
    });
};
enfs.emptyDirSync = function(path) {
    if (enfs.existsSync(path)) {
        return rimraf.sync(nodePath.resolve(path) + nodePath.sep + "*");
    } else {
        return enfs.mkdirpSync(path);
    }
};

//Find
enfs.find = find.find;
enfs.findSync = find.findSync;

//List
enfs.list = list.list;
enfs.listSync = list.listSync;

//Compare
enfs.compareFiles = compare.files;
enfs.compareFilesSync = compare.filesSync;
enfs.compareFilesHash = compare.filesHash;
enfs.compareFilesHashSync = compare.filesHashSync;
enfs.compareDir = compare.dir;
enfs.compareDirSync = compare.dirSync;
enfs.compareDirHash = compare.dirHash;
enfs.compareDirHashSync = compare.direHashSync;

module.exports = enfs;
