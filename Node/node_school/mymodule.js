const fs = require('fs');
const path = require('path');

module.exports = (directoryName, filename, callback) => {
    fs.readdir(directoryName, (error, data) => {
        try {
            if(error) {
                callback && callback(error);
                return console.error(error);
            }
            const fileList = data.filter(file => path.extname(file).slice(1) === filename);
            callback && callback(null, fileList);
        } catch(error) {
            callback && callback(error, null);
        }
    });
};
