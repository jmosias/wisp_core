import mongoose from "mongoose";
import { ProductTemplate } from "../models/productTemplateModel.js";
import {
  throwMissingFieldsError,
  throwNotFoundError,
} from "../middlewares/errorHandling.js";

// POST > Create a template
export const createProductTemplate = async (request, response, next) => {
  try {
    const { names } = request.body;

    if (!names) {
      throwMissingFieldsError(["names"], { names });
    }

    const productTemplate = await ProductTemplate.create({
      userId: request.user._id,
      names,
    });
    response.status(201).send(productTemplate);
  } catch (error) {
    next(error);
  }
};

// GET > Get all templates from the logged in user
export const getAllProductTemplate = async (request, response, next) => {
  try {
    const productTemplates = await ProductTemplate.find({
      userId: request.user._id,
    });
    response.status(200).json(productTemplates);
  } catch (error) {
    next(error);
  }
};

// GET > Get a template by id
export const getProductTemplateById = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwNotFoundError("Product Template");
    }

    const productTemplate = await ProductTemplate.findById(id);
    response.status(200).json(productTemplate);
  } catch (error) {
    next(error);
  }
};

// PUT > Update a template by id
export const updateProductTemplateById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { names } = request.body;

    if (!names) {
      throwMissingFieldsError(["names"], { names });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwNotFoundError("Product Template");
    }

    const result = await ProductTemplate.findByIdAndUpdate(id, {
      names,
    });

    if (!result) {
      throwNotFoundError("Product Template");
    }

    response
      .status(200)
      .send({ message: "Product Template updated successfully" });
  } catch (error) {
    next(error);
  }
};

// DELETE > Delete a template by id
export const deleteProductTemplateById = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwNotFoundError("Product Template");
    }

    const result = await ProductTemplate.findByIdAndDelete(id);

    if (!result) {
      throwNotFoundError("Product Template");
    }

    response
      .status(200)
      .send({ message: "Product Template deleted successfully" });
  } catch (error) {
    next(error);
  }
};
