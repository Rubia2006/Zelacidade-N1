const express = require('express')
const { criarBanco } = require('./database')

const cors = require('cors') 

const app = express()

app.use(cors())

app.use(express.json());


app.get('/', (req, res) => {
    res.send(`
        <body>
        <h1>ZelaCidade<h1>
        <h2>Gestão de Problemas Urbanos</h2>
        <p>Endpoint que leva os incidentes cadastrados: /incidents </p>
        </body>
             `); 
    
    
});


app.get("/incidents", async (req, res) => {
    const db = await criarBanco()
    const listaIncidentes = await db.all(`SELECT * FROM incidents`)
    res.json(listaIncidentes)
})

//rota especifica : id
app.get("/incidents/:id", async (req, res) => {
    const { id } = req.params 
    const db = await criarBanco() //criarBanco foi criada no database.db
    const incidenteEspecifico = await db.all(`SELECT * FROM incidents WHERE id = ?`, [id])
    res.json(incidenteEspecifico)
})

app.post("/incidents", async (req, res) => {
    const {tipo_do_problema, localizacao, descricao, prioridade, nome_cidadao, data, hora} = req.body
    const db = await criarBanco() 
    await db.run(`INSERT INTO incidents(tipo_do_problema, localizacao, descricao, prioridade, nome_cidadao, data, hora) VALUES (?,?,?,?,?,?,?)`, [tipo_do_problema, localizacao, descricao, prioridade, nome_cidadao, data, hora])
    res.send(`${tipo_do_problema} registrado na data ${data} por ${nome_cidadao} `)

})

//aula de hoje 25/03

app.put("/incidents/:id", async (req, res) =>{
//pega o id do incidents que vem pela URL (ex: /incidents/4)
const { id } = req.params;
const { localizacao, descricao, prioridade } = req.body;
const db = await criarBanco();
    await db.run(`
        UPDATE incidents SET localizacao = ?, descricao = ?, prioridade = ?
        WHERE id = ?`, [localizacao, descricao, prioridade, id])

//enviar uma resposta para o cliente
res.send(`O incidente de ${id} foi atualizado com sucesso!`)
});

//Rota de remoção
app.delete("/incidents/:id", async (req, res) => {
    //Pega o ID do incidente que vem pela URL (ex: /incidents/4)
const {id} = req.params;
const db = await criarBanco()
    await db.run(`DELETE FROM incidents WHERE id = ?`, [id])
        res.send(`O incidente de ${id} foi removido com sucesso!!`)
});

const PORT =  process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
