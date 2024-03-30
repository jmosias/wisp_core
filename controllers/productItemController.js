import mongoose from "mongoose";
import { ProductItem } from "../models/productItemModel.js";
import {
  throwMissingFieldsError,
  throwNotFoundError,
} from "../middlewares/errorHandling.js";

// POST > Create an item
export const createProductItem = async (request, response, next) => {
  try {
    const { collectionId, details, code } = request.body;

    if (!collectionId || !details || !code) {
      throwMissingFieldsError(["details", "collectionId", "code"], {
        collectionId,
        details,
        code,
      });
    }

    const productItem = await ProductItem.create({
      userId: request.user._id,
      collectionId,
      details,
      code,
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
    const { collectionId, details, code } = request.body;

    if (!collectionId || !details || !code) {
      throwMissingFieldsError(["details", "collectionId", "code"], {
        collectionId,
        details,
        code,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwNotFoundError("Product Item");
    }

    const result = await ProductItem.findByIdAndUpdate(id, {
      details,
      collectionId,
      code,
    });

    if (!result) {
      throwNotFoundError("Product Item");
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

// PUT > Update all items from array
export const updateProductItems = async (request, response, next) => {
  try {
    const { items } = request.body;

    for (const item of items) {
      await ProductItem.updateMany({ _id: item._id }, { $set: item });
    }

    response.status(204).send();
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

    response.status(204).send();
  } catch (error) {
    next(error);
  }
};
