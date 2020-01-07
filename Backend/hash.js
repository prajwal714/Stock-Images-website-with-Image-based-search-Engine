const bcrypt = require("bcrypt");

bcrypt.genSalt(10).then(salt => {
  bcrypt.hash("1234", salt).then(hashed => console.log(hashed));
});
