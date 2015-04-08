'use strict';

var engine = require('rest-engine');

engine.bootstrap({
    name: 'muber',
    version: '0.1.0'
}, null, function () {
    console.log('Server is online...');

    function cleanup() {
        engine.mongoose.connection.close();
    }

    process.on('SIGINT', function () {
        process.exit();
    });
    process.on('exit', function () {
        console.log('exiting');
        cleanup();
    });

});
