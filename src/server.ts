import express from "express";
import dotenv from "dotenv";
import path from "path";
import apiRoutes from "./routes/api.route";


// Initialize app
dotenv.config();
const PORT = process.env.PORT || 5050;
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api", apiRoutes)

// Static routing
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client_dist")));
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client_dist', 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: "Page not found"
    });
});
}

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));