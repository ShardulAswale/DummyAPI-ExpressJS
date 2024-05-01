const express = require("express");
const mongoose = require("mongoose");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const port = process.env.PORT || 5000;

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/your_database";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer",
      },
      servers: [`http://localhost:${port}`],
    },
    tags: [
      {
        name: "Todos",
        description: "Operations related to todos",
      },
      {
        name: "Customers",
        description: "Operations related to customers",
      },
      {
        name: "Products",
        description: "Operations related to Products",
      },
      {
        name: "Orders",
        description: "Operations related to Orders",
      },
    ],
  },
  // ['.routes/*.js']
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
const todoRouter = require("./routes/todoRouter");
const customerRouter = require("./routes/customerRouter");
const orderRouter = require("./routes/orderRouter");
const productRouter = require("./routes/productRouter");
app.use("/todos", todoRouter);
app.use("/customers", customerRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
