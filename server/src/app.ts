import compression from "compression";
import cors from "cors";
import express from "express";
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHanlders";
import notFound from "./middlewares/notFound";

const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests

app.use(
  cors({
    origin: ["http://localhost:3000", "https://masum-a-shanto.vercel.app"],
    credentials: true,
  })
);

app.use('/api/v1', router)

// Default route for testing
app.get("/", (_req, res) => {
  res.send("Masum's portfolio server is running");
});



app.use(globalErrorHandler)
app.use(notFound)

export default app;
