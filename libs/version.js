
'use strict';

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { arduinoCmd } = require('./utils');

const version = async function() {
    let cmdString = arduinoCmd('version');    
    const { stdout, stderr } = await exec(cmdString);       
    return JSON.parse(stdout);
}

module.exports = version;