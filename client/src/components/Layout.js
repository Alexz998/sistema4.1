import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema Financeiro
          </Typography>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ mr: 2 }}
          >
            Dashboard
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/vendas"
            sx={{ mr: 2 }}
          >
            Vendas
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/despesas"
            sx={{ mr: 2 }}
          >
            Despesas
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/produtos"
            sx={{ mr: 2 }}
          >
            Produtos
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/configuracoes"
          >
            Configurações
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 