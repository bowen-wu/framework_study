const getFilelist = require('./mymodule');
const directoryName = process.argv[2];
const filename = process.argv[3];

getFilelist(directoryName, filename, (error, fileList) => {
    if(error) {
        return console.error(error);
    }
    fileList.forEach(file => console.log(file));
});
