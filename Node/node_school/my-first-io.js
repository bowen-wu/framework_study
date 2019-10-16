const fs = require('fs');
const filePath = process.argv[2];

const fileContent = fs.readFileSync(filePath).toString('utf8');

const fileContentArray = fileContent.split('\n');

console.log(fileContentArray.length - 1);
