import { ProductCollection } from "../models/productCollectionModel.js";

// POST create collection
export const createProductCollection = async (request, response) => {
  try {
    if (!request.body.collectionPrefix) {
      return response.status(400).send({
        message: "Send all required fields: collectionPrefix",
      });
    }

    const productCollection = await ProductCollection.create(request.body);
    return response.status(201).send(productCollection);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

// GET all
export const getAllProductCollection = async (request, response) => {
  try {
    const productCollections = await ProductCollection.find();
    return response.status(200).json(productCollections);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

// GET one by id
export const getProductCollectionById = async (request, response) => {
  try {
    const { id } = request.params;
    const productCollection = await ProductCollection.findById(id);
    return response.status(200).json(productCollection);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

// PUT update one by id
export const updateProductCollectionById = async (request, response) => {
  try {
    if (!request.body.collectionPrefix) {
      return response.status(400).send({
        message: "Send all required fields: collectionPrefix",
      });
    }

    const { id } = request.params;
    const result = await ProductCollection.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response
        .status(404)
        .json({ message: "Product Collection not found" });
    }

    return response
      .status(200)
      .send({ message: "Product Collection updated successfully" });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

// DELETE one by id
export const deleteProductCollectionById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await ProductCollection.findByIdAndDelete(id);
    if (!result) {
      return response
        .status(404)
        .json({ message: "Product Collection not found" });
    }
    return response
      .status(200)
      .send({ message: "Product Collection deleted successfully" });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};
