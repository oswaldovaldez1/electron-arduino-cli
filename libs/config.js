"use strict";

const _util = require("util");
const _path = require("path");
const _yamljs = require("yamljs");
const _os = require("os");
const _fs = require("fs");
const _fsExtra = require("fs-extra");
const exec = _util.promisify(require("child_process").exec);

const command = {
    board: {
        attach: 'board attach',
        details: 'board details -b',
        list: 'board list',
        listall: 'board listall',
    },
    burnBootloader: 'burn-bootloader',
    cache: {
        clean: 'cache clean',
    },
    compile: 'compile',
    completion: 'completion',
    config: {
        dump: 'config dump',
        init: 'config ini',
    },
    core: {
        download: 'core download',
        install: 'core install',
        list: 'core list',
        search: 'core search',
        uninstall: 'core uninstall',
        update: {
            index: 'core update-index',
        },
        upgrade: 'core upgrade',
    },
    daemon: 'daemon',
    debug: 'debug',
    lib: {
        deps: 'lib deps',
        download: 'lib download',
        install: 'lib install',
        list: 'lib list',
        search: 'lib search',
        uninstall: 'lib uninstall',
        updateIndex: 'lib update-index',
        upgrade: 'lib upgrade',
    },
    outdated: 'outdated',
    sketch: {
        new: 'sketch new',
    },
    update: 'update',
    upgrade: 'upgrade',
    upload: 'upload',
    version: 'version',
};

const {
    arduinoCmd
} = require("./utils");

const SO = {
    linux: "arduino-cli",
    win: "arduino-cli.exe",
    darwin: "arduino-cli",
};
/**
 * Config
 * @class
 * @todo Add config manager
 */
const Config = function () {
    this.cmd = "config";
    this.pathBin = "";
    this.config = "";
    this.configPath = "";
    this.yalmDir = "";
    this.confFile = "";
    return this;
};

/**
 * Init config
 * @param {string} path - Path of custom .cli-config.yml
 */
Config.prototype.init = async function (path, config = null) {
    if (typeof path === "undefined") {
        return JSON.parse(
            JSON.stringify({
                message: "ingrese la ruta del Bin de arduino cli",
            })
        );
    }
    if (config === null) {
        return JSON.parse(
            JSON.stringify({
                message: "ingrese la ruta del de las carpetas del data y user",
            })
        );
    }
    this.configPath = config;    
    //creando directorios si no existen
    let yalmDir = path;
    _fsExtra.ensureDirSync(config.user);
    _fsExtra.ensureDirSync(config.data);



    this.yalmDir = yalmDir;
    let _conf = {
        directories: config,
    };
    const yamlString = _yamljs.stringify(_conf, 2);

    if (!_fs.existsSync(_path.resolve(yalmDir, "arduino-cli.yaml"))) {

        _fsExtra.writeFileSync(_path.resolve(yalmDir, "arduino-cli.yaml"), yamlString);

    }

    this.pathBin = _path.resolve(path, SO[_os.platform()]);

    this.confFile = ['--config-file', this.yalmDir].join(' ');
    let query = "";
    let path1 = (typeof path !== 'undefined') ? ' --save-as ' + path : "";



    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.list)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};

/**
 * Dump config file
 * @returns {string} dumped config JSON string
 */
Config.prototype.dump = async function () {
    let cmdString = arduinoCmd(this.pathBin, "dump");
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};

//funciones

Config.prototype.setSketch = function (name) {
    
    return _path.resolve(this.configPath.user, name);
}

Config.prototype.boardAttach = async function (...arg) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.board.attach, [...arg].join(' '))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.boardDetails = async function (fqbn) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.board.details, fqbn)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.boardList = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.board.list)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.boardListall = async function (boardName) {
    if (typeof boardName === 'undefined') {
        boardName = "";
    }
    if (boardName != "") {
        boardName = "-b " + boardName;
    }
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.board.listall, boardName)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.burnBootloader = async function (fqbn, port) {
    if (typeof fqbn === 'undefined') {
        fqbn = "";
    }
    if (typeof port === 'undefined') {
        port = "";
    }
    if (fqbn != "") {
        fqbn = "-b " + fqbn;
    }
    if (port != "") {
        port = '-P ' + port;
    }
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.burnBootloader, [fqbn, port].join(" "))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.cacheClean = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.cache.clean)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.compile = async function (fqbn,port, sketch) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.compile, ['-b', fqbn,'-p',port, this.setSketch(sketch)].join(" "))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.completion = async function (...arg) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.completion,[...arguments].join(" "))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.configDump = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.config.dump)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.configInit = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.config.init)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.coreDownload = async function (packet, arch, version) {
    if (typeof version === 'undefined') { 
        version = '';
    }
    if (version != '') { 
        version = "@" + version;
    }
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.download,[packet,':',arch,version].join(""))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.coreInstall = async function (packet, arch, version) {
    if (typeof version === 'undefined') {
        version = '';
    }
    if (version != '') {
        version = "@" + version;
    }
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.install, [packet, ':', arch, version].join(""))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.coreList = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.list)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.coreSearch = async function (search) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.search,[search,'-v'].join(" "))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.coreUninstall = async function (packet, arch) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.uninstall, [packet, ':', arch].join(""))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.coreUpdateIndex = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.update.index)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.coreUpgrade = async function (packet, arch) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.upgrade, [packet, ':', arch].join(""))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.daemon = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.daemon)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.debug = async function (fqbn,sketch) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.debug,['-b',fqbn,this.setSketch(sketch)].join(" "))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.libDeps = async function (library, version) {
    if (typeof version === 'undefined') { 
        version = "";
    }
    if (version != "") { 
        version="@"+version
    }
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.deps,[library,version].join(""))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.libDownload = async function (...arg) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.download,[...arguments].join(" "))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.libInstall = async function (...arg) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.install, [...arguments].join(" "))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.libList = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.list)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.libSearch = async function (search) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.search,search)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.libUninstall = async function (...arg) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.uninstall, [...arguments].join(" "))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.libUpdateIndex = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.updateIndex)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.libUpgrade = async function (...arg) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.upgrade, [...arguments].join(" "))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.outdated = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.outdated)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.sketchNew = async function (sketch) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.sketch.new,this.setSketch(sketch))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.update = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.update)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.upgrade = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.upgrade)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.upload = async function (sketch, fqbn,port) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.upload,[this.setSketch(sketch),'-b',fqbn,'-p',port].join(" "))
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};
Config.prototype.version = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.version)
    console.log(cmdString)
    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(JSON.stringify({
        resolve: stdout,
        err: stderr
    }));
};


module.exports = new Config();