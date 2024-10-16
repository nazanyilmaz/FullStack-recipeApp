const fs = require("fs");

exports.setData = (data) => {
  try {
    fs.writeFileSync("./data.json", JSON.stringify(data));
  } catch (error) {
    console.log(err);
  }
};
