const fs = require('fs');
const path = require('path');

const loadData = () => {
  const filePath = path.join(__dirname, '../data/data.json');
  const raw = fs.readFileSync(filePath);
  return JSON.parse(raw);
};

module.exports = loadData;