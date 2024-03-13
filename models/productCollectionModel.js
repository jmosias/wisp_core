import mongoose from "mongoose";

const productCollectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductCollection = mongoose.model(
  "ProductCollection",
  productCollectionSchema
);
