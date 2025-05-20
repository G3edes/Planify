/******************************************************************************************************
 * OBJETIVO: Criar uma API para realizar o CRUD do sistema de controle de Filmes                      *
 * DATA: 20/05/2025                                                                                   *
 * AUTOR: Gabriel Guedes                                                                                   *
 * Versão: 1.0                                                                                        *
 * Observação:                                                                                        *
 *          Para criar a API precisamos instalar:                                                     *
 *                 express             npm install express --save                                     *
 *                 cors                npm install cors --save                                        *
 *                 body-parser         npm install body-parser --save                                 *
 *                                                                                                    *
 *          Para criar a integração com o Banco de Dados precisamos instalar:                         *
 *                 prisma               npm install prisma --save(para fazer a conexão com o BD)       *
 *                 prisma/client        npm install @prisma/client --save (para rodar os scripts SQL) *
 *                                                                                                    *  
 *                                                                                                    *
 *          Após a instalação do prima e do prisma client, devemos :                                  *
 *              npx prisma init                                                                       *
 *                                                                                                    *
 *          Você deverá configurar o arquivo .env e o schema.prisma com as credenciais do BD          *
 *          Após essa configuração voce deverá rodar o seguinte comando:                              *
 *                      npx prisma migrate dev                                                        *
 *********************************************************************************************************/

const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Manipular o body da requisição para chegar apenas JSON
const bodyParserJSON = bodyParser.json()
// Cria o objeto app com referência ao express
const app = express()

// Middleware para permitir requisições CORS
app.use(cors())

// Corrige o cabeçalho CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

// Middleware para interpretar JSON no body
app.use(express.json())
