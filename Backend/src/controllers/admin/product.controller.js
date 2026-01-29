import expressAsyncHandler from "express-async-handler";
import ApiResponse from "../../utils/ApiResponse.util.js";
import ProductModel from "../../models/product.model.js";
import CustomError from "../../utils/customError.util.js";
import {
  deleteUploadedImage,
  uploadImage,
} from "../../utils/cloudinary.util.js";

export const getURL = (bufferValue, mimetype) => {
  const b64 = bufferValue.toString("base64");
  const imageURL = `data:${mimetype};base64,${b64}`;
  return imageURL;
};

export const addProduct = expressAsyncHandler(async (req, res) => {
  const bufferValue = req?.file?.buffer;
  const imageURL = getURL(bufferValue, req.file.mimetype);

  const uploadedImage = await uploadImage(imageURL);
  console.log(uploadedImage);

  let imgArr = [
    {
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
      asset_id: uploadedImage.asset_id,
    },
  ];

  const { name, description, price, category, brand, stocks } = req.body;

  const newProduct = await ProductModel.create({
    name,
    description,
    price,
    images: imgArr,
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

export const deleteProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedProduct = await ProductModel.findByIdAndDelete(id, {
    new: true,
  });
  if (!deletedProduct) next(new CustomError(404, "No product found"));
  new ApiResponse(200, "Product deleted successfully", deletedProduct).send(
    res
  );
});

export const getProducts = expressAsyncHandler(async (req, res, next) => {
  const products = await ProductModel.find();
  if (!products) next(new CustomError(404, "No products found, add some"));
  new ApiResponse(200, "fetched products successfully!", products).send(res);
});

export const getProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if (!product) next(new CustomError(404, "not found anything"));
  new ApiResponse(200, "Found the product", product).send(res);
});

export const updateImage = expressAsyncHandler(async (req, res, next) => {
  const { public_id, id } = req.body;
  const bufferValue = req?.file?.buffer;
  const imageURL = getURL(bufferValue, req?.file?.mimetype);

  let existingProduct = await ProductModel.findById({ id });
  if (!existingProduct) next(new CustomError(404, "cannot find the product"));

  const resp = await deleteUploadedImage(public_id);

  if (resp.result !== "OK") return next(new CustomError(500, resp.result));

  const uploadedResp = await uploadedImage(imageURL);
  let updatedImages = [
    {
      public_id: uploadedResp.public_id,
      url: uploadedResp.secure_url,
      asset_id: uploadedResp.asset_id,
    },
  ];
  existingProduct.images = updatedImages;
  await existingProduct.save();

  new ApiResponse(200, "Image Updated Successfully").send(res);
});

export const deleteImage = expressAsyncHandler(async (req, res, next) => {
  const { public_id, productId } = req.body;

  let existingProduct = await ProductModel.findById(productId);
  if (!existingProduct) next(new CustomError(404, "Product Not Found"));

  const resp = await deleteUploadedImage(public_id);

  if (resp.result === "ok") {
    existingProduct.images = [];
    await existingProduct.save();
  } else {
    return next(new CustomError(500, resp.result));
  }

  new ApiResponse(200, "Image Deleted Successfully", resp).send(res);
});
