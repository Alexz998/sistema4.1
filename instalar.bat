@echo off
echo Instalando o Sistema de Gestão Financeira...
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

echo Instalando dependências do backend...
call npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar dependências do backend.
    pause
    exit /b
)

echo Instalando dependências do frontend...
cd client
call npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar dependências do frontend.
    pause
    exit /b
)
cd ..

echo Criando arquivo .env...
(
echo MONGODB_URI=mongodb://localhost:27017/sistema_financeiro
echo JWT_SECRET=chave_secreta_do_sistema
echo PORT=5002
) > .env

echo.
echo Instalação concluída com sucesso!
echo.
echo Para iniciar o sistema, execute o arquivo iniciar.bat
echo.
pause 