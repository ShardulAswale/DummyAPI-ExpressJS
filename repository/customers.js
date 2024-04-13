const { ObjectId } = require("mongodb");
const connect = require("../services/customerServices");
const collection = "Customers";
class Customers {
  constructor() {}
  async insertCustomer(customer) {
    let db = await connect();
    const result = await db.collection(collection).insertOne(customer);
    return result;
  }

  async getAllCustomer() {
    let db = await connect();
    const customerList = await db.collection(collection).find().toArray();
    const customerLength = result.length;
    console.log(customerList, customerLength);
    return { customerList, customerLength };
  }

  async getCustomerByID1(ID) {
    let db = await connect();
    const result = await db.collection(collection).findOne({
      _id: new ObjectId(ID),
    });
    // console.log(result)
    return result;
  }

  async getCustomerByID2(ID) {
    let db = await connect();
    console.log("in function ", ID);
    const result = await db.collection(collection).findOne({
      id: parseInt(ID),
    });
    // console.log(result)
    return result;
  }
  async updateCustomer(id, customer) {
    let db = await connect();
    const result = await db.collection(collection).updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: { ...customer } }
    );
    return result;
  }

  async deleteCustomer(id) {
    let db = await connect();
    const result = await db.collection("jsonplaceholder").deleteOne({
      _id: new ObjectId(id),
    });
    return result;
  }

  async getCustomersWithPagination(pageSize, pageNumber) {
    try {
      let db = await connect();

      const totalCustomers = await db.collection(collection).countDocuments();
      const totalPages = Math.ceil(totalCustomers / pageSize);

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
        totalCustomers,
        totalPages,
        currentPage: pageNumber,
        pageSize,
        Customers: result,
      };
    } catch (err) {
      return { error: err.message };
    }
  }
}

module.exports = Customers;
