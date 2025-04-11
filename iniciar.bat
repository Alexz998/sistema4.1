@echo off
echo Iniciando o Sistema de Gestão Financeira...
echo.

echo Verificando Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js não encontrado. Por favor, instale o Node.js primeiro.
    echo Baixe em: https://nodejs.org/
    pause
    exit /b
)

echo Verificando MongoDB Compass...
where mongodb-compass >nul 2>nul
if %errorlevel% neq 0 (
    echo MongoDB Compass não encontrado. Por favor, instale o MongoDB Compass.
    echo Baixe em: https://www.mongodb.com/try/download/compass
    pause
    exit /b
)

echo Verificando arquivo .env...
if not exist .env (
    echo Arquivo .env não encontrado. Execute o arquivo instalar.bat primeiro.
    pause
    exit /b
)

echo Verificando dependências...
if not exist node_modules (
    echo Dependências do backend não encontradas. Execute o arquivo instalar.bat primeiro.
    pause
    exit /b
)

if not exist client\node_modules (
    echo Dependências do frontend não encontradas. Execute o arquivo instalar.bat primeiro.
    pause
    exit /b
)

echo Iniciando o servidor backend...
start cmd /k "node server.js"
timeout /t 5

echo Iniciando o servidor frontend...
start cmd /k "cd client && npm start"
timeout /t 10

echo Abrindo o navegador...
start http://localhost:3000

echo.
echo Sistema iniciado com sucesso!
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause >nul 