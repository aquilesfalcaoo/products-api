import { Router, Request, Response } from "express";
import {
  redirectToApiDocs,
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
} from "../controllers/products.controller";

const router = Router();

router.get("/", redirectToApiDocs);
router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", addProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", removeProduct);

router.use("*", (req: Request, res: Response) => {
  const err = Error(`Requested path ${req.path} not found`);
  res.status(404).send({
    success: false,
    message: `Requested path ${req.path} not found`,
    stack: err.stack,
  });
});

export default router;
