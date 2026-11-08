const fs = require('fs');
const path = require('path');

function findFiles(dir, extList) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (!file.includes('node_modules') && !file.includes('.git')) {
          results = results.concat(findFiles(fullPath, extList));
        }
      } else {
        const ext = path.extname(file).toLowerCase();
        if (extList.includes(ext)) {
          results.push({ path: fullPath, size: stat.size });
        }
      }
    }
  } catch (e) {}
  return results;
}

console.log('Project videos:', findFiles('.', ['.mp4', '.mov']));
console.log('Desktop salon folder:', findFiles('C:\\Users\\amir\\OneDrive\\Desktop\\صالون', ['.mp4', '.mov']));
