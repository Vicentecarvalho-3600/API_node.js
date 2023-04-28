
const express = require("express");

const router = express.Router();

const db = require('./../db/models')

// criar cadastro
router.post("/users", async (req, res) => {

    // receber os dados do corpo de requisiçao
    var dados = req.body;

    console.log(dados);

    // salvar no banco de dados
    await db.Users.create(dados).then((dadosUsuario) => {
        return res.json({
            mensagem: "Usuário cadastrado com sucesso!",
            dadosUsuario
        });
    }).catch(() => {
        return res.json({
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        });
    });

});

module.exports = router;