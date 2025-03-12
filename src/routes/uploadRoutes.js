import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// 📌 Definir pasta onde as imagens serão armazenadas
const uploadFolder = path.join(__dirname, "../public/uploads");

// 📌 Criar a pasta se não existir
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// 📌 Configuração do multer para armazenamento temporário
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 Rota para fazer upload da logo
router.post("/upload-logo", upload.single("logo"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Nenhuma imagem enviada" });
  }

  try {
    const empresaId = req.body.empresaId; // ID da empresa (enviado pelo frontend)
    if (!empresaId) {
      return res.status(400).json({ message: "ID da empresa não informado" });
    }

    // 📌 Definir caminho e nome do arquivo (sempre substitui a logo anterior)
    const fileName = `logo_${empresaId}.jpg`;
    const filePath = path.join(uploadFolder, fileName);

    // 📌 Redimensionar a imagem antes de salvar (máx. 300x300 px)
    await sharp(req.file.buffer)
      .resize({ width: 300, height: 300, fit: "contain" })
      .jpeg({ quality: 80 })
      .toFile(filePath);

    // 📌 Retornar a URL da imagem para o frontend
    const imageUrl = `${process.env.BASE_URL}/uploads/${fileName}`;

    // 📌 Atualizar no banco de dados a URL da logo (caso esteja usando banco)
    // await db("empresas").where({ id: empresaId }).update({ logo_url: imageUrl });

    res.json({ message: "Logo enviada com sucesso!", imageUrl });
  } catch (error) {
    console.error("Erro ao processar imagem:", error);
    res.status(500).json({ message: "Erro ao processar imagem" });
  }
});

export default router;
