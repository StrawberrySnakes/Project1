// loadData.js - load data from a JSON file
const fs = require('fs');
const path = require('path');

// Loads data from the JSON file and return it as an object with an 'items' array
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
