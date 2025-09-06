import { Router } from "express";
import {
    createProduct,
    getMyProducts,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById
} from "../controllers/product.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// all routes are secured as only after login can a user sell or buy a product
router.route("/addProduct").post(verifyJWT,upload.array("productImage",5),createProduct);  // max 5 images
router.route("/myProducts").get(verifyJWT,getMyProducts);
router.route("/updateProduct").patch(verifyJWT,updateProduct);
router.route("/deleteProduct").delete(verifyJWT, deleteProduct);
router.route("/getAll").get(verifyJWT,getAllProducts);
router.route("/getById").get(verifyJWT,getProductById);

export default router;