
// fetch(url)
//     .then((res) => {
//         console.log(res);
//         return res.json();
//     })
//     .then((data) => {
//         console.log(data.fact);
//     })
//     .catch((err) => {
//         console.log(err);

//     })

// async function getFacts() {
//     let res = await fetch(url);
//     return res;
// }


// async function getFacts() {
//     try {
//         let res = await fetch(url);
//         let data = await res.json();
//         console.log(data.fact);

//     } catch (error) {
//         console.log("Kuch to gadbad hai daya");

//     }
// }


let btn = document.querySelector("btn");

btn.addEventListener("click" , async ()=>{
    let fact = await getFact();
});

let url = "https://catfact.ninja/fact";

async function getFact(){
    try {
        let res = await axios.get(url);
        return res.data.fact;
    } catch (error) {
        
    }
}

