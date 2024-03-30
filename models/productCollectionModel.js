import mongoose, { Schema } from "mongoose";

const productCollectionSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    templateId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ProductTemplate",
    },
    name: {
      type: String,
      required: true,
    },
    codePrefix: {
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
