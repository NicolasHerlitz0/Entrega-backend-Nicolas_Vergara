import express from 'express';
import CartManager from '../managers/CartManager.js';

const router = express.Router();
const cartManager = new CartManager();

// Lista carritos
router.get('/', (req, res) => {
  try {
    const carts = cartManager.getCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar carrito
router.post('/', (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Carrito por ID
router.get('/:cid', (req, res) => {
  try {
    const cart = cartManager.getCartById(Number(req.params.cid));
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Agregar producto 
router.post('/:cid/product/:pid', (req, res) => {
  try {
    const cart = cartManager.addProductToCart(
      Number(req.params.cid), 
      Number(req.params.pid)
    );
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;