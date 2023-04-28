
const express = require("express");

const router = express.Router();

const db = require('./../db/models');


// criar rota listar

router.get("/users", async(req, res) =>{
    
    //receber o numero da pagina quando nao enviando o numero da pagina e atribuido pagina 1
    const { page = 1 } = req.query;
    
    // limite com numero da ultima pagina
    const limit = 10;

    // variavel como o numro da ultima pagina
    var lastPage = 1;
    // contar a quantidade de registro no banco de dados

    const contUser = await db.Users.count();
    // console.log(contUser);

    if(contUser !== 0){
        // calcular a ultima pagina
        lastPage = Math.ceil(contUser / limit);
        // console.log(lastPage);

    } else {
        return res.status(400).json({
            mensagem: "Erro: Nenhum usuário encontrado!"
        });
    }

    // recuperar todos os dados do banco de dados
   const users = await db.Users.findAll({
        //indicar quais colunas recuerar
        attributes: ['id', 'name', 'email'],

        // ordenar os registros pela coluna id de decrescente
        order: [['id', 'ASC']],
        // calcular a partir de qual registro de retonar e o limite de registros.
        offset: Number((page * limit) - limit),
        limit: limit,
   });

   if(users){
        //criar objeto com as informacoes para paginacao
        var pagination = {
            //caminho
            path: "/users",
            //pagina atual
            page: page,
            //url da pagona anterior
            prev_page_url: page - 1 >= 1 ? page - 1 : false,
            //url da proxima pagina
            next_page_url: Number(page) + Number(1) > lastPage ? false : Number(page) + Number(1),
            //ultima pagina
            lastPage: lastPage,
            total: contUser

        }


        return res.json({
            users,
            pagination
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

    // console.log(dados);

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