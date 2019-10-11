const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'db');
const verb = process.argv[2];
const content = process.argv[3];
const editContent = process.argv[4];

const index = Number(content) - 1;
const list = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath).toString()) : [];

switch (verb) {
    case 'add':
        list.push([content, false]);
        break;
    case 'list':
        break;
    case 'delete':
        list.splice(index, 1);
        break;
    case 'done':
        list[index][1] = true;
        break;
    case 'edit':
        list[index][0] = editContent;
        break;
}

list.map(item => console.log(`${item[1] ? '[✅ ]' : '[x]'} 任务内容：${item[0]}`));

fs.writeFileSync('./db', JSON.stringify(list));

