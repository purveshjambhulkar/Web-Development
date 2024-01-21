let arr = [1,2,3,4,5,6,7,8,9]

console.log("This is a Array : " + arr)

console.log("The last element of the Array : " + arr.pop())

arr.push(99) // Adding ELemet to the array at last

console.log("The first element of the Array : " + arr.shift())

arr.unshift(999) // Adding element at the starting of the Array

arr.splice(1,2) // del elemets from i to 2 index

// arr.reverse()

console.log("This is a Array : " + arr)

arr.forEach((index , value , arr)=>{
    if (value%2===0) {
        console.log("Index : " + index + " Value : "+value)
    }
})

function factorial(a){
    if (a == 0) {
        return 1
    }
    return a * factorial(a-1)
}


console.log("Factorial of a : " + factorial(5))

