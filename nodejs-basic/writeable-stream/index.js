const fs = require("fs");

const readableStream = fs.createReadStream("./input.txt", {
  highWaterMark: 15,
});

const writeableStream = fs.createWriteStream("output.txt");

readableStream.on("readable", () => {
  writeableStream.write(`${readableStream.read()} \n`);
});

readableStream.on("end", () => {
  console.log("Done");
});
