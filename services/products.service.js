const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');

class ProductsService {

  constructor() {
    this.products = [];
    this.generateProducts();
    this.pool = pool;
    this.pool.on('error', (error) => {
      console.log(error);
    });
  }

  generateProducts() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid() ,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  getAll() {
    return this.products;
  }

  getById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw boom.notFound("Product not found");
    }
    if (product.isBlock) {
      throw boom.conflict("Product is blocked");
    }
    return product;
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
      throw boom.notFound("Product not found");
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
      throw boom.notFound("Product not found");
    }
    this.products.splice(index, 1);
  }

}

module.exports = ProductsService;
