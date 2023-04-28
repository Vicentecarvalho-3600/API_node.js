
const express = require("express");

const router = express.Router();

const db = require('./../db/models');


// criar rota listar

router.get("/users", async(req, res) =>{
    // recuperar todos os dados do banco de dados
   const users = await db.Users.findAll({
        //indicar quais colunas recuerar
        attributes: ['id', 'name', 'email'],

        // ordenar os registros pela coluna id de decrescente
        order: [['id', 'DESC']]
   });

   if(users){

        return res.json({
            users
        });

   }else{
        return res.status(400).json({
            mensagem: "Erro: Nenhum usuário encontrado!"
        });
   }
});

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