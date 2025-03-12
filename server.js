const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// 📌 Importando a rota corrigida
const uploadRoutes = require("./src/routes/uploadRoutes");

// 📌 Carregar variáveis de ambiente
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 📌 Servir arquivos estáticos (logos das empresas)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// 📌 Usar a rota de upload
app.use("/api", uploadRoutes);

// 📌 Definir porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
