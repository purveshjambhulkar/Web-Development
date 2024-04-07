const mongoose = require("mongoose");

main().then(() => {
    console.log(`Connection Successfull !!`);

}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/RelationDemo');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



const orderSchema = new mongoose.Schema({
    item: {
        type: String,
    },
    price: {
        type: Number,
    },
});

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        }
    ]
})

//defining the pre and post mongoose middlewares
customerSchema.pre("findOneAndDelete", () => {
    console.log(`Pre Middleware`);

})

customerSchema.post("findOneAndDelete",async (customer) => {
    //we will this middleware to delele the orders which are
    // given by the customer from the database

    if(customer.orders.length){
        await Order.deleteMany({_id : {$in: customer.orders}});
    }
    // console.log(result);
    

})



const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addOrders = async (item, price) => {
    let order1 = new Order({ item: item, price: price });
    let result = await order1.save();
    console.log(result);

};

const addCustomer = async (name, item) => {

    let item1 = await Order.findOne({ item: item });
    let itemId = item1._id;
    let cust1 = new Customer({
        name: name,
        orders: [itemId],
    })
    let res = await cust1.save();
    console.log(res);
};

const MoreOrderCust = async (name, item) => {

    let cust1 = await Customer.findOne({ name: name });
    let item1 = await Order.findOne({ item: item });
    let itemId = item1._id;
    cust1.orders.push(itemId);
    let result = await cust1.save();
    console.log(result);
}

const ViewCustomerOrder = async (name) => {
    let user1 = await Customer.findOne({ name: name }).populate("orders");
    console.log(user1);
}

const deleteCust = async()=>{
    let result = await Customer.findByIdAndDelete("6612d7a41513f4ae76028eb7"); //here add the id of the customer which is to be deleted from the database
    console.log(result);
    
}

let list = ["cocacola" , "maggie" , "coffee" , "softie"];
let listp = [40 , 20 , 25 , 15];

const addingItems = async()=>{
    for(let i = 0; i< list.length ; i++){
        let order1 = new Order({item : list[i] , price : listp[i]});
        await order1.save();
    }
}

// addingItems();


// addOrders("vadapav" , 15);
// addOrders("pizza" , 50);

// addCustomer("viraj" , "pizza");
// MoreOrderCust("om" , "pizza");

// ViewCustomerOrder("purvesh");

// deleteCust();


