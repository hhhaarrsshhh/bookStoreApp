import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    name:String,
    price:Number,
    title:String,
    category:String,
    img1:String
})

const Book=mongoose.model("Book",bookSchema);
export default Book