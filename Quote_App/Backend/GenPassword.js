const bcrypt = require('bcrypt');
let password = bcrypt.hashSync('admin', 9);
console.log(password);