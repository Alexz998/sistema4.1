import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DataGrid,
  IconButton,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [produtoAtual, setProdutoAtual] = useState({
    nome: '',
    preco: '',
    quantidade: '',
  });

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleOpenDialog = (produto = null) => {
    if (produto) {
      setProdutoAtual(produto);
    } else {
      setProdutoAtual({
        nome: '',
        preco: '',
        quantidade: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (produtoAtual._id) {
        await axios.put(`http://localhost:5000/api/produtos/${produtoAtual._id}`, produtoAtual);
      } else {
        await axios.post('http://localhost:5000/api/produtos', produtoAtual);
      }
      fetchProdutos();
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/produtos/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  const columns = [
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'preco', headerName: 'Preço', width: 130 },
    { field: 'quantidade', headerName: 'Quantidade', width: 130 },
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Produtos</Typography>
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Adicionar Produto
        </Button>
      </Box>

      <DataGrid
        rows={produtos}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {produtoAtual._id ? 'Editar Produto' : 'Adicionar Produto'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nome"
              fullWidth
              value={produtoAtual.nome}
              onChange={(e) => setProdutoAtual({ ...produtoAtual, nome: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Preço"
              type="number"
              fullWidth
              value={produtoAtual.preco}
              onChange={(e) => setProdutoAtual({ ...produtoAtual, preco: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Quantidade"
              type="number"
              fullWidth
              value={produtoAtual.quantidade}
              onChange={(e) => setProdutoAtual({ ...produtoAtual, quantidade: e.target.value })}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default Produtos; 