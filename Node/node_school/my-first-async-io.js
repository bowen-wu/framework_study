const fs = require('fs');
const filePath = process.argv[2];

const fileContent = fs.readFile(filePath, (error, data) => {
    if(error) {
        return console.error(error);
    } else {
        const lines = data.toString().split('\n').length - 1;
        console.log(lines);
    }
});
