const fs = require("fs");
const path = require("path");

// ====== CONFIGURATION ======
const parentPath = "E:\\Project\\"; // the folder that contains all sub-folders
const targetFolder = "1"; // all files will be moved into this folder
const type = ".webp"; // only process files with this extension
const digits = 4; // number of digits for the new names (0001, 0002, ...)
// ===========================

const targetPath = path.join(parentPath, targetFolder);

// Make sure the target folder exists
if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath, { recursive: true });
}

// 1. Get all sub-folders, sorted by number (1, 2, 3, ...)
const folders = fs
  .readdirSync(parentPath, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => Number(a) - Number(b));

console.log("Folders:", folders);

// 2. Collect all matching files in folder order
const files = [];
for (const folder of folders) {
  const folderPath = path.join(parentPath, folder);
  const names = fs
    .readdirSync(folderPath)
    .filter((name) => name.toLowerCase().endsWith(type.toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  for (const name of names) {
    files.push({ source: path.join(folderPath, name), ext: path.extname(name) });
  }
}

console.log("Total files:", files.length);

// 3. Rename sequentially into the target folder
files.forEach((file, index) => {
  const num = index + 1;
  const newName = String(num).padStart(digits, "0") + file.ext;
  const destination = path.join(targetPath, newName);

  // Same file, already in place
  if (file.source.toLowerCase() === destination.toLowerCase()) {
    console.log(`Skip (already in place): ${file.source}`);
    return;
  }

  if (fs.existsSync(destination)) {
    console.log(`Warning: overwriting existing file ${destination}`);
  }

  fs.renameSync(file.source, destination);
  console.log(`${file.source}  ->  ${destination}`);
});

console.log("Done!");
