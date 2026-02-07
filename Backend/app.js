import express from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

import userRoutes from "./src/routes/user/user.routes.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import productRoutes from "./src/routes/shop/product.route.js";
import adminRoutes from "./src/routes/admin/product.route.js";
import adminCategoryRoutes from "./src/routes/admin/category.route.js";
import adminSubCategoryRoutes from "./src/routes/admin/subCategory.route.js";
import addressRoutes from "./src/routes/user/address.route.js";

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/admin/product",adminRoutes);
app.use("/api/v1/admin/category", adminCategoryRoutes);
app.use("/api/v1/admin/subcategory", adminSubCategoryRoutes);
app.use("/api/v1/shop/product",productRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/address", addressRoutes);

app.use(errorMiddleware);
export default app;
