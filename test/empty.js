/* global afterEach, beforeEach, describe, it, before, after */
/**
 * Created by JParreir on 26-12-2015.
 */



var nodePath = require("path"),
    nodeOs = require("os"),
    enFs = require("../"),
    cwd;

describe("enFs", function() {
    describe("emptyDir", function() {
        var tmpPath;
        before(function(done) {
            cwd = process.cwd();
            tmpPath = nodePath.join(nodeOs.tmpdir(), "enfs", "empty-dir");
            enFs.mkdirp(tmpPath, function(err) {
                (err === null).should.be.equal(true);
                process.chdir(tmpPath);
                done();
            });
        });
        afterEach(function(done) {
            enFs.remove(tmpPath + nodePath.sep + "*", done);
        });
        after(function(done) {
            process.chdir(cwd);
            enFs.remove(nodePath.dirname(tmpPath), done);
        });
        describe("async", function() {
            describe("> when directory exists and contains items", function() {
                it("should delete all items", function(done) {
                    enFs.readdir(tmpPath, function(errReaddir, files) {
                        (errReaddir === null).should.be.equal(true);
                        files.length.should.be.equal(0);
                        enFs.ensureFile(nodePath.join(tmpPath, "file1"), function(errEnsureF1) {
                            (errEnsureF1 === null).should.be.equal(true);
                            enFs.ensureFile(nodePath.join(tmpPath, "file2"), function(errEnsureF2) {
                                (errEnsureF2 === null).should.be.equal(true);
                                enFs.ensureDir(nodePath.join(tmpPath, "dir1"), function(errEnsureD1) {
                                    (errEnsureD1 === null).should.be.equal(true);
                                    enFs.readdir(tmpPath, function(errRead2, files2) {
                                        (errRead2 === null).should.be.equal(true);
                                        files2.length.should.be.equal(3);
                                        enFs.emptyDir(tmpPath, function(err) {
                                            (err === null).should.be.equal(true);
                                            enFs.readdir(tmpPath, function(errRead3, files3) {
                                                (errRead3 === null).should.be.equal(true);
                                                files3.length.should.be.equal(0);
                                                done();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
            describe("> when directory exists and contains no items", function() {
                it("should do nothing", function(done) {
                    enFs.readdir(tmpPath, function(errRead, files) {
                        (errRead === null).should.be.equal(true);
                        files.length.should.be.equal(0);
                        enFs.emptyDir(tmpPath, function(err) {
                            (err === null).should.be.equal(true);
                            enFs.readdir(tmpPath, function(errRead2) {
                                (errRead2 === null).should.be.equal(true);
                                files.length.should.be.equal(0);
                                done();
                            });
                        });
                    });
                });
            });
            describe("> when directory does not exist", function() {
                it("should create it", function(done) {
                    var testDir = nodePath.join(tmpPath, "test");
                    enFs.existStat(testDir, function(errExist, exist) {
                        exist.should.be.equal(false);
                        enFs.emptyDir(testDir, function(err) {
                            (err === null).should.be.equal(true);
                            enFs.existStat(testDir, function(errExist2, exist2) {
                                exist2.should.be.equal(true);
                                enFs.readdir(testDir, function(errRead, files) {
                                    (errRead === null).should.be.equal(true);
                                    files.length.should.be.equal(0);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
        describe("sync", function() {
            describe("> when directory exists and contains items", function() {
                it("should delete all of the items", function(done) {
                    enFs.readdir(tmpPath, function(errReaddir, files) {
                        (errReaddir === null).should.be.equal(true);
                        files.length.should.be.equal(0);
                        enFs.ensureFile(nodePath.join(tmpPath, "file1"), function(errEnsureF1) {
                            (errEnsureF1 === null).should.be.equal(true);
                            enFs.ensureFile(nodePath.join(tmpPath, "file2"), function(errEnsureF2) {
                                (errEnsureF2 === null).should.be.equal(true);
                                enFs.ensureDir(nodePath.join(tmpPath, "dir1"), function(errEnsureD1) {
                                    (errEnsureD1 === null).should.be.equal(true);
                                    enFs.readdir(tmpPath, function(errRead2, files2) {
                                        (errRead2 === null).should.be.equal(true);
                                        files2.length.should.be.equal(3);
                                        enFs.emptyDirSync(tmpPath);
                                        enFs.readdir(tmpPath, function(errRead3, files3) {
                                            (errRead3 === null).should.be.equal(true);
                                            files3.length.should.be.equal(0);
                                            done();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
            describe("> when directory exists and contains no items", function() {
                it("should do nothing", function(done) {
                    enFs.readdir(tmpPath, function(errRead, files) {
                        (errRead === null).should.be.equal(true);
                        files.length.should.be.equal(0);
                        enFs.emptyDirSync(tmpPath);
                        enFs.readdir(tmpPath, function(errRead2) {
                            (errRead2 === null).should.be.equal(true);
                            files.length.should.be.equal(0);
                            done();
                        });
                    });
                });
            });
            describe("> when directory does not exist", function() {
                it("should create it", function(done) {
                    var testDir = nodePath.join(tmpPath, "test");
                    enFs.existStat(testDir, function(errExist, exist) {
                        exist.should.be.equal(false);
                        enFs.emptyDirSync(testDir);
                        enFs.existStat(testDir, function(errExist2, exist2) {
                            exist2.should.be.equal(true);
                            enFs.readdir(testDir, function(errRead, files) {
                                (errRead === null).should.be.equal(true);
                                files.length.should.be.equal(0);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
});
