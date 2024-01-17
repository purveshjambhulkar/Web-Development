// / * Create a faulty calculator using JavaScript
// This faulty calculator does following:
// 1. + ---- -
// 2. * ---- +
// 3. - ---- /
//4.  / ---- **
// It
// It takes two numbers as input from the user
// It perfoms wrong operations as follows:
// performs wrong operation of the times

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function faulty(a ,b ,opt) {
    if (opt == '*') {
        return (a) + (b) ;
    }else if(opt == '+'){
        return (a) - (b);
    }else if(opt == '-'){
        return (a) / (b) ;
    }else if (opt == '/') {
        return (a) ** (b);
    }else{
        console.log("Invalid operator")
    }
}


function notfaulty(a ,b , opt ) {
    if (opt == '*') {
        return (a) * (b) ;
    }else if(opt == '+'){
        return (a) + (b);
    }else if(opt == '-'){
        return (a) - (b) ;
    }else if (opt == '/') {
        return (a) / (b);
    }else{
        console.log("Invalid operator")
    }
}

while (true) {

    console.log("Do you want to calculate something")
    console.log("Yes - 1 || No - 0")

   
    let a = prompt("Enter your command : Yes - 1 || No - 0  ");
    if (a == 1) {
        
    } else {
        break;
    }

    let opt = prompt("Enter which operation you want to perform");
    let op1 = parseInt(prompt("Enter operand 1"));
    let op2 = parseInt(prompt("Enter operand 2"));

    let randomint = getRandomInt(1, 100)

  

    if (randomint <= 10) {
        let result = faulty(op1 , op2 ,opt)
        console.log("Anser :"+ result)
    } else {
        let result = notfaulty(op1 ,op2 ,opt)
        console.log("Anser : "+result)
        console.log(`Anseer is : ${result}`)
    }
    
}   