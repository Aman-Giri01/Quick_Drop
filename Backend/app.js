import express from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

import userRoutes from "./src/routes/user/user.routes.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import productRoutes from "./src/routes/shop/product.route.js";
import adminRoutes from "./src/routes/admin/product.route.js";
import { authenticate } from "./src/middlewares/auth.middleware.js";

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/admin/product",  adminRoutes);
app.use("/api/v1/shop/product", productRoutes);
app.use("/api/v1/user", userRoutes);

app.use(errorMiddleware);
export default app;
