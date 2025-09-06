import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  description:{
    required: true,
    type: String,
  },
  title:{
    required: true,
    type: String,
  },
  productImage:[{
    type:String,
    required:true,
  }],
  price:{
    type: Number,
    default:0,
    required:true,
  },
  stock:{
    default:0,
    type: Number,
  },
  catgeory:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
status: {
  type: String,
  enum: ["SOLD", "UNSOLD"],
  default: "UNSOLD",
},

},{timestamps:true});

export const Product = mongoose.model("Product",productSchema);