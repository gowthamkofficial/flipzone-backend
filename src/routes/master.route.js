const express = require('express');
const { getAllStates, getDistricts } = require('../controllers/master.controller');

const masterRouter = express.Router()

/**
 * @swagger
 * /states:
 *   get:
 *     summary: Get all states
 *     tags: [Master]
 *     responses:
 *       200:
 *         description: OK - Request was successful
 *       500:
 *         description: Internal Server Error - An unexpected error occurred
 */
masterRouter.get('/states', getAllStates);


/**
 * @swagger
 * /district/{stateId}:
 *   get:
 *     summary: Get districts by state ID
 *     tags: [Master]
 *     parameters:
 *       - in: path
 *         name: stateId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the state
 *     responses:
 *       200:
 *         description: OK - Request was successful
 *       400:
 *         description: Bad Request - Invalid state ID or parameters
 *       500:
 *         description: Internal Server Error - An unexpected error occurred
 */
masterRouter.get('/district/:stateId', getDistricts)


module.exports = masterRouter;