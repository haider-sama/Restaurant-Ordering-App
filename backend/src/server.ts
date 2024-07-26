import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import myUserRoute from "./routes/MyUserRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import orderRoute from "./routes/OrderRoute";

mongoose.connect(process.env.MONGODB_URL as string);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "Health OK!" });
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

