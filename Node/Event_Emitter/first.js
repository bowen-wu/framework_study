const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

function Dog(name) {
    this.name = name;
}

Dog.prototype = Object.create(EventEmitter.prototype);
// Dog.prototype.__proto__ = EventEmitter.prototype;

const simon = new Dog('simon');

simon.on('bark', function() {
    console.log(`${this.name} barked`);
});

setInterval(() => {
    simon.emit('bark');
}, 500);
