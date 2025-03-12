import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 📌 Servir arquivos estáticos (logos das empresas)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// 📌 Usar a rota de upload
app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
