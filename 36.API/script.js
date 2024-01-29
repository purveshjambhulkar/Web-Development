const URL = "https://cat-fact.herokuapp.com";

const getFacts = async ()=>{
    
    let response = await fetch(URL); //GET REQUEST (default)
    console.log(response);
    let data =  await response.json();
    console.log("getting data");
    
    console.log(data[0].Fact);

    
    
    
};

