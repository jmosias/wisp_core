import mongoose from "mongoose";
import { ProductCollection } from "../models/productCollectionModel.js";
import {
  throwMissingFieldsError,
  throwNotFoundError,
} from "../middlewares/errorHandling.js";

// POST > Create a collection
export const createProductCollection = async (request, response, next) => {
  try {
    const { templateId, name, codePrefix } = request.body;

    if (!templateId || !name || !codePrefix) {
      throwMissingFieldsError(["templateId", "name", "codePrefix"], {
        templateId,
        name,
        codePrefix,
      });
    }

    const productCollection = await ProductCollection.create({
      userId: request.user._id,
      templateId,
      name,
      codePrefix,
    });
    response.status(201).send(productCollection);
  } catch (error) {
    next(error);
  }
};

// GET > Get all collections from the logged in user
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

// GET > Get a collection by id
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

// PUT > Update a collection by id
export const updateProductCollectionById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { templateId, name, codePrefix } = request.body;

    if (!templateId || !name || !codePrefix) {
      throwMissingFieldsError(["templateId", "name", "codePrefix"], {
        templateId,
        name,
        codePrefix,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwNotFoundError("Product Collection");
    }

    const result = await ProductCollection.findByIdAndUpdate(id, {
      name,
      templateId,
      codePrefix,
    });

    if (!result) {
      throwNotFoundError("Product Collection");
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

// DELETE > Delete a collection by id
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

    response.status(204).send();
  } catch (error) {
    next(error);
  }
};
