import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardCompleto from './pages/DashboardCompleto';
import Vendas from './pages/Vendas';
import Despesas from './pages/Despesas';
import Configuracoes from './pages/Configuracoes';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardCompleto />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/despesas" element={<Despesas />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 