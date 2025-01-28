const axios = require('axios');
const { SuccessResponse, FailureResponse } = require('../models/response.model');

require('dotenv').config()

const baseURL = process.env.PRODUCT_BASEURL


async function getAllProducts(req, res) {
    try {
        const { limit = 5, page = 1, sort = 'asc' } = req.query;

        const response = await axios.get(`${baseURL}?limit=${limit}&page=${page}&sort=${sort}`);

        res.status(200).json(new SuccessResponse(true,200, 'Products fetched successfully', response.data));
    } catch (error) {
        res.status(500).json(new FailureResponse(false,500, 'Failed to fetch products', error.message));
    }
}

async function getSingleProduct(req, res) {
    try {
        const { id } = req.params;

        const response = await axios.get(`${baseURL}/${id}`);

        res.status(200).json(new SuccessResponse(true,200, 'Product fetched successfully', response.data));
    } catch (error) {
        res.status(500).json(new FailureResponse(false,500, 'Failed to fetch product', error.message));
    }
}

module.exports = { getAllProducts, getSingleProduct };