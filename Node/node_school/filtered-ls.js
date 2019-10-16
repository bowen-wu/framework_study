const fs = require('fs');
const path = require('path');
const dirPath = process.argv[2];
const targetFileType = process.argv[3];  // txt

fs.readdir(dirPath, (error, data) => {
    if (error) {
        return console.error(error);
    }
    data.filter(item => path.extname(item).slice(1) === targetFileType && console.log(item));
});
