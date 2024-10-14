const crypto = require('crypto');

const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const secret = generateSecret();
console.log('Generated JWT Secret:');
console.log(secret);
console.log('\nAdd this to your .env file:');
console.log(`JWT_SECRET=${secret}`);
