const fs = require('fs');
const path = require('path');

const loadData = () => {
  const filePath = path.join(__dirname, '../data/data.json');
  const raw = fs.readFileSync(filePath);
  const parsedData = JSON.parse(raw);

  if (Array.isArray(parsedData)) {
    return { items: parsedData };
  }

  return parsedData;
};

module.exports = loadData;
