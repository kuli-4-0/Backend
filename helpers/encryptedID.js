const crypto = require('crypto');

const secretKey = '7asd6f76sda8f68a7ds6f';

exports.encryptID = (id) => {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encryptedID = cipher.update(id.toString(), 'utf8', 'hex');
  encryptedID += cipher.final('hex');
  return encryptedID;
};
exports.decryptID = (encryptedID) => {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decryptedID = decipher.update(encryptedID, 'hex', 'utf8');
  decryptedID += decipher.final('utf8');
  return decryptedID;
};
