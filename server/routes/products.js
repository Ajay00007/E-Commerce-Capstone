const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { paginatedResults } = require("../utilities/paginatedResults");
const { authAdmin } = require("../utilities/routeAuth");
const multer = require("multer");

/**
 * Configure Multer Storage Options
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

/**
 * Configure Multer file filter for JPEG and PNG only
 */
function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg or png files allowed."), false);
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

/**
 * Get all products
 * @route GET api/products
 */
router.get("/", paginatedResults(Product), async (req, res) => {
  res.json(res.paginatedResults);
});

/**
 * Search for a product
 * Must be defined before any `/:id` routes
 * @route GET api/products/search
 */
router.get("/search", async (req, res) => {
  const searchTerm = req.query.q;

  if (!req.query.q || req.query.q === "") {
    return res.status(400).json({ msg: "No search query provided." });
  }

  try {
    const results = await Product.find({
      productName: { $regex: searchTerm, $options: "i" },
    }).sort({ productName: 1 });

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
});

/**
 * Get one product
 * @route GET api/products/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const result = await Product.findById(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Add a new product
 * @route POST api/products
 * Requires auth
 */
router.post("/", authAdmin, upload.single("productImage"), async (req, res) => {
  const itemData = {
    productName: req.body.productName,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    price: req.body.price,
    stockQty: req.body.stockQty,
    upc: req.body.upc,
    productImage: req.file.path,
  };

  const newProduct = new Product(itemData);

  try {
    await newProduct.save();

    return res.status(200).json({ msg: "Item added." });
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Update an existing product by ID
 * @route PUT api/products/:id
 * Requires auth
 */
router.put("/:id", authAdmin, async (req, res) => {
  const filter = { _id: req.params.id };
  const dataToUpdate = req.body;
  const opts = { new: true, omitUndefined: true };

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      dataToUpdate,
      opts
    );

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(400).json(error);
  }
});

/**
 * Delete an existing product by ID
 * @route DELETE api/products/:id
 * Requires auth
 */
router.delete("/:id", authAdmin, async (req, res) => {
  try {
    await Product.findOneAndRemove({
      _id: req.params.id,
    });

    return res.status(200).json({ msg: "The product was deleted." });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
