const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { format } = require('date-fns');
const ptBR = require('date-fns/locale/pt-BR');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://sistema-gestao-financeira-ury3.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sistema_financeiro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Modelos
const Venda = require('./models/Venda');
const Despesa = require('./models/Despesa');
const Usuario = require('./models/Usuario');
const Cliente = require('./models/Cliente');
const Produto = require('./models/Produto');
const Config = require('./models/Config');
const Meta = require('./models/Meta');

// Configuração do nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Rotas para Clientes
app.post('/api/clientes', async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ nome: 1 });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json({ message: 'Cliente removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rotas para Vendas
app.post('/api/vendas', async (req, res) => {
  try {
    const vendaData = {
      ...req.body,
      data: req.body.data || new Date(),
      valor: req.body.valor || 0
    };

    // Validar se há itens na venda
    if (!vendaData.itens || vendaData.itens.length === 0) {
      return res.status(400).json({ message: 'A venda deve ter pelo menos um item' });
    }

    // Validar se todos os produtos existem
    for (const item of vendaData.itens) {
      const produto = await Produto.findById(item.produto);
      if (!produto) {
        return res.status(400).json({ message: `Produto não encontrado: ${item.produto}` });
      }
    }

    const venda = new Venda(vendaData);
    await venda.save();
    res.status(201).json(venda);
  } catch (error) {
    console.error('Erro ao salvar venda:', error);
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/vendas', async (req, res) => {
  try {
    const vendas = await Venda.find()
      .populate('itens.produto', 'nome preco')
      .sort({ data: -1 });
    res.json(vendas);
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/vendas/:id', async (req, res) => {
  try {
    const vendaData = {
      ...req.body,
      data: req.body.data || new Date(),
      valor: req.body.valor || 0
    };

    // Validar se há itens na venda
    if (!vendaData.itens || vendaData.itens.length === 0) {
      return res.status(400).json({ message: 'A venda deve ter pelo menos um item' });
    }

    // Validar se todos os produtos existem
    for (const item of vendaData.itens) {
      const produto = await Produto.findById(item.produto);
      if (!produto) {
        return res.status(400).json({ message: `Produto não encontrado: ${item.produto}` });
      }
    }

    const venda = await Venda.findByIdAndUpdate(
      req.params.id,
      vendaData,
      { new: true }
    );
    if (!venda) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }
    res.json(venda);
  } catch (error) {
    console.error('Erro ao atualizar venda:', error);
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/vendas/:id', async (req, res) => {
  try {
    const venda = await Venda.findByIdAndDelete(req.params.id);
    if (!venda) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }
    res.json({ message: 'Venda removida com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir venda:', error);
    res.status(500).json({ message: error.message });
  }
});

// Rotas para Despesas
app.post('/api/despesas', async (req, res) => {
  try {
    const despesa = new Despesa(req.body);
    await despesa.save();
    res.status(201).json(despesa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/despesas', async (req, res) => {
  try {
    const despesas = await Despesa.find().sort({ data: -1 });
    res.json(despesas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/despesas/:id', async (req, res) => {
  try {
    const despesa = await Despesa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!despesa) {
      return res.status(404).json({ message: 'Despesa não encontrada' });
    }
    res.json(despesa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/despesas/:id', async (req, res) => {
  try {
    const despesa = await Despesa.findByIdAndDelete(req.params.id);
    if (!despesa) {
      return res.status(404).json({ message: 'Despesa não encontrada' });
    }
    res.json({ message: 'Despesa removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rotas para Produtos
app.post('/api/produtos', upload.single('imagem'), async (req, res) => {
    try {
        const { codigo, nome, descricao, preco, quantidade, categoria } = req.body;
        const imagem = req.file ? req.file.filename : null;

        const produto = new Produto({
            codigo,
            nome,
            descricao,
            preco,
            quantidade,
            categoria,
            imagem
        });

        await produto.save();
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/produtos/:id', async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/produtos/:id', upload.single('imagem'), async (req, res) => {
    try {
        const { codigo, nome, descricao, preco, quantidade, categoria } = req.body;
        const updateData = {
            codigo,
            nome,
            descricao,
            preco,
            quantidade,
            categoria
        };

        if (req.file) {
            // Se houver uma nova imagem, adiciona ao updateData
            updateData.imagem = req.file.filename;
            
            // Remove a imagem antiga se existir
            const produto = await Produto.findById(req.params.id);
            if (produto.imagem) {
                const oldImagePath = path.join(__dirname, 'uploads', produto.imagem);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const produto = await Produto.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.json(produto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/produtos/:id', async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        // Remove a imagem se existir
        if (produto.imagem) {
            const imagePath = path.join(__dirname, 'uploads', produto.imagem);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await produto.deleteOne();
        res.json({ message: 'Produto removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rotas para Configurações
app.get('/api/config', async (req, res) => {
  try {
    const config = await Config.findOne();
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/config', async (req, res) => {
  try {
    const config = await Config.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(config);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rotas para Metas
app.post('/api/metas', async (req, res) => {
  try {
    const meta = new Meta(req.body);
    await meta.save();
    res.status(201).json(meta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/metas', async (req, res) => {
  try {
    const metas = await Meta.find().sort({ data: -1 });
    res.json(metas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/metas/:id', async (req, res) => {
  try {
    const meta = await Meta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!meta) {
      return res.status(404).json({ message: 'Meta não encontrada' });
    }
    res.json(meta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/metas/:id', async (req, res) => {
  try {
    const meta = await Meta.findByIdAndDelete(req.params.id);
    if (!meta) {
      return res.status(404).json({ message: 'Meta não encontrada' });
    }
    res.json({ message: 'Meta removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 