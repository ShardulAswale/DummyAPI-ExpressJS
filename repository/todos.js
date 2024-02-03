const { ObjectId } = require("mongodb");
const connect = require("../services/todoServices");
const collection = "Todos";
class todos {
  constructor() {}
  async insertTodo(todo) {
    let db = await connect();
    const result = await db.collection(collection).insertOne(todo);
    return result;
  }

  async getAllTodo() {
    let db = await connect();
    const result = await db.collection(collection).find().toArray();
    // Sort the result array by the 'id' property
    result.sort((a, b) => a.id - b.id);

    // console.log(result)
    return result;
  }

  //   async getTodoByID1(ID) {
  //     let db = await connect();
  //     const result = await db.collection(collection).findOne({
  //       _id: new ObjectId(ID),
  //     });
  //     // console.log(result)
  //     return result;
  //   }

  async getTodoByID1(ID) {
    let db = await connect();
    console.log(ID);
    const result = await db.collection(collection).findOne({
      _id: new ObjectId(ID),
    });
    console.log("result ",result);
    return result;
  }

  async getTodoByID2(ID) {
    let db = await connect();
    console.log("in function ", ID);
    const result = await db.collection(collection).findOne({
      id: parseInt(ID),
    });
    // console.log(result)
    return result;
  }
  async updateTodo(id, todo) {
    let db = await connect();
    const result = await db.collection(collection).updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: { ...todo } }
    );
    return result;
  }

  async deleteTodo(id) {
    let db = await connect();
    const result = await db.collection("jsonplaceholder").deleteOne({
      _id: new ObjectId(id),
    });
    return result;
  }

  async getTodosWithPagination(pageSize, pageNumber) {
    try {
      let db = await connect();

      const totaltodos = await db.collection(collection).countDocuments();
      const totalPages = Math.ceil(totaltodos / pageSize);

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
        totaltodos,
        totalPages,
        currentPage: pageNumber,
        pageSize,
        todos: result,
      };
    } catch (err) {
      return { error: err.message };
    }
  }
}

module.exports = todos;
