const express = require('express')
const { criarBanco } = require('./database')


const app = express()
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

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get("/incidents", async (req, res) => {

    const db = await criarBanco()

    const listaIncidentes = await db.all(`SELECT * FROM incidents`)
    res.json(listaIncidentes)
})