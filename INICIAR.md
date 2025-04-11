# Instruções de Inicialização do Sistema

## Script de Inicialização (iniciar.bat)

O arquivo `iniciar.bat` é um script que automatiza o processo de inicialização do sistema. Ele executa as seguintes ações:

1. Inicia o servidor backend (Node.js)
2. Inicia o servidor frontend (React)
3. Abre o navegador com a aplicação

### Como Usar

1. Certifique-se de que o Node.js está instalado
2. Certifique-se de que o MongoDB Compass está instalado e rodando
3. Execute o arquivo `iniciar.bat`

### Conteúdo do Script

```batch
@echo off
echo Iniciando o servidor...
start cmd /k "node server.js"
timeout /t 5
echo Iniciando o cliente...
start cmd /k "cd client && npm start"
timeout /t 10
echo Abrindo o navegador...
start http://localhost:3000
```

### Solução de Problemas

1. **Servidor não inicia**
   - Verifique se o Node.js está instalado
   - Verifique se o MongoDB Compass está rodando
   - Verifique se a porta 27017 (MongoDB) está disponível
   - Verifique se a porta 5002 (API) está disponível

2. **Cliente não inicia**
   - Verifique se todas as dependências estão instaladas
   - Execute `npm install` na pasta client
   - Verifique se a porta 3000 está disponível

3. **Navegador não abre**
   - Abra manualmente o navegador
   - Acesse http://localhost:3000

### Configuração do Ambiente

1. **Node.js**
   - Versão recomendada: 14.x ou superior
   - Instale em: https://nodejs.org/

2. **MongoDB Compass**
   - Versão recomendada: 1.35 ou superior
   - Instale em: https://www.mongodb.com/try/download/compass
   - Configure a conexão local:
     - Host: localhost
     - Port: 27017
     - Database: sistema_financeiro

3. **Variáveis de Ambiente**
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as seguintes variáveis:
     ```
     MONGODB_URI=mongodb://localhost:27017/sistema_financeiro
     JWT_SECRET=sua_chave_secreta
     PORT=5002
     ```

### Dicas

1. **Primeira Execução**
   - Execute `npm install` na raiz do projeto
   - Execute `npm install` na pasta client
   - Configure o arquivo `.env`
   - Inicie o MongoDB Compass

2. **Reinicialização**
   - Feche todas as janelas do terminal
   - Execute o `iniciar.bat` novamente

3. **Desenvolvimento**
   - Para desenvolvimento, use `npm run dev` no backend
   - Use `npm start` no frontend
   - Mantenha o MongoDB Compass rodando

### Segurança

1. **Arquivo .env**
   - Mantenha o arquivo `.env` seguro
   - Não compartilhe as credenciais
   - Use senhas fortes

2. **Backup**
   - Faça backup regular do banco de dados usando o MongoDB Compass
   - Exporte as coleções para arquivos JSON
   - Mantenha cópias seguras dos dados

### Suporte

Para problemas com o script de inicialização:
1. Verifique os logs no terminal
2. Confirme as configurações do ambiente
3. Entre em contato com o suporte técnico 