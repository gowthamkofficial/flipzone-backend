const Cart = require("../models/cart.model");
const { FailureResponse, SuccessResponse } = require("../models/response.model");


async function getCartItems(req, res) {
      const userId = req['userId'];

    if (!userId) {
        return res.status(400).json(new FailureResponse(false, 400, "Missing required field: userId", []));
    }

    try {
        const cartItems = await Cart.findAll({ where: { userId } });

        if (cartItems.length === 0) {
            return res.status(404).json(new FailureResponse(false, 404, "No items found in the cart", []));
        }

        return res.status(200).json(new SuccessResponse(true, 200, 'Cart items fetched successfully', cartItems));
    } catch (error) {
        return res.status(500).json(new FailureResponse(false, 500, "An error occurred while fetching the cart items", error));
    }
}

async function addToCart(req, res) {
      const userId = req['userId']; // Use the correct key for the userId header
    const { productId, product } = req.body;

    if (!productId || !product) {
        return res.status(400).json(new FailureResponse(false, 400, "Missing required fields: productId, or product", []));
    }

    try {
        // Check if the product is already in the user's cart
        const existingCartItem = await Cart.findOne({
            where: { userId, productId }
        });

        if (existingCartItem) {
            // If the product exists, increment the quantity
            existingCartItem.quantity += 1;
            await existingCartItem.save();
            return res.status(200).json(new SuccessResponse(true, 200, 'Added to cart successfully', existingCartItem));
        } else {
            // If the product doesn't exist, create a new cart item
            const newCartItem = await Cart.create({
                userId,
                productId,
                product,
                quantity: 1
            });

            return res.status(201).json(new SuccessResponse(true, 200, 'Added to cart successfully', newCartItem));
        }
    } catch (error) {
        return res.status(500).json(new FailureResponse(false, 500, "An error occurred while adding the product to the cart", error));
    }
}

async function updateCartQuantity(req, res) {
      const userId = req['userId'];
    const { productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
        return res.status(400).json(new FailureResponse(false, 400, "Missing required fields: userId, productId, or quantity", []));
    }

    try {
        const cartItem = await Cart.findOne({ where: { userId, productId } });

        if (!cartItem) {
            return res.status(404).json(new FailureResponse(false, 404, "Product not found in cart", []));
        }

        if (quantity <= 0) {
            // If quantity is zero or less, remove the item
            await cartItem.destroy();
            return res.status(200).json(new SuccessResponse(true, 200, 'Product removed from cart', null));
        }

        // Update quantity
        cartItem.quantity = quantity;
        await cartItem.save();
        return res.status(200).json(new SuccessResponse(true, 200, 'Cart quantity updated successfully', cartItem));
    } catch (error) {
        return res.status(500).json(new FailureResponse(false, 500, "An error occurred while updating the cart", error));
    }
}

async function removeCartItem(req, res) {
      const userId = req['userId'];
    const { productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json(new FailureResponse(false, 400, "Missing required fields: userId or productId", []));
    }

    try {
        const cartItem = await Cart.findOne({ where: { userId, productId } });

        if (!cartItem) {
            return res.status(404).json(new FailureResponse(false, 404, "Product not found in cart", []));
        }

        await cartItem.destroy();
        return res.status(200).json(new SuccessResponse(true, 200, 'Product removed from cart successfully', null));
    } catch (error) {
        return res.status(500).json(new FailureResponse(false, 500, "An error occurred while removing the product from the cart", error));
    }
}


async function clearCart(req, res) {
      const userId = req['userId'];

    if (!userId) {
        return res.status(400).json(new FailureResponse(false, 400, "Missing required field: userId", []));
    }

    try {
        const result = await Cart.destroy({ where: { userId } });

        if (result === 0) {
            return res.status(404).json(new FailureResponse(false, 404, "No cart items found for the user", []));
        }

        return res.status(200).json(new SuccessResponse(true, 200, 'All items removed from the cart successfully', null));
    } catch (error) {
        return res.status(500).json(new FailureResponse(false, 500, "An error occurred while clearing the cart", error));
    }
}

module.exports = { getCartItems, addToCart, updateCartQuantity, removeCartItem, clearCart }



