const fs = require('fs');

const convertCSVtoObject = async (filePath) => {
  const data = await fs.promises.readFile(filePath, 'utf8');
  const rows = data.split('\r\n');
  const output = [];
  const headers = rows[0].split(',');
  for (let i = 1; i < rows.length; i++) {
    const splitRow = rows[i].split(',');
    const newRecord = {
      [headers[0].toLowerCase()]: splitRow[0],
      [headers[1].toLowerCase()]: splitRow[1],
      [headers[2].toLowerCase()]: splitRow[2],
      [headers[3].toLowerCase()]: splitRow[3],
      [headers[4].toLowerCase()]: splitRow[4],
      [headers[5].toLowerCase()]: splitRow[5],
      [headers[6].toLowerCase()]: splitRow[6],
      [headers[7].toLowerCase()]: splitRow[7],
    };
    output.push(newRecord);
  }

  const cleanOutput = output.filter(
    (restaurant) =>
      !(
        restaurant[headers[0].toLowerCase()].includes('\\') ||
        restaurant[headers[0].toLowerCase()].includes('/') ||
        restaurant[headers[1].toLowerCase()].includes('\\') ||
        restaurant[headers[1].toLowerCase()].includes('/')
      )
  );

  await fs.promises.writeFile(
    './restaurant-list.json',
    JSON.stringify(cleanOutput, null, 2)
  );
};

convertCSVtoObject('../seeds/restaurantData/restaraunt-list.csv');
