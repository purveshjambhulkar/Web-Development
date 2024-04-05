module.exports = (fn)=>{
    return function(err , req , res , next){
        fn(req , res ,next).catch(next);
    }
}