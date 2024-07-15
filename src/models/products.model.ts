import db from "../config/db.config";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const query = <T>(sql: string, args?: unknown): Promise<T> => {
  return new Promise((resolve, reject) => {
    db.query(sql, args, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const getAllProducts = async (): Promise<Product[]> => {
  const results = await query<Product[]>("SELECT * FROM products");
  return results;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const results = await query<Product[]>(
    "SELECT * FROM products WHERE id = ?",
    [id]
  );

  return results.length > 0 ? results[0] : null;
};

export const createProduct = async (product: Product): Promise<void> => {
  await query("INSERT INTO products SET ?", product);
};

export const updateProduct = async (
  id: string,
  product: Product
): Promise<boolean> => {
  const rows = await query<Product[]>("SELECT * FROM products WHERE id = ?", [
    id,
  ]);

  if (rows.length === 0) {
    return false;
  }

  await query("UPDATE products SET ? WHERE id = ?", [product, id]);
  return true;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const rows = await query<Product[]>("SELECT * FROM products WHERE id = ?", [
    id,
  ]);

  if (rows.length === 0) {
    return false;
  }

  await query("DELETE FROM products WHERE id = ?", [id]);
  return true;
};
