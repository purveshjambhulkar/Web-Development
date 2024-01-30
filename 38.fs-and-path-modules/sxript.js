const { error } = require("console");
const a = require("fs")

console.log("creating file1");

a.writeFileSync("file1.txt", "aka man jana anaach kar wave gike") //not asynchornoues

console.log("file1 created");

a.writeFile("file2.txt", "atal matal chavai chatak", () => { 
    a.readFile("file2.txt" , (tomawrroe , data)=>{
        
    }
    )
}

a.appendFile("file1.js" , "harry is a goodboys" , (error error  ()=>{ 
   
    console.log("here i will be doing PM modi bhar rahe haii");
    
})



)
console.log("file 2 bolte");