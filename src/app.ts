import express from "express";
import dotenv from "dotenv";
import router from "./routes/products.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import cors from "cors";
import path from "path";

dotenv.config();
const isProduction = process.env.NODE_ENV === "production";

const app = express();
const corsOptions = {
  origin: isProduction
    ? "https://products-alpha-lilac.vercel.app"
    : "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

console.log("corsOptions:", corsOptions);

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", router);
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

export default app;
