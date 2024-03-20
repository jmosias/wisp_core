import mongoose from "mongoose";
import { ProductCollection } from "../models/productCollectionModel.js";
import {
  throwMissingFieldsError,
  throwNotFoundError,
} from "../middlewares/errorHandling.js";

// POST create collection
export const createProductCollection = async (request, response, next) => {
  try {
    const { name, templateId } = request.body;
    const productCollection = await ProductCollection.create({
      userId: request.user._id,
      name,
      templateId,
    });
    response.status(201).send(productCollection);
  } catch (error) {
    next(error);
  }
};

// GET all from current user
export const getAllProductCollection = async (request, response, next) => {
  try {
    const productCollections = await ProductCollection.find({
      userId: request.user._id,
    });
    response.status(200).json(productCollections);
  } catch (error) {
    next(error);
  }
};

// GET one by id
export const getProductCollectionById = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwNotFoundError("Product Collection");
    }

    const productCollection = await ProductCollection.findById(id);
    response.status(200).json(productCollection);
  } catch (error) {
    next(error);
  }
};

// PUT update one by id
export const updateProductCollectionById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, templateId } = request.body;

    if (!name || !templateId) {
      throwMissingFieldsError(["name", "templateId"], request.body);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwNotFoundError("Product Collection");
    }

    const result = await ProductCollection.findByIdAndUpdate(id, request.body);

    if (!result) {
      throwNotFoundError("Product Collection");
    }

    response
      .status(200)
      .send({ message: "Product Collection updated successfully" });
  } catch (error) {
    next(error);
  }
};

// DELETE one by id
export const deleteProductCollectionById = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwNotFoundError("Product Collection");
    }

    const result = await ProductCollection.findByIdAndDelete(id);

    if (!result) {
      throwNotFoundError("Product Collection");
    }

    response
      .status(200)
      .send({ message: "Product Collection deleted successfully" });
  } catch (error) {
    next(error);
  }
};
