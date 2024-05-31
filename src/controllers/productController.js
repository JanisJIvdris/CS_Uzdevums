const { Product, Audit } = require("../models");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, units, price } = req.body;
  try {
    const product = await Product.create({ name, units, price });
    await Audit.create({
      userId: req.user.id,
      action: "CREATE",
      entity: "Product",
      timestamp: new Date(),
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, units, price } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    product.name = name;
    product.units = units;
    product.price = price;
    await product.save();
    await Audit.create({
      userId: req.user.id,
      action: "UPDATE",
      entity: "Product",
      timestamp: new Date(),
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    await Audit.create({
      userId: req.user.id,
      action: "DELETE",
      entity: "Product",
      timestamp: new Date(),
    });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
