const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// import
const productRouter = require("./routes/product");
const CategoryRouter = require("./routes/categories");
const userRouter = require("./routes/users");
const orderRouter = require("./routes/orders");
const authJwt = require("./helpers/jwt");
const res = require("express/lib/response");
const { ProductModel } = require("./models/product.model");

mongoose
  .connect(
    `mongodb+srv://kerim:kera2003kera@cluster0.bvnpd.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log("connection error"));

// промежуточное программное обеспечение
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(authJwt());
// mongoose connect
// routes
app.use("/api/products", productRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/", (req, res) => {
  res.send("Running");
});

app.get("/products", async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const products = await ProductModel.find(filter).populate("category");

  if (!products) {
    res.status(404).json({
      data: "products not found",
      status: false,
    });
  }

  res.status(200).json({
    data: products,
    status: true,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Express is working on port ${PORT}`);
});
