import mongoose, { Schema } from "mongoose";

const productItemSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ProductCollection",
    },
    details: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductItem = mongoose.model("ProductItem", productItemSchema);
