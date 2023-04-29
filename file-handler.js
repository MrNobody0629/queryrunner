const fs = require("fs/promises");

const writeIntoFile = async ({ content = "Something", fileName }) => {
  console.log("File handler called!");
  try {
    const file = `./json/${fileName}`;
    await fs.writeFile(file, content);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  writeIntoFile,
};
