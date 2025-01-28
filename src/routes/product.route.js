const express = require('express');
const { getAllProducts, getSingleProduct } = require('../controllers/product.controller');
const productRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products with pagination, limit, and sorting
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 5
 *         description: The number of products to retrieve per page
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: The sorting order (asc/desc)
 *     responses:
 *       200:
 *         description: OK - Products fetched successfully
 *       500:
 *         description: Internal Server Error - An unexpected error occurred
 */
productRouter.get('/products', getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to fetch
 *     responses:
 *       200:
 *         description: OK - Product fetched successfully
 *       400:
 *         description: Bad Request - Invalid product ID
 *       500:
 *         description: Internal Server Error - An unexpected error occurred
 */
productRouter.get('/products/:id', getSingleProduct);

module.exports = productRouter;
