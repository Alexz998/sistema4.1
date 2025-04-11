---
title: Sistema de Gestão Financeira
author: Equipe de Desenvolvimento
date: \today
geometry: margin=2.5cm
header-includes:
  - \usepackage{fancyhdr}
  - \pagestyle{fancy}
  - \fancyhead[LE,RO]{\thepage}
  - \fancyhead[RE,LO]{Sistema de Gestão Financeira}
  - \fancyfoot[C]{}
---

# Sumário

1. [Introdução](#introdução)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Funcionalidades](#funcionalidades)
4. [Instalação](#instalação)
5. [Uso](#uso)
6. [Estrutura do Projeto](#estrutura-do-projeto)
7. [Formatação de Valores](#formatação-de-valores)
8. [Exportação de Dados](#exportação-de-dados)
9. [Manutenção](#manutenção)
10. [Suporte](#suporte)

# Introdução

O Sistema de Gestão Financeira é uma aplicação web desenvolvida para controle de vendas, despesas e produtos. Este documento fornece informações detalhadas sobre a instalação, configuração e uso do sistema.

# Tecnologias Utilizadas

## Backend
- Node.js
- Express.js
- MongoDB (Compass Local)
- Mongoose
- JWT para autenticação

## Frontend
- React.js
- Material-UI
- React Query
- Axios

# Funcionalidades

## Módulo de Vendas
- Cadastro de vendas
- Registro de itens vendidos
- Filtros por:
  - Entregador
  - Forma de pagamento
  - Status
  - Data
  - Valor
- Exportação para PDF e Excel
- Totalizadores de vendas

## Módulo de Despesas
- Cadastro de despesas
- Categorização
- Filtros por:
  - Categoria
  - Forma de pagamento
  - Data
  - Valor
- Exportação para PDF e Excel
- Totalizadores de despesas

## Módulo de Produtos
- Cadastro de produtos
- Controle de estoque
- Categorização
- Preços e custos

# Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
```

2. Instale o MongoDB Compass:
   - Baixe em: https://www.mongodb.com/try/download/compass
   - Instale seguindo as instruções do instalador
   - Inicie o MongoDB Compass
   - Crie uma nova conexão local (mongodb://localhost:27017)

3. Instale as dependências do backend:
```bash
npm install
```

4. Instale as dependências do frontend:
```bash
cd client
npm install
```

5. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com:
```
MONGODB_URI=mongodb://localhost:27017/sistema_financeiro
JWT_SECRET=sua_chave_secreta
PORT=5002
```

6. Inicie o servidor:
```bash
node server.js
```

7. Inicie o cliente:
```bash
cd client
npm start
```

# Uso

## Autenticação
1. Acesse a página de login
2. Use suas credenciais para entrar no sistema

## Vendas
1. Acesse o módulo de Vendas
2. Clique em "Nova Venda"
3. Preencha os dados:
   - Cliente
   - Itens
   - Forma de pagamento
   - Status
4. Salve a venda

## Despesas
1. Acesse o módulo de Despesas
2. Clique em "Nova Despesa"
3. Preencha os dados:
   - Categoria
   - Valor
   - Forma de pagamento
   - Data
   - Descrição
4. Salve a despesa

## Produtos
1. Acesse o módulo de Produtos
2. Clique em "Novo Produto"
3. Preencha os dados:
   - Nome
   - Categoria
   - Preço
   - Custo
   - Estoque
4. Salve o produto

# Estrutura do Projeto

```
Sistema1/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas do sistema
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── hooks/         # Hooks personalizados
│   │   └── utils/         # Funções utilitárias
│   └── package.json       # Dependências do frontend
├── server.js              # Servidor Node.js
├── package.json           # Dependências do backend
└── iniciar.bat            # Script de inicialização
```

# Formatação de Valores

O sistema utiliza o padrão brasileiro para formatação de valores:
- Moeda: R$ 1.234,56
- Números: 1.234,56
- Quantidades: 1.234

# Exportação de Dados

## PDF
1. Selecione os registros desejados
2. Clique em "Exportar PDF"
3. O arquivo será gerado e baixado automaticamente

## Excel
1. Selecione os registros desejados
2. Clique em "Exportar Excel"
3. O arquivo será gerado e baixado automaticamente

# Manutenção

## Backup
- Faça backup regular do banco de dados local usando o MongoDB Compass
- Exporte as coleções para arquivos JSON
- Mantenha cópias seguras dos dados

## Atualizações
1. Faça backup dos dados
2. Atualize o código:
```bash
git pull
```
3. Instale novas dependências:
```bash
npm install
cd client
npm install
```
4. Reinicie o servidor

# Suporte

Para suporte ou dúvidas, entre em contato com o administrador do sistema. 

@echo off
powershell -ExecutionPolicy Bypass -File "%~dp0gerar-pdf.ps1" 