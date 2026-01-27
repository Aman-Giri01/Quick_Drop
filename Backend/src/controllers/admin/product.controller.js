import expressAsyncHandler from "express-async-handler";
import ApiResponse from "../../utils/ApiResponse.util.js";
import ProductModel from "../../models/product.model.js";
import CustomError from "../../utils/CustomError.util.js";

export const addProduct = expressAsyncHandler(async (req, res) => {
  const { name, description, price, category, brand, stocks } = req.body;

  const newProduct = await ProductModel.create({
    name,
    description,
    price,
    category,
    brand,
    stocks,
  });

  new ApiResponse(201, "Product Added Successfully", newProduct).send(res);
});

export const updateProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updateProduct) next(new CustomError(404, "No product found to update"));
  new ApiResponse(200, "Product updated Successfully", updateProduct).send(res);
});

export const deleteProduct = expressAsyncHandler(async(req, res, next)=>{
  const {id} = req.params;
  const deletedProduct = await ProductModel.findByIdAndDelete(id, {
    new : true
  })
  if(!deletedProduct) next (new CustomError(404, "No product found"));
  new ApiResponse(200, "Product deleted successfully", deletedProduct).send(res)
})
