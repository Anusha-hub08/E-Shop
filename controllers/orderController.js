const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async(req,res)=>{

    try{

        const cartItems = await Cart.find({
            user:req.session.user._id
        }).populate("product");

        let total=0;

        let products=[];

        cartItems.forEach(item=>{

            total += item.product.price * item.quantity;

            products.push({

                product:item.product._id,

                quantity:item.quantity

            });

        });

        await Order.create({

    user:req.session.user._id,

    products,

    total: total,

    status: "Placed"

});

        await Cart.deleteMany({

            user:req.session.user._id

        });

        res.redirect("/orders");

    }

    catch(err){

        console.log(err);

    }

}

exports.viewOrders = async(req,res)=>{

    const orders = await Order.find({

        user:req.session.user._id

    }).populate("products.product");

    res.render("orders",{

        orders

    });

}