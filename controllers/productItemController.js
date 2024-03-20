import mongoose from "mongoose";
import { ProductItem } from "../models/productItemModel.js";
import {
  throwMissingFieldsError,
  throwNotFoundError,
} from "../middlewares/errorHandling.js";

// POST > Create an item
export const createProductItem = async (request, response, next) => {
  try {
    const { details, collectionId } = request.body;

    if (!details || !collectionId) {
      throwMissingFieldsError(["details", "collectionId"], {
        details,
        collectionId,
      });
    }

    const productItem = await ProductItem.create({
      userId: request.user._id,
      details,
      collectionId,
    });
    response.status(201).send(productItem);
  } catch (error) {
    next(error);
  }
};

// GET > Get all items from the logged in user
export const getAllProductItem = async (request, response, next) => {
  try {
    const productItems = await ProductItem.find({
      userId: request.user._id,
    });
    response.status(200).json(productItems);
  } catch (error) {
    next(error);
  }
};

// GET > Get an item by id
export const getProductItemById = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwNotFoundError("Product Item");
    }

    const productItem = await ProductItem.findById(id);
    response.status(200).json(productItem);
  } catch (error) {
    next(error);
  }
};

// PUT > Update an item by id
export const updateProductItemById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { details, collectionId } = request.body;

    if (!details || !collectionId) {
      throwMissingFieldsError(["details", "collectionId"], {
        details,
        collectionId,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwNotFoundError("Product Item");
    }

    const result = await ProductItem.findByIdAndUpdate(id, {
      details,
      collectionId,
    });

    if (!result) {
      throwNotFoundError("Product Item");
    }

    response.status(200).send({ message: "Product Item updated successfully" });
  } catch (error) {
    next(error);
  }
};

// DELETE > Delete an item by id
export const deleteProductItemById = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwNotFoundError("Product Item");
    }

    const result = await ProductItem.findByIdAndDelete(id);

    if (!result) {
      throwNotFoundError("Product Item");
    }

    response.status(200).send({ message: "Product Item deleted successfully" });
  } catch (error) {
    next(error);
  }
};
