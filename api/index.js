// 1. Importar o módulo Express
const express = require('express');
const cors = require('cors');
 
// 2. Criar uma instância do aplicativo Express
const app = express();
app.use(cors({ origin: '*' }));
 
// 3. Definir a porta em que o servidor irá escutar
// Usamos process.env.PORT para compatibilidade com ambientes de hospedagem (como Heroku)
// ou a porta 3000 como padrão se a variável de ambiente não estiver definida.
const PORT = process.env.PORT || 3000;
 
// --- Dados Temporários em Memória ---
// Agora os monstros são carregados de um arquivo JSON externo.
const monstros = require('./monstros.json');
 
// --- Rotas da API ---
 
// Rota GET para listar todos os monstros
// Quando alguém fizer uma requisição GET para a URL base + '/monstros'
// (ex: http://localhost:3000/monstros), esta função será executada.
app.get('/monstros', (req, res) => {
    // Retorna a array de monstros como uma resposta JSON
    res.json(monstros);
});
 
 
// --- Iniciar o Servidor ---
 
// Faz o aplicativo Express começar a "escutar" por requisições na porta definida.
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/monstros`);
});
 
 
 
 
app.get ( '/monstros/random', (req, res) =>{
if (monstros.length > 0) {
    const index = Math.floor(Math.random() * monstros.length);
    res.json(monstros[index]);
}
else {
    res.status(404).json({ erro: 'Nenhum monstro encontrado'});
 
}
 
}
);
 
app.get('/monstros', (req, res) => {
    const tipoCriatura = req.query.tipo_criatura;
    const pontosVidaMin = req.query.pontos_vida_min;
    const pontosVidaMax = req.query.pontos_vida_max;
    const buscaTexto = req.query.q;
 
  let resultado = monstros;
 
  if (tipoCriatura) {
    resultado = resultado.filter(m => m.tipo_criatura == (tipoCriatura));
 
  }
  if (pontosVidaMin) {
       resultado = resultado.filter (m => m.pontos_vida >= Number(pontosVidaMin));
  }
 
  if (pontosVidaMax) {
    resultado = resultado.filter (m => m.pontos_vida <= Number(pontosVidaMax));
  }
 
  else {
    const texto = buscaTexto.toLowerCase();
    resultado = resultado.filter (m =>
    (m.nome && m.nome.toLowerCase().includes(buscaTexto)) ||
    (m.descricao && m.descricao.toLowerCase().includes(buscaTexto))
    );
}
 
    res.json(resultado);
});
 
// Futuro do País
 
