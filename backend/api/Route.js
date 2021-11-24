const userRouter = require("./routes/userRoutes");
const appReviewRouter = require("./routes/appReviewRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");
const commentRouter = require("./routes/commentRoutes");
const needRouter = require("./routes/needRoutes");
const dealRouter = require("./routes/dealRoutes");

module.exports = {
  init(app) {
    app.use("/api/user", userRouter);
    app.use("/api/review", appReviewRouter);
    app.use("/api/category", categoryRouter);
    app.use("/api/product", productRouter);
    app.use("/api/comment", commentRouter);
    app.use("/api/need", needRouter);
    app.use("/api/deal", dealRouter);
  },
};
