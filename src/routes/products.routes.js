import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

// Lista productos
router.get('/', (req, res) => {
  try {
    const products = productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Producto por ID
router.get('/:pid', (req, res) => {
  try {
    const product = productManager.getProductById(Number(req.params.pid));
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const newProduct = productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:pid', (req, res) => {
  try {
    const updatedProduct = productManager.updateProduct(Number(req.params.pid), req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/:pid', (req, res) => {
  try {
    productManager.deleteProduct(Number(req.params.pid));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;