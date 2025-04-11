const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://sistema-gestao-financeira.vercel.app/api'
    : 'http://localhost:5002/api'
};

export default config; 