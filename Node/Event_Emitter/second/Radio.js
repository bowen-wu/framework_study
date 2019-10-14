const util = require('util');
const EventEmitter = require('events').EventEmitter;

function Radio(station) {
    setTimeout(() => {
        this.emit('open', station);
    }, 0);

    setTimeout(() => {
        this.emit('close', station);
    }, 5000);

    this.on('newListener', listener => {
        console.log(`Event Listener: ${listener}`);
    });
}

util.inherits(Radio, EventEmitter);
module.exports = Radio;
