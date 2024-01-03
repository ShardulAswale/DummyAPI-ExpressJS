const { ObjectId } = require("mongodb");
const connect = require("../services/userServices");
const collection = "jsonplaceholder";
class Users {
  constructor() {}
  async insertUser(user) {
    let db = await connect();
    const result = await db.collection(collection).insertOne(user);
    return result;
  }

  async getAllUser() {
    let db = await connect();
    const result = await db.collection(collection).find().toArray();
    // console.log(result)
    return result;
  }

  async getUserByID1(ID) {
    let db = await connect();
    const result = await db.collection(collection).findOne({
      _id: new ObjectId(ID),
    });
    // console.log(result)
    return result;
  }

  async getUserByID2(ID) {
    let db = await connect();
    console.log("in function ",ID)
    const result = await db.collection(collection).findOne({
      id: parseInt(ID),
    });
    // console.log(result)
    return result;
  }
  async updateUser(id, user) {
    let db = await connect();
    const result = await db.collection(collection).updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: { ...user } }
    );
    return result;
  }

  async deleteUser(id) {
    let db = await connect();
    const result = await db.collection("jsonplaceholder").deleteOne({
      _id: new ObjectId(id),
    });
    return result;
  }

  async getUsersWithPagination(pageSize, pageNumber) {
    try {
      let db = await connect();
      
      const totalUsers = await db.collection(collection).countDocuments();
      const totalPages = Math.ceil(totalUsers / pageSize);
  
      if (pageNumber < 1 || pageNumber > totalPages) {
        return { error: "Invalid page number" };
      }
  
      const skip = (pageNumber - 1) * pageSize;
  
      const result = await db.collection(collection)
        .find({})
        .skip(skip)
        .limit(pageSize)
        .toArray();
  
      return {
        totalUsers,
        totalPages,
        currentPage: pageNumber,
        pageSize,
        users: result,
      };
    } catch (err) {
      return { error: err.message };
    }
  }
  
}

module.exports = Users;
