import mongoose from "mongoose";

// mini schema for cart

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // each user has only one cart
  },
  items: [cartItemSchema],
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);
