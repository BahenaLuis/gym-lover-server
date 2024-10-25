const express = require('express');

const router = express.Router();
const ProductsService = require('./../services/products.service');
const productsService = new ProductsService();



router.get("/", (req, res) =>{
  res.json(productsService.getAll());
});

router.get("/:id", (req, res) =>{
  const id = req.params.id;
  product = productsService.getById(id);

  (product) ? res.json(product) :
    res.status(404).json({ message: "Not found" });
});

router.post("/", (req, res) =>{
  const body = req.body;
  product = productsService.create(body);
  res.status(201).json(product);
});

router.patch("/:id", (req, res) =>{
  const id = req.params.id;
  const body = req.body;
  product = productsService.update(id, body);
  res.json({
    message: 'updated',
    data: product
  });
});

router.delete("/:id", (req, res) =>{
  const id = req.params.id;
  productsService.remove(id);
  res.json({
    message: 'deleted',
    id: id
  });
});

module.exports = router;
