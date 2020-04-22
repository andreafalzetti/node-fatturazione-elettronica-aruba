const { readFileSync } = require('fs');

const getFattura = async (file) => {
  const xml = await readFileSync(file);
  const b64 = Buffer.from(xml).toString('base64');
  return b64;
};

module.exports = {
  getFattura,
};
