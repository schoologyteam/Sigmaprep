import fs from "fs";

export function getDirectoryFolderNames(path) {
  const all = fs.readdirSync(path);
  return all.filter((item) => {
    return !item.includes(".");
  });
}
