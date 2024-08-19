const fs = require("fs");

const folderNumber = 3;

const pageAddNumber = 56;

const type = ".webp"; //".jpg"

const folderPath = `E:\\Project\\${folderNumber}\\`;

const file = fs.readdirSync(folderPath);

file.forEach((image) => {
  const pageNumber = image.slice(0, 5);
  const num = Number(pageNumber) + pageAddNumber;
  let newPage = "";
  if (num % 10 === num) {
    newPage = "000" + num + type;
  } else if (num % 100 === num) {
    newPage = "00" + num + type;
  } else if (num % 1000 === num) {
    newPage = "0" + num + type;
  }

  let oldPath = `E:\\Project\\${folderNumber}\\` + image;
  let NewPath = `E:\\Project\\${folderNumber}\\` + newPage;

  fs.rename(oldPath, NewPath, (err) => {
    if (err) {
      console.error("Error renaming file:", err);
    } else {
      console.log("File renamed successfully.");
    }
  });
});
