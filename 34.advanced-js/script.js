async function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(24)
        }, 2000);
    })
            
}   

//IIFE - function that runs as soon as it is defined

(async function main(){
    let a = await delay()

    console.log("I am inside IIFE");

    await delay()

    console.log('finnaly i am printed');
    
    
})()
