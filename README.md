# Sistema F 1.0

Sistema de gerenciamento desenvolvido em Python com Flask.

## Requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd SistF-1.0
```

2. Crie um ambiente virtual:
```bash
python -m venv venv
```

3. Ative o ambiente virtual:
- Windows:
```bash
.\venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

4. Instale as dependências:
```bash
pip install -r requirements.txt
```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
FLASK_APP=app.py
FLASK_ENV=development
```

## Executando o Projeto

1. Com o ambiente virtual ativado, execute:
```bash
flask run
```

2. Acesse o sistema em: http://localhost:5000

## Estrutura do Projeto

```
SistF-1.0/
├── app/
│   ├── __init__.py
│   ├── models/
│   ├── routes/
│   └── templates/
├── venv/
├── .env
├── .gitignore
├── requirements.txt
└── README.md
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes. 