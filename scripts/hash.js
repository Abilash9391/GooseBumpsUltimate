// const bcrypt = require("bcrypt");

// const password = "admin123";

// bcrypt.hash(password, 10).then((hash) => {
//   console.log(hash);
// });

const argon2 = require("argon2");

const password = "admin123";

argon2.hash(password).then((hash) => {
  console.log("ARGON2 HASH:");
  console.log(hash);
});