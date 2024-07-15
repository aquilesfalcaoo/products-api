import { Request, Response } from "express";
import Joi from "joi";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/products.model";

const productSchema = Joi.object({
  name: Joi.string().min(3).max(45).optional(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().greater(0).optional(),
});

export const redirectToApiDocs = (req: Request, res: Response) => {
  res.redirect("/api-docs");
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err: any) {
    res.status(500).json({ message: `Internal server error: ${err.message}` });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const product = await getProductById(id);
    if (!product) {
      res.status(404).json({ message: "Product id not found" });
      return;
    }

    res.status(200).json(product);
  } catch (err: any) {
    res.status(500).json({ message: `Internal server error: ${err.message}` });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const { error, value } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    await createProduct(value);
    res
      .status(201)
      .send({ success: true, message: "Product added successfully" });
  } catch (err: any) {
    res.status(500).json({ message: `Internal server error: ${err.message}` });
  }
};

export const editProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { error, value } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const result = await updateProduct(id, value);

    if (!result) {
      res.status(404).json({ message: "Product id not found to update" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Product updated successfully." });
  } catch (err: any) {
    res.status(500).json({ message: `Internal server error: ${err.message}` });
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await deleteProduct(id);
    if (!result) {
      res.status(404).json({ message: "Product id not found to delete" });
      return;
    }

    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: `Internal server error: ${err.message}` });
  }
};
