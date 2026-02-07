import expressAsyncHandler from "express-async-handler";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/customError.util.js";
import AddressModel from "../../models/address.model.js";

export const addAddress = expressAsyncHandler(async (req, res, next) => {
  const userId = req.myUser?.id;
  if (!userId) return next(new CustomError(401, "Unauthorized"));

  const {
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    landmark,
    type,
    isDefault,
  } = req.body;

  if (isDefault) {
    await AddressModel.updateMany({ user: userId }, { isDefault: false });
  }

  const newAddress = await AddressModel.create({
    user: userId,
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    landmark,
    type,
    isDefault: Boolean(isDefault),
  });

  if (!newAddress) {
    return next(new CustomError(400, "Cannot add address"));
  }

  new ApiResponse(201, "Address Added Successfully", newAddress).send(res);
});

export const updateAddress = expressAsyncHandler(async (req, res, next) => {
  const userId = req.myUser?.id;
  if (!userId) return next(new CustomError(401, "Unauthorized"));

  const { id } = req.params;
  if (!id) return next(new CustomError(400, "Address id is required"));

  const updateData = { ...req.body };

  if (updateData.isDefault) {
    await AddressModel.updateMany({ user: userId }, { isDefault: false });
  }

  const updatedAddress = await AddressModel.findOneAndUpdate(
    { _id: id, user: userId },
    { $set: updateData },
    { new: true, runValidators: true },
  );

  if (!updatedAddress) {
    return next(new CustomError(404, "Address not found"));
  }

  new ApiResponse(200, "Address Updated Successfully", updatedAddress).send(
    res,
  );
});

export const deleteAddress = expressAsyncHandler(async (req, res, next) => {
  const userId = req.myUser?.id;
  if (!userId) return next(new CustomError(401, "Unauthorized"));

  const { id } = req.params;
  if (!id) return next(new CustomError(400, "Address id is required"));

  const deletedAddress = await AddressModel.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!deletedAddress) {
    return next(new CustomError(404, "Address not found"));
  }

  new ApiResponse(200, "Address Deleted Successfully", deletedAddress).send(res);
});
