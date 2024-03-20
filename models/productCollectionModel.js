import mongoose, { Schema } from "mongoose";

const productCollectionSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    templateId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ProductTemplate",
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
