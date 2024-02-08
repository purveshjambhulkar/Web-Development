let url = "https://dog.ceo/api/breeds/image/random";

document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code here
    let btn = document.querySelector(".btn");

    btn.addEventListener("click", async () => {
        let pic = await getImage();
        let img = document.querySelector(".image");
        img.setAttribute("src" , pic);
    });

    // let url = "https://catfact.ninja/fact";

    async function getImage() {
        try {
            let res = await axios.get(url);
            return res.data.message;
        } catch (error) {
            console.log("error - ", error);
            return "No Fact Found";
        }
    }
});
