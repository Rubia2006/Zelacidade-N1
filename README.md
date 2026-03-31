# 🚀 ZelaCidade

## 📌 Sobre o projeto
A API Zela Cidade foi criada para registrar e gerenciar problemas urbanos, como:

- Buracos
- Vasamentos
- Falta de Luz
- Lixo na rua

Essa API nos permite criar registros, visualizar, atualizar e deletar ocorrencias.

### 💻 Tecnologias ultilizadas

- Node.js
- Express
- SQLite
- SQLite3
- Postman
- Nodemon

---

### ⚙️ Instalação

`npm install`

### ▶️ Como executar
```bash
npm run dev
```
`http:localhost:300`
[Clique aqui](`http:localhost:3000`)

---

### 💾 Banco de Dados
O banco de dados é criado automaticamente ao inicar o projeto.

```
database.db
```

### 📋 Tabela

|  Campo         |      Descrição          |   
|--------------- |-------------------------|
|id              |Identificador único      |
|tipo_do_problema|Tipo do problema         |
|localizacao     |Onde ocorreu             |
|descricao       |Detalhes do incidente    |
|prioridade      |Baixa,Média,Alta         |
|nome_cidadao    |Quem registrou           |
|data            |Data do registro         |
|hora            |hora do registro         |
|status_resolucao|Status (Padrão: Pendente)|

---

### 🧷 Endpoints
#### Rota inicial

```http
GET /
```
Retorna uma página HTML simples com informações da API.

---

#### Rota para listar todos os incidentes
```http
GET /incidents
```
Retorna todos os registros do banco de dados

#### Rota para listar um incidente especifico
```http
GET /incidents/:id
```
Ex: /incidents/1

Retorna uma ocorrência específica.

---

#### Rota para criar um novo incidente
```http
POST /incidents 
```
#### Body (JSON)
```json
{
        "tipo_do_problema": "Vazamento de água",
        "localizacao": "Rua Bello, 4, Centro",
        "descricao": "Falta água no bairro todo",
        "prioridade": "Alta",
        "nome_cidadao": "João Lima",
        "data": "10/05/2025",
        "hora": "22:00"
}
```
#### Rota para atualizar um incidente
```json
PUT /incidents/:id
```

#### Body (JSON)
```json
{
        "descricao": "Vazamento de água concertado",
        "prioridade": "Baixa",
        "status_resolucao": "Resolvido"
}
````
### Rota para deletar um incidente 
```http
DELETE /incidents/:id
```
### 🔒 Segurança
A API ultiliza `?` nas queries SQL:
```sql
WHERE id = ? 
```
Isso evita o SQL Injection

---

### 📚 Conceitos 
- CRUD (Creat, Read, Update, Delete)
- Rotas com Express
- Métodos/Verbos HTTP (GET, POST, PUT, DELETE)
- Banco de Dados SQLite 
- SQL Básico
- Uso de `req.params` e `req.body`

---
### 🎯 Observações
- O banco de dados é criado automaticamente
- Dados inciais são inseridos apenas se estiver vazio
- A API pode ser testada com o Postman

--- 
 
### 🖥️ Projeto Educacional 
Este projeto foi desenvolvido para fins de aprendizado em back-end com Node.js 
