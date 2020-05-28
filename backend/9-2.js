const jwt = require("jsonwebtoken");

const playload = {
  stdid: "B6016357",
  name: "Trirong Bamrungketaudom",
  major: "CPE",
};

const key = "MY_KEY";
const token = jwt.sign(playload, key, { expiresIn: 60 * 5 });
console.log(token);

try {
  const dataInToken = jwt.verify(token, key);
  console.log(dataInToken);
} catch (error) {
  console.log(error);
}
