import bcrypt from "bcrypt";

console.log(await bcrypt.compare("hell", await bcrypt.hash("hello", 10)));
