
const express = require("express");

const app = express();

app.use(express.json());
// const db = require("./db/models");
//incluir as controllers

const users = require("./controllers/users");


// criar as rotas
app.use("/", users);

app.listen("8080", () => 
    console.log("Servervir iniciado na porta 8080: http://localhost:8080")
);