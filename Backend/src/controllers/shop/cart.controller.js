import expressAsyncHandler from "express-async-handler";
import CartProductModel from "../../models/cart.model.js";
import UserModel from "../../models/user.model.js";
import CustomError from "../../utils/customError.util.js";
import ApiResponse from "../../utils/ApiResponse.util.js";


 /*ADD TO CART*/
 
export const addToCartItemController = expressAsyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const { productId } = req.body;

  if (!productId) {
    return next(new CustomError(400, "Provide productId"));
  }

  const existingItem = await CartProductModel.findOne({
    userId,
    productId,
  });

  if (existingItem) {
    return next(new CustomError(400, "Item already in cart"));
  }

  const cartItem = await CartProductModel.create({
    quantity: 1,
    userId,
    productId,
  });

  await UserModel.updateOne(
    { _id: userId },
    { $push: { shopping_cart: productId } }
  );

  new ApiResponse(201, "Item added successfully", cartItem).send(res);
});

/**
  GET CART ITEMS */
export const getCartItemController = expressAsyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const cartItems = await CartProductModel.find({ userId })
    .populate("productId");

  if (!cartItems.length) {
    return next(new CustomError(404, "Cart is empty"));
  }

  new ApiResponse(200, "Cart fetched successfully", cartItems).send(res);
});

/**
 * UPDATE CART ITEM QUANTITY
 */
export const updateCartItemQtyController = expressAsyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const { _id, qty } = req.body;

  if (!_id || !qty) {
    return next(new CustomError(400, "Provide _id and qty"));
  }

  const updatedItem = await CartProductModel.findOneAndUpdate(
    { _id, userId },
    { quantity: qty },
    { new: true }
  );

  if (!updatedItem) {
    return next(new CustomError(404, "Cart item not found"));
  }

  new ApiResponse(200, "Cart updated successfully", updatedItem).send(res);
});

/**
 * DELETE CART ITEM
 */
export const deleteCartItemQtyController = expressAsyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const { _id } = req.body;

  if (!_id) {
    return next(new CustomError(400, "Provide _id"));
  }

  const deletedItem = await CartProductModel.findOneAndDelete({
    _id,
    userId,
  });

  if (!deletedItem) {
    return next(new CustomError(404, "Cart item not found"));
  }

  new ApiResponse(200, "Item removed from cart", deletedItem).send(res);
});
