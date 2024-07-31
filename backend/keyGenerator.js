import crypto from 'crypto';

// Script to generate a random string used for session and jwt secret inside .env file
console.log(crypto.randomBytes(64).toString('hex'));