const express = require('express');
const { getOneUser, createOneUser, updateOneUser, userSignIn } = require('../controllers/user.controller');
const userRouter = express.Router();




/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 mobile:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 stateId:
 *                   type: integer
 *                 districtId:
 *                   type: integer
 *                 pincode:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
userRouter.get('/user/:id', getOneUser);


/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               gender:
 *                 type: string
 *               stateId:
 *                 type: integer
 *               districtId:
 *                 type: integer
 *               pincode:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       500:
 *         description: Internal Server Error
 */
userRouter.post('/user/create', createOneUser);

/**
 * @swagger
 * /user/update/{id}:
 *   put:
 *     summary: Update user details by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID to be updated
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               gender:
 *                 type: string
 *               stateId:
 *                 type: integer
 *               districtId:
 *                 type: integer
 *               pincode:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

userRouter.put('/user/update/:id', updateOneUser);
/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: User Sign-In
 *     tags: [User]
 *     description: Allows a user to sign in by providing their email and password. Returns a JWT token on successful login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: Login successful. Returns a JWT token.
 *       400:
 *         description: Invalid email or password.
 *       500:
 *         description: Internal server error.
 */

userRouter.post('/user/signin', userSignIn);


module.exports = userRouter;