var uniqid = require("uniqid");

function generatenewpassword(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return uniqid() + result;
}

/////////////////////////////////////////////////////////////////////////

module.exports = {
  generatenewpassword: generatenewpassword,
};
