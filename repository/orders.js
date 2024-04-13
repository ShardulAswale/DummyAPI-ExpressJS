const { ObjectId } = require("mongodb");
const connect = require("../services/orderServices");
const collection = "Orders"; // Assuming your collection is named "orders"

class Orders {
  constructor() {}

  async insertOrder(order) {
    try {
      let db = await connect();
      const result = await db.collection(collection).insertOne(order);
      return result;
    } catch (error) {
      console.error("Error inserting order:", error);
      throw error;
    }
  }

  async getAllOrders() {
    try {
        let db = await connect();
        const Orders = await db.collection(collection).find().toArray();
        const ordersLength = Orders.length;
        // console.log(Orders);
        return { Orders, ordersLength };
    } catch (error) {
        console.error("Error fetching all orders:", error);
        throw error;
    }
}


  //optimised for swagger
  // async getAllOrders() {
  //   try {
  //     let db = await connect();
  //     const result = await db
  //       .collection(collection)
  //       .aggregate([{ $project: { _id: 1 } }])
  //       .toArray();
  //     // Extracting only the IDs from the result
  //     const orderIds = result.map((order) => order._id);
  //     return orderIds;
  //   } catch (error) {
  //     console.error("Error fetching all order IDs:", error);
  //     throw error;
  //   }
  // }

  async getOrderByID1(ID) {
    try {
      let db = await connect();
      const result = await db.collection(collection).findOne({
        _id: new ObjectId(ID),
      });
      return result;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      throw error;
    }
  }

  async getOrderByID2(ID) {
    try {
      let db = await connect();
      const result = await db.collection(collection).findOne({
        id: parseInt(ID),
      });
      return result;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      throw error;
    }
  }

  async updateOrder(orderId, order) {
    try {
      let db = await connect();
      const result = await db.collection(collection).updateOne(
        {
          _id: new ObjectId(orderId),
        },
        { $set: { ...order } }
      );
      return result;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      let db = await connect();
      const result = await db.collection(collection).deleteOne({
        _id: new ObjectId(orderId),
      });
      return result;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }

  async getOrdersWithPagination(pageSize, pageNumber) {
    try {
      let db = await connect();

      const totalOrders = await db.collection(collection).countDocuments();
      const totalPages = Math.ceil(totalOrders / pageSize);

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
        totalOrders,
        totalPages,
        currentPage: pageNumber,
        pageSize,
        orders: result,
      };
    } catch (error) {
      console.error("Error fetching orders with pagination:", error);
      throw error;
    }
  }
}

module.exports = Orders;
