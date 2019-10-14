const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

emitter.on('newListener', (eventName, eventHandle) => {
    console.log('eventName -> ', eventName);
    console.log('eventHandle -> ', typeof eventHandle);
    eventHandle();
});

emitter.on('shout', () => {
    console.log('this is first function');
});

emitter.on('shout', () => {
    console.log('this is second function');
});

setTimeout(() => {
    emitter.emit('shout');
}, 5000);
