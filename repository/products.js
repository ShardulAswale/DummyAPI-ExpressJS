const { ObjectId } = require("mongodb");
const connect = require("../services/productServices");
const collection = "Products"; // Assuming your collection is named "products"

class Products {
  constructor() {}

  async insertProduct(product) {
    try {
      let db = await connect();
      const result = await db.collection(collection).insertOne(product);
      return result;
    } catch (error) {
      console.error("Error inserting product:", error);
      throw error;
    }
  }

  async getAllProducts() {
    try {
      let db = await connect();
      const Products = await db.collection(collection).find().toArray();
      const productsLength = Products.length;
      return { Products, productsLength };
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  }

  async getProductByID1(ID) {
    try {
      let db = await connect();
      const result = await db.collection(collection).findOne({
        _id: new ObjectId(ID),
      });
      return result;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }

  async getProductByID2(ID) {
    try {
      let db = await connect();
      const result = await db.collection(collection).findOne({
        id: parseInt(ID),
      });
      return result;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }

  async updateProduct(productId, product) {
    try {
      let db = await connect();
      const result = await db.collection(collection).updateOne(
        {
          _id: new ObjectId(productId),
        },
        { $set: { ...product } }
      );
      return result;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      let db = await connect();
      const result = await db.collection(collection).deleteOne({
        _id: new ObjectId(productId),
      });
      return result;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }

  async getProductsWithPagination(pageSize, pageNumber) {
    try {
      let db = await connect();

      const totalProducts = await db.collection(collection).countDocuments();
      const totalPages = Math.ceil(totalProducts / pageSize);

      if (pageNumber < 1 || pageNumber > totalPages) {
        return { error: "Invalid page number" };
      }

      const skip = (pageNumber - 1) * pageSize;

      const result = await db
        .collection(collection)
        .find({})
        .skip(skip)
        .limit(pageSize)
        .toArray();

      return {
        totalProducts,
        totalPages,
        currentPage: pageNumber,
        pageSize,
        products: result,
      };
    } catch (error) {
      console.error("Error fetching products with pagination:", error);
      throw error;
    }
  }
}

module.exports = Products;
