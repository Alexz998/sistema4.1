# Sistema Financeiro

Sistema de gerenciamento financeiro desenvolvido com React, Node.js e MongoDB.

## Configuração do Ambiente

### Pré-requisitos
- Node.js (versão 14 ou superior)
- MongoDB
- Git

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sistema-financeiro.git
cd sistema-financeiro
```

2. Instale as dependências do servidor:
```bash
npm install
```

3. Instale as dependências do cliente:
```bash
cd client
npm install
cd ..
```

4. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
MONGODB_URI=sua_uri_do_mongodb
JWT_SECRET=seu_secret_jwt
EMAIL_USER=seu_email
EMAIL_PASS=sua_senha
```

## Deploy no Vercel

1. Faça login na sua conta do Vercel
2. Importe o repositório do GitHub
3. Configure as variáveis de ambiente no painel do Vercel
4. O deploy será feito automaticamente após cada push para o repositório

## Estrutura do Projeto

```
sistema-financeiro/
├── client/                 # Frontend React
├── models/                 # Modelos do MongoDB
├── routes/                 # Rotas da API
├── server.js              # Servidor Node.js
├── vercel.json            # Configuração do Vercel
└── package.json           # Dependências do servidor
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes. 