import fs from "fs/promises"

let data = await fs.readFile("file2.txt")

console.log(data.toString(200));

let data2 = await fs.writeFile("file1.txt" , "butterfly butter fly where are you going")

console.log(b);
