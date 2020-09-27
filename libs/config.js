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
 * @param {Object} config - path user & path data
 * @returns {JSON} response
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
    return JSON.parse(stdout);
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
    return JSON.parse(stdout);
};

//funciones
/**
 * return sketch directory
 * @param {string} name -sketch name 
 * @returns {JSON} response 
 */
Config.prototype.setSketch = function (name) {

    return _path.resolve(this.configPath.user, name);
}

/**
 * Attaches a sketch to a board.
 * @param  {...any} arg <port>|<FQBN> [sketchPath]
 * @returns {JSON} response 
 */
Config.prototype.boardAttach = async function (...arg) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.board.attach, [...arg].join(' '))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);

};
/**
 * Print details about a board.
 * @param {string} fqbn  -Fully Qualified Board Name, e.g.: arduino:avr:uno
 * @returns {JSON} response 
 */
Config.prototype.boardDetails = async function (fqbn) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.board.details, fqbn)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * List connected boards.
 * @returns {JSON} response 
 */
Config.prototype.boardList = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.board.list)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};


/**
 * List all known boards and their corresponding FQBN
 * @param {string} boardName boardname
 * @returns {JSON} response
 */
Config.prototype.boardListall = async function (boardName) {
    if (typeof boardName === 'undefined') {
        boardName = "";
    }
    if (boardName != "") {
        boardName = "-b " + boardName;
    }
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.board.listall, boardName)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Upload the bootloader on the board using an external programmer.
 * @param {string} fqbn Fully Qualified Board Name, e.g.: arduino:avr:uno
 * @param {string} port Upload port, e.g.: COM10 or /dev/ttyACM0
 * @returns {JSON} response
 */
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

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Clean arduino cache.
 * @returns {JSON} response
 */
Config.prototype.cacheClean = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.cache.clean)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Compiles Arduino sketches.
 * @param {string} fqbn Fully Qualified Board Name, e.g.: arduino:avr:uno
 * @param {string} port Upload port, e.g.: COM10 or /dev/ttyACM0
 * @param {string} sketch sketch name
 * @returns {JSON} response
 */
Config.prototype.compile = async function (fqbn, port, sketch) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.compile, ['-b', fqbn, '-p', port, this.setSketch(sketch)].join(" "))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Generates completion scripts
 * @param  {...any} arg example 'bash','>','completion.sh'
 * @returns {JSON} response
 */
Config.prototype.completion = async function (...arg) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.completion, [...arguments].join(" "))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Prints the current configuration
 * @returns {JSON} response
 */
Config.prototype.configDump = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.config.dump)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Writes current configuration to a configuration file.
 * @returns {JSON} response
 */
Config.prototype.configInit = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.config.init)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};
/**
 * Downloads one core and corresponding tool dependencies.
 * @param {string} packet PACKAGER
 * @param {string} arch ARCH
 * @param {string} version VERSION
 * @returns {JSON} response
 */
Config.prototype.coreDownload = async function (packet, arch, version) {
    if (typeof version === 'undefined') {
        version = '';
    }
    if (version != '') {
        version = "@" + version;
    }
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.download, [packet, ':', arch, version].join(""))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Installs one core and corresponding tool dependencies.
 * @param {string} packet PACKAGER
 * @param {string} arch ARCH
 * @param {string} version VERSION
 * @returns {JSON} response
 */
Config.prototype.coreInstall = async function (packet, arch, version) {
    if (typeof version === 'undefined') {
        version = '';
    }
    if (version != '') {
        version = "@" + version;
    }
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.install, [packet, ':', arch, version].join(""))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Shows the list of installed platforms.
 * @returns {JSON} response 
 */
Config.prototype.coreList = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.list)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};


/**
 * Search for a core in the package index.
 * @param {string} search keywords
 * @returns {JSON} response
 */
Config.prototype.coreSearch = async function (search) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.search, [search, '-v'].join(" "))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Uninstall one core and corresponding tool dependencies if no longer used.
 * @param {string} packet PACKAGER
 * @param {string} arch ARCH
 * @returns {JSON} response
 */
Config.prototype.coreUninstall = async function (packet, arch) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.uninstall, [packet, ':', arch].join(""))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Updates the index of cores.
 * @returns {JSON} response
 */
Config.prototype.coreUpdateIndex = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.update.index)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Upgrade one installed platforms to the latest version.
 * @param {string} packet PACKAGER
 * @param {string} arch ARCH
 * @returns {JSON} response
 */
Config.prototype.coreUpgrade = async function (packet, arch) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.core.upgrade, [packet, ':', arch].join(""))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};


/**
 * Run as a daemon on port
 * @returns {JSON} response
 */
Config.prototype.daemon = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.daemon)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};


/**
 * Debug Arduino sketches.
 * @param {string} fqbn Fully Qualified Board Name, e.g.: arduino:avr:uno
 * @param {string} sketch sketch name
 * @returns {JSON} response
 */
Config.prototype.debug = async function (fqbn, sketch) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.debug, ['-b', fqbn, this.setSketch(sketch)].join(" "))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Check dependencies status for the specified library.
 * @param {string} library library name example AudioZero
 * @param {string} version version example 1.0.0
 * @returns {JSON} response
 */
Config.prototype.libDeps = async function (library, version) {
    if (typeof version === 'undefined') {
        version = "";
    }
    if (version != "") {
        version = "@" + version
    }
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.deps, [library, version].join(""))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Downloads one or more libraries without installing them.
 * @param  {...any} arg library name and version example 'AudioZero@1.0.0'
 * @returns {JSON} response
 */
Config.prototype.libDownload = async function (...arg) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.download, [...arguments].join(" "))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};


/**
 * Installs one or more specified libraries into the system.
 * @param  {...any} arg library name and version example 'AudioZero@1.0.0'
 * @returns {JSON} response
 */
Config.prototype.libInstall = async function (...arg) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.install, [...arguments].join(" "))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Shows a list of all installed libraries.
 * @returns {JSON} response
 */
Config.prototype.libList = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.list)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Searches for one or more libraries data.
 * @param {string} search LIBRARY_NAME
 * @returns {JSON} response
 */
Config.prototype.libSearch = async function (search) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.search, search)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};


/**
 * Uninstalls one or more libraries.
 * @param  {...any} arg library name example 'AudioZero'
 * @returns {JSON} response
 */
Config.prototype.libUninstall = async function (...arg) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.uninstall, [...arguments].join(" "))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Updates the libraries index.
 * @returns {JSON} response
 */
Config.prototype.libUpdateIndex = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.updateIndex)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Upgrades installed libraries.
 * @param  {...any} arg library name example 'Audio','ArduinoJson'
 * @returns {JSON} response
 */
Config.prototype.libUpgrade = async function (...arg) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.lib.upgrade, [...arguments].join(" "))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Lists cores and libraries that can be upgraded
 * @returns {JSON} response
 */
Config.prototype.outdated = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.outdated)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Create a new Sketch
 * @param {string} sketch sketch name
 * @returns {JSON} response
 */
Config.prototype.sketchNew = async function (sketch) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.sketch.new, this.setSketch(sketch))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Updates the index of cores and libraries
 * @returns {JSON} response
 */
Config.prototype.update = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.update)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Upgrades installed cores and libraries.
 * @returns {JSON} response
 */
Config.prototype.upgrade = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.upgrade)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};
/**
 * Upload Arduino sketches.
 * @param {string} sketch sketch name
 * @param {string} fqbn Fully Qualified Board Name, e.g.: arduino:avr:uno
 * @param {string} port Upload port, e.g.: COM10 or /dev/ttyACM0
 * @returns {JSON} response
 */
Config.prototype.upload = async function (sketch, fqbn, port) {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.upload, [this.setSketch(sketch), '-b', fqbn, '-p', port].join(" "))

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};

/**
 * Shows version number of Arduino CLI.
 * @return  {JSON} response
 */
Config.prototype.version = async function () {
    let cmdString = arduinoCmd(this.pathBin, this.confFile, command.version)

    const {
        stdout,
        stderr
    } = await exec(cmdString);
    return JSON.parse(stdout);
};


module.exports = new Config();