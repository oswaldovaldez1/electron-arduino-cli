var path = require('path');
const arduinoCli = require("../index");
let appRoot = path.resolve(__dirname, '../');


arduinoCli.init(appRoot + '/arduino', {
    user: appRoot + '/arduino/sketches',
    data: appRoot + '/arduino/data'
})

arduinoCli.version().then((response) => {
    console.log(response);
})
arduinoCli.version()