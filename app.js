const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const port = process.env.PORT || 5000;
;

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
      servers: ["http://localhost:5000"],
    },tags: [
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

//Home page 
app.get('/', (req, res) => {
  const responseText = `
    <html>
      <head>
        <title>Welcome to Home Page</title>
      </head>
      <body>
        <h1>Welcome to Home Page</h1>
        <p>Click the following links:</p><br>
        <ul>
        <li><a href="/todos">Todos</a></li>
        <li><a href="/customers">Customers</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/orders">Orders</a></li>
        <li><a href="/api-docs">Swagger</a></li>
        </ul>
      </body>
    </html>
  `;
  
  res.send(responseText);
})

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
