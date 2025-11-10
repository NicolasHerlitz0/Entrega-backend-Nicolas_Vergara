import fs from 'fs';

class ProductManager {
  constructor() {
    this.path = './data/products.json';
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  addProduct(productData) {
    const newProduct = {
      id: this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1,
      ...productData,
      status: true
    };
    
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) throw new Error("Producto no encontrado");
    
    this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
    this.saveProducts();
    return this.products[productIndex];
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) throw new Error("Producto no encontrado");
    
    this.products.splice(productIndex, 1);
    this.saveProducts();
  }
}

export default ProductManager;