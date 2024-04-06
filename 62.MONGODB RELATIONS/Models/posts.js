const mongoose = require("mongoose");

main().then(() => {
    console.log(`Connection Successfull !!`);

}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/RelationDemo');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



const instauserSchema = new mongoose.Schema({
    name : {
        type : String,
    },

    followers : {
        type : Number,
    },
})

const InstaUser = mongoose.model("InstaUser" , instauserSchema);


const addUsers = async (name , followers)=>{
    let user1 = new InstaUser({name : name , followers : followers});
    let result = await user1.save();
    console.log(result); 
}


const postsSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,  
        ref : 'InstaUser'  ,//referencing to User model
    },
    likes :{
        type : Number,
    },
    content : {
        type: String,
    }
});

const Post = mongoose.model("Post" , postsSchema);



const newPost = async (content , like , username)=>{
    let user1 = await InstaUser.findOne({name : username}); //get the user by his/her username from database
    let post1 = new Post({user :user1._id , likes : like , content : content});
    let result = await  post1.save() ;
    console.log(result);  
}

const ViewPosts = async (username)=>{
    let user1 = await InstaUser.find( {name : username} );
    let post1 = await Post.find({user : user1}).populate("user");
    console.log(post1);
}


// addUsers("Purvesh" , 123);
// addUsers("Om" , 12);
// addUsers("vifaj" , 1);

// newPost("HEllo Worolf"  , 6000 , "Purvesh");

// ViewPosts( "Purvesh") ;


