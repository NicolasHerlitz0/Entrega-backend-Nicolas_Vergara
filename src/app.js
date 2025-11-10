import express from 'express';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/carts.routes.js';

const app = express();
const PORT = 8080;
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando - Entrega Backend');
});

// Iniciar 
app.listen(PORT, () => {
  console.log(' Servidor corriendo en http://localhost:8080');
});