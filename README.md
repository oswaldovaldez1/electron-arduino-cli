# :package: electron-arduino-cli

_Library to work with the arduino cli
based on the [inocli-js](https://github.com/makerninja/inocli-js) and [arduino-node](https://github.com/arduino-cli/arduino-node) libraries._

***

## :computer: S. O. supported:

:heavy_check_mark: Linux\
:heavy_check_mark: Windows.\
:heavy_check_mark: Mac.

***

## :dvd: examples:

[GitHub](https://github.com/oswaldovaldez1/electron-arduino-cli/tree/master/examples "examples").
***

## :floppy_disk: Documentation:

#### :boom: Installation

npm instal electron-arduino-cli
***

#### :fire: Import

``` JS
// JavaScript
let arduinoCli = require('electron-arduino-cli');
```

***

#### :notebook: Methods

##### init

``` JS
// JavaScript
/**
 * Init config
 * @param {string} path - Path of custom .cli-config.yml
 * @param {Object} config - path user & path data
 * @returns {JSON} response
 */
arduinoCli.init(path, config = null);
```

##### dump

``` JS
// JavaScript
/**
 * Dump config file
 * @returns {string} dumped config JSON string
 */
arduinoCli.dump();
```

##### setSketch

``` JS
// JavaScript
/**
 * return sketch directory
 * @param {string} name -sketch name 
 * @returns {JSON} response 
 */
arduinoCli.setSketch(name);
```

##### boardAttach 

``` JS
// JavaScript
/**
 * Attaches a sketch to a board.
 * @param  {...any} arg <port>|<FQBN> [sketchPath]
 * @returns {JSON} response 
 */
arduinoCli.boardAttach(...arg);
```

##### boardDetails

``` JS
// JavaScript
/**
 * Print details about a board.
 * @param {string} fqbn  -Fully Qualified Board Name, e.g.: arduino:avr:uno
 * @returns {JSON} response 
 */
arduinoCli.boardDetails(fqbn);
```

##### boardList

``` JS
// JavaScript
/**
 * List connected boards.
 * @returns {JSON} response 
 */
arduinoCli.boardList();
```

##### boardListall

``` JS
// JavaScript
/**
 * List all known boards and their corresponding FQBN
 * @param {string} boardName boardname
 * @returns {JSON} response
 */
arduinoCli.boardListall(boardName);
```

##### burnBootloader

``` JS
// JavaScript
/**
 * Upload the bootloader on the board using an external programmer.
 * @param {string} fqbn Fully Qualified Board Name, e.g.: arduino:avr:uno
 * @param {string} port Upload port, e.g.: COM10 or /dev/ttyACM0
 * @returns {JSON} response
 */
arduinoCli.burnBootloader(fqbn, port);
```

##### cacheClean

``` JS
// JavaScript
/**
 * Clean arduino cache.
 * @returns {JSON} response
 */
arduinoCli.cacheClean();
```

##### compile

``` JS
// JavaScript
/**
 * Compiles Arduino sketches.
 * @param {string} fqbn Fully Qualified Board Name, e.g.: arduino:avr:uno
 * @param {string} port Upload port, e.g.: COM10 or /dev/ttyACM0
 * @param {string} sketch sketch name
 * @returns {JSON} response
 */
arduinoCli.compile(fqbn, port, sketch);
```

##### completion

``` JS
// JavaScript
/**
 * Generates completion scripts
 * @param  {...any} arg example 'bash','>','completion.sh'
 * @returns {JSON} response
 */
arduinoCli.completion(...arg);
```

##### configDump

``` JS
// JavaScript
/**
 * Prints the current configuration
 * @returns {JSON} response
 */
arduinoCli.configDump();
```

##### configInit

``` JS
// JavaScript
/**
 * Writes current configuration to a configuration file.
 * @returns {JSON} response
 */
arduinoCli.configInit();
```

##### coreDownload

``` JS
// JavaScript
/**
 * Downloads one core and corresponding tool dependencies.
 * @param {string} packet PACKAGER
 * @param {string} arch ARCH
 * @param {string} version VERSION
 * @returns {JSON} response
 */
arduinoCli.coreDownload(packet, arch, version);
```

##### coreInstall

``` JS
// JavaScript
/**
 * Installs one core and corresponding tool dependencies.
 * @param {string} packet PACKAGER
 * @param {string} arch ARCH
 * @param {string} version VERSION
 * @returns {JSON} response
 */
arduinoCli.coreInstall(packet, arch, version);
```

##### coreList

``` JS
// JavaScript
/**
 * Shows the list of installed platforms.
 * @returns {JSON} response 
 */
arduinoCli.coreList();
```

##### coreSearch

``` JS
// JavaScript
/**
 * Search for a core in the package index.
 * @param {string} search keywords
 * @returns {JSON} response
 */
arduinoCli.coreSearch(search);
```

##### coreUninstall

``` JS
// JavaScript
/**
 * Uninstall one core and corresponding tool dependencies if no longer used.
 * @param {string} packet PACKAGER
 * @param {string} arch ARCH
 * @returns {JSON} response
 */
arduinoCli.coreUninstall(packet, arch);
```

##### coreUpdateIndex

``` JS
// JavaScript
/**
 * Updates the index of cores.
 * @returns {JSON} response
 */
arduinoCli.coreUpdateIndex();
```

##### coreUpgrade

``` JS
// JavaScript
/**
 * Upgrade one installed platforms to the latest version.
 * @param {string} packet PACKAGER
 * @param {string} arch ARCH
 * @returns {JSON} response
 */
arduinoCli.coreUpgrade(packet, arch);
```

##### daemon

``` JS
// JavaScript
/**
 * Run as a daemon on port
 * @returns {JSON} response
 */
arduinoCli.daemon();
```

##### debug

``` JS
// JavaScript
/**
 * Debug Arduino sketches.
 * @param {string} fqbn Fully Qualified Board Name, e.g.: arduino:avr:uno
 * @param {string} sketch sketch name
 * @returns {JSON} response
 */
arduinoCli.debug(fqbn, sketch);
```

##### libDeps

``` JS
// JavaScript
/**
 * Check dependencies status for the specified library.
 * @param {string} library library name example AudioZero
 * @param {string} version version example 1.0.0
 * @returns {JSON} response
 */
arduinoCli.libDeps(library, version);
```

##### libDownload

``` JS
// JavaScript
/**
 * Downloads one or more libraries without installing them.
 * @param  {...any} arg library name and version example 'AudioZero@1.0.0'
 * @returns {JSON} response
 */
arduinoCli.libDownload(...arg);
```

##### libInstall

``` JS
// JavaScript
/**
 * Installs one or more specified libraries into the system.
 * @param  {...any} arg library name and version example 'AudioZero@1.0.0'
 * @returns {JSON} response
 */
arduinoCli.libInstall(...arg);
```

##### libList

``` JS
// JavaScript
/**
 * Shows a list of all installed libraries.
 * @returns {JSON} response
 */
arduinoCli.libList();
```

##### libSearch

``` JS
// JavaScript
/**
 * Searches for one or more libraries data.
 * @param {string} search LIBRARY_NAME
 * @returns {JSON} response
 */
arduinoCli.libSearch(search);
```

##### libUninstall

``` JS
// JavaScript
/**
 * Uninstalls one or more libraries.
 * @param  {...any} arg library name example 'AudioZero'
 * @returns {JSON} response
 */
arduinoCli.libUninstall(...arg);
```

##### libUpdateIndex

``` JS
// JavaScript
/**
 * Updates the libraries index.
 * @returns {JSON} response
 */
arduinoCli.libUpdateIndex();
```

##### libUpgrade

``` JS
// JavaScript
/**
 * Upgrades installed libraries.
 * @param  {...any} arg library name example 'Audio','ArduinoJson'
 * @returns {JSON} response
 */
arduinoCli.libUpgrade(...arg);
```

##### outdated

``` JS
// JavaScript
/**
 * Lists cores and libraries that can be upgraded
 * @returns {JSON} response
 */
arduinoCli.outdated();
```

##### sketchNew

``` JS
// JavaScript
/**
 * Create a new Sketch
 * @param {string} sketch sketch name
 * @returns {JSON} response
 */
arduinoCli.sketchNew(sketch);
```

##### update

``` JS
// JavaScript
/**
 * Updates the index of cores and libraries
 * @returns {JSON} response
 */
arduinoCli.update();
```

##### upgrade

``` JS
// JavaScript
/**
 * Upgrades installed cores and libraries.
 * @returns {JSON} response
 */
arduinoCli.upgrade();
```

##### upload

``` JS
// JavaScript
/**
 * Upload Arduino sketches.
 * @param {string} sketch sketch name
 * @param {string} fqbn Fully Qualified Board Name, e.g.: arduino:avr:uno
 * @param {string} port Upload port, e.g.: COM10 or /dev/ttyACM0
 * @returns {JSON} response
 */
arduinoCli.upload(sketch, fqbn, port);
```

##### version

``` JS
// JavaScript
/**
 * Shows version number of Arduino CLI.
 * @return  {JSON} response
 */
arduinoCli.version();
```
