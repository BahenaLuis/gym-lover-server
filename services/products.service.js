const { faker } = require('@faker-js/faker');

class ProductsService {

  constructor() {
    this.products = [];
    this.generateProducts();
  }

  generateProducts() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid() ,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url()
      });
    }
  }

  getAll() {
    return this.products;
  }

  getById(id) {
    return this.products.find(product => product.id === id);
  }

  create(product) {
    const newProduct = {
      id: faker.string.uuid() ,
      name: product.name,
      price: parseInt(product.price),
      image: product.imageUrl
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id, data) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...data
    };
    return this.products[index];
  }

  remove(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    this.products.splice(index, 1);
  }

}

module.exports = ProductsService;
