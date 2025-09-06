import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


// Create Product
export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, stock } = req.body;

  if (!title || !description || !price) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // Handle multiple images (multer handles req.files)
  let imageUrls = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (!uploaded?.url) {
        throw new ApiError(500, "Error uploading product image to Cloudinary");
      }
      imageUrls.push(uploaded.url);
    }
  }

  const product = await Product.create({
    title,
    description,
    price,
    stock,
    productImage: imageUrls,
    owner: req.user?._id,
    status: "UNSOLD",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

// View My Products
export const getMyProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ owner: req.user?._id });

  return res
    .status(200)
    .json(new ApiResponse(200, products, "User products fetched successfully"));
});

// Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let updates = req.body;

  // Handle new image uploads if present
  if (req.files && req.files.length > 0) {
    let imageUrls = [];
    for (const file of req.files) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (!uploaded?.url) {
        throw new ApiError(500, "Error uploading product image to Cloudinary");
      }
      imageUrls.push(uploaded.url);
    }
    updates.productImage = imageUrls;
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id, owner: req.user?._id },
    { $set: updates },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(404, "Product not found or not owned by user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

// Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndDelete({
    _id: id,
    owner: req.user?._id,
  });

  if (!product) {
    throw new ApiError(404, "Product not found or not owned by user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});

// Browse All Products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("owner", "username email")
  return res
    .status(200)
    .json(new ApiResponse(200, products, "All products fetched successfully"));
});

// Product Detail View
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("owner", "username email")

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});
