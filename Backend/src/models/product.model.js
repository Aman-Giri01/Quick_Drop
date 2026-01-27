
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
        //   required: true,
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    stocks: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;