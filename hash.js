const bcrypt = require('bcrypt');
const password = '12345';
const salt = bcrypt.genSaltSync();
console.log(salt);
const hash = bcrypt.hashSync(password, salt);
console.log({hash});