document.addEventListener("DOMContentLoaded", function () {
    let btn = document.querySelector(".btn");

    btn.addEventListener("click", async () => {
        let fact = await getFact();
        let p = document.querySelector(".factArea");
        p.innerText = fact;
    });

    let url = "https://catfact.ninja/fact";

    async function getFact() {
        try {
            let res = await axios.get(url);
            return res.data.fact;
        } catch (error) {
            console.log("error - ", error);
            return "No Fact Found";
        }
    }



})