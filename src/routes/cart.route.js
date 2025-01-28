const express = require('express');
const {
    getCartItems,
    addToCart,
    updateCartQuantity,
    removeCartItem,
    clearCart
} = require('../controllers/cart.controller');
const verifyToken = require('../middlewares/auth.middleware');
const cartRouter = express.Router();

// Apply JWT middleware to all routes
cartRouter.use(verifyToken);
/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all items in the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Cart items fetched successfully"
 *       401:
 *         description: "Unauthorized: No or invalid token"
 *       400:
 *         description: "Missing required field"
 *       404:
 *         description: "No items found in the cart"
 *       500:
 *         description: "Internal Server Error"
 */
cartRouter.get('/cart', getCartItems);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               product:
 *                 type: object
 *                 additionalProperties: true
 *     responses:
 *       201:
 *         description: "Product added to the cart successfully"
 *       401:
 *         description: "Unauthorized: No or invalid token"
 *       400:
 *         description: "Missing required fields"
 *       500:
 *         description: "Internal Server Error"
 */
cartRouter.post('/cart', addToCart);

/**
 * @swagger
 * /cart/quantity:
 *   put:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: "Cart quantity updated successfully"
 *       401:
 *         description: "Unauthorized: No or invalid token"
 *       400:
 *         description: "Missing required fields"
 *       404:
 *         description: "Product not found in cart"
 *       500:
 *         description: "Internal Server Error"
 */
cartRouter.put('/cart/quantity', updateCartQuantity);

/**
 * @swagger
 * /cart/item:
 *   post:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: "Product removed from cart successfully"
 *       401:
 *         description: "Unauthorized: No or invalid token"
 *       400:
 *         description: "Missing required fields"
 *       404:
 *         description: "Product not found in cart"
 *       500:
 *         description: "Internal Server Error"
 */
cartRouter.post('/cart/item', removeCartItem);

/**
 * @swagger
 * /cart/clear:
 *   post:
 *     summary: Clear all items in the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "All items removed from cart successfully"
 *       401:
 *         description: "Unauthorized: No or invalid token"
 *       400:
 *         description: "Missing required field"
 *       404:
 *         description: "No cart items found for the user"
 *       500:
 *         description: "Internal Server Error"
 */
cartRouter.post('/cart/clear', clearCart);

module.exports = cartRouter;
