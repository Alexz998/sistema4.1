const axios = require('axios');

async function criarAdmin() {
  try {
    // Criar usuário admin
    const response = await axios.post('http://localhost:5002/api/auth/criar-admin');
    console.log('Resposta da criação do admin:', response.data);

    // Fazer login
    const loginResponse = await axios.post('http://localhost:5002/api/auth/login', {
      email: 'admin@admin.com',
      senha: 'admin123'
    });
    console.log('Token de acesso:', loginResponse.data.token);
  } catch (error) {
    console.error('Erro:', error.response ? error.response.data : error.message);
  }
}

criarAdmin(); 