const sqlite3 = require('sqlite3');
const { open } = require('sqlite');



const criarBanco = async () => {

  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  })

  await db.exec(`CREATE TABLE IF NOT EXISTS incidents(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo_do_problema TEXT,
            localizacao TEXT,
            descricao TEXT,
            prioridade TEXT,
            nome_cidadao TEXT,
            data TEXT, 
            hora TEXT,
            status_resolucao TEXT DEFAULT 'Pendente')
          `);

  console.log('Banco de dados criado com sucesso!');



    const checagem = await db.get(`SELECT COUNT (*) AS total FROM incidents`);
   
if (checagem.total === 0)    {
  await db.exec(`
      INSERT INTO incidents(tipo_do_problema, localizacao, descricao, prioridade, nome_cidadao, data, hora) VALUES
        ('Iluminação',
          'Rua Antônio Calvário, 664',
          'A lâmpada do poste está queimada e a rua está escura',
          'Média',
          'Rúbia Silva',
          '16/03/2026',
          '19:30'),
      ('Vazamento de água',
        'Rua Bello, 4',
        'Falta água no bairro todo',
        'Alta',
        'João Abreu',
        '10/05/2006',
        '22:00'),
      ('Buraco na rua',
        'Rua Azul Prol, 225',
        'Tem um buraco grande na rua, causando transtorno para os motoristas',
        'Alta',
        'Marcello Matos',
        '06/02/2025',
        '15:00'),
      ('Matagal alto',
        'Rua Azul Prol, 225',
        'O matagal está alto e pode ser um esconderijo para bichos peçonhentos, além de atrapalhar a visibilidade dos mo motoristas',
        'Alta',
        'Leonardo Magalhães',
        '18/03/2026',
        '18:08')
    `);
       }else{
    console.log(`O banco pronto ${checagem.total} incidentes já foram cadastrads`);
  }




  const todosOsIncidents = await db.all('SELECT * FROM incidents');
  console.table(todosOsIncidents);


  const chamadosRubia = await db.all(`SELECT * FROM incidents WHERE nome_cidadao = 'Rúbia Silva'`, );
console.table(chamadosRubia);

await db.run(`UPDATE incidents SET status_resolucao = "Em análise" WHERE tipo_do_problema = "Iluminação"`);
console.log('Problema de iluminação resolvido!!"');


await db.run(`UPDATE incidents SET status_resolucao = "Resolvido" WHERE tipo_do_problema =  "Iluminação"`);
console.log('Problema de iluminação resolvido!!"');


const relatorioAtualizado = await db.all('SELECT * FROM incidents');
console.table(relatorioAtualizado);

return db; 

};

module.exports =  { criarBanco }




















