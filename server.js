// server.js
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const server = express();
server.use(cors());
server.use(express.json());

const filePath = path.resolve("data/nomesSalvos.json");

// Load data from file
function loadData() {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    console.error("Error reading data file:", e);
    return [];
  }
}

// Save data to file
function saveData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Error writing data file:", e);
  }
}

let data = loadData();

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

server.get('/listar', (req, res) => {
  res.json(data);
});

server.post('/new', (req, res) => {
  const novo = req.body;
  if(!novo.name) {
    res.status(400).json({mensagem: "dados invalidos"})
    return
    }
  data.push(novo);
  saveData(data);
  res.status(201).json({ mensagem: "Sucesso" });
});
