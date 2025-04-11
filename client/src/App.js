import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as CustomThemeProvider, useTheme } from './hooks/useTheme';
import Layout from './components/Layout';
import DashboardCompleto from './pages/DashboardCompleto';
import Vendas from './pages/Vendas';
import Despesas from './pages/Despesas';
import Produtos from './pages/Produtos';
import Metas from './pages/Metas';
import Configuracoes from './pages/Configuracoes';

// Criar uma instância do QueryClient
const queryClient = new QueryClient();

function AppContent() {
  const { darkMode } = useTheme();
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router future={{ v7_relativeSplatPath: true }}>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardCompleto />} />
            <Route path="/vendas" element={<Vendas />} />
            <Route path="/despesas" element={<Despesas />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/metas" element={<Metas />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <AppContent />
      </CustomThemeProvider>
    </QueryClientProvider>
  );
}

export default App; 