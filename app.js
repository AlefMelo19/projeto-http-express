const express = require('express');
const app = express();
const usuarios = require('./usuarios.json');

app.use(express.json());

app.get('/usuario', (requisicao, resposta)=>{
    resposta.status(404).json(usuarios);
})

app.post('/usuario', (requisicao, resposta)=>{
    const usuario = requisicao.body;
    if (!usuario) {
        return resposta.status(400).json({ mensagem: 'Usuario não informado'});
      }

      const usuarioParaAdicionar = { ...usuario, ativo: usuario.idade > 18 };
    
      usuarios.push(usuarioParaAdicionar);
      return resposta.status(201).json(usuarioParaAdicionar);
})

app.delete('/usuario/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
  
    const usuarioIndex = usuarios.findIndex((usuario) => usuario.id === Number(id))
  
   
    if (usuarioIndex < 0) {
      return resposta.status(404).json({ mensagem: 'Usuário não encontrado'})
    }

    usuarios.splice(usuarioIndex, 1);

    return resposta.status(204).send();
})
   
app.listen(3000,()=> console.log('Servidor rodando na porta 3000 com express!'));
