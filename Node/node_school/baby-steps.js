const [nodePath, filePath, ...parmas] = process.argv;

const result = parmas.reduce((result, num) => result + Number(num), 0);

console.log(result);
