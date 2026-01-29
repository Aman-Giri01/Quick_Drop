import expressAsyncHandler from "express-async-handler";
import ProductModel from "../../models/product.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/customError.util.js";

export const fetchProducts = expressAsyncHandler(async (req, res, next) => {
  let products = await ProductModel.find();
  if (products.length === 0) next(new CustomError(404, "No Products Found"));
  new ApiResponse(200, "Products Fetched Successfully", products).send(res);
});

export const fetchProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if (!product) next(new CustomError(404, "Product Not Found"));
  new ApiResponse(200, "Product Fetched Successfully", product).send(res);
});

export const searchProducts = expressAsyncHandler(async (req, res, next) => {
  const { keyword } = req.query;
  const searchRegex = new RegExp(keyword, "i");

  const products = await ProductModel.find({
    $or: [
      { name: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
      { category: { $regex: searchRegex } },
      { brand: { $regex: searchRegex } },
    ],
  });

  if (!products.length) {
    return next(new CustomError(404, "No products found"));
  }

  new ApiResponse(200, "Products fetched successfully", products).send(
    res
  );
});
