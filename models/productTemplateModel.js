import mongoose, { Schema } from "mongoose";

const productTemplateSchema = mongoose.Schema(
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
    names: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductTemplate = mongoose.model(
  "ProductTemplate",
  productTemplateSchema
);
