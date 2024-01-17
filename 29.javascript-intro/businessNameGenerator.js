// / * Create a business name generator by combining list of adjectives
// and shop name and another word
// Adjectives:
// Crazy
// Amazing
// Fire
// Shop Name:
// Engine
// Foods
// Garments
// Another Word:
// Bros
// Limit"
// Hub


const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function Adjectives(a) {
    if (a<=30) {
        return "Crazy"
    }else if(a>30 && a <=60){
        return "Amazing"
    }else {
        return "Fire"
    }
    
}
function Shope_Name(a) {
    if (a<=30) {
        return "Engine"
    }else if(a>30 && a <=60){
        return "Food"
    }else {
        return "Garments"
    }
    
}
function Another(a) {
    if (a<=30) {
        return "Bros"
    }else if(a>30 && a <=60){
        return "Limited"
    }else {
        return "Hub"
    }
    
}

function generateName() {
    let adj = getRandomInt(1 , 90)
    let nme = getRandomInt(1 , 90)
    let another = getRandomInt(1 , 90)

    let x = Adjectives(adj)
    let y = Shope_Name(nme)
    let z = Another(another)

    console.log(`Brand Name is : ${x} ${y} ${z}`)

}

generateName()

