import mongoose from "mongoose";

const productCollectionSchema = mongoose.Schema(
  {
    collectionPrefix: {
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
