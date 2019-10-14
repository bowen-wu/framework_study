const Radio = require('./Radio');

const station = {
    freq: '80.16',
    name: 'Rock N Roll Radio'
};

const radio = new Radio(station);

radio.on('open', se => {
    console.log(`"%s" FM %s 打开 ${station.name} ${station.freq}`);
    console.log('♬ ♫♬');
});

radio.on('close', station => {
    console.log(`"%s" FM %s 关闭 ${station.name} ${station.freq}`);
});
