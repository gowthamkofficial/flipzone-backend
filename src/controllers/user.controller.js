const { SuccessResponse, FailureResponse } = require("../models/response.model");
const User = require("../models/users.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

async function getOneUser(req, res) {

    try {
        let { id } = req.params
        const user = await User.findByPk(id);

        if (user) {
            res.status(200).json(new SuccessResponse(true, 200, 'Viewed user successfully'), user.dataValues)
        } else {
            res.status(400).json(new FailureResponse(false, 400, 'User not found!', []))
        }

    } catch (error) {
        res.status(500).json(new FailureResponse(false, 500, 'Internal Server Error', error))
    }
}



async function createOneUser(req, res) {
    try {
        console.log(req.body);

        const { email, mobile, firstName, password } = req.body;

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { mobile }]
            }
        });

        if (existingUser) {
            return res.status(400).json(new FailureResponse(false, 400, 'Email or mobile number already in use', []));
        }

        const user = await User.create(req.body);
        res.status(201).json(new SuccessResponse(true, 201, 'Created user successfully', []))

    } catch (error) {
        console.log(error);

        res.status(500).json(new FailureResponse(false, 500, 'Internal Server Error', error))
    }
}



async function updateOneUser(req, res) {

    const { id } = req.params;
    try {

        const { email, mobile } = req.body;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json(new FailureResponse(false, 400, 'User not found', []));
        }

        if (email || mobile) {
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [{ email }, { mobile }],
                    id: { [Op.ne]: id }, // Exclude the current user from the check
                }
            });

            if (existingUser) {
                return res.status(400).json(new FailureResponse(false, 400, 'Email or mobile number already in use by another user', []));
            }
        }




        await user.update(req.body);
        res.status(200).json(new SuccessResponse(true, 200, 'Updated user successfully', user.dataValues))

    } catch (error) {
        res.status(500).json(new FailureResponse(false, 500, 'Internal Server Error', error))
    }
}


async function userSignIn(req, res) {
    try {
        console.log(req?.body);

        const { email, password } = req?.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json(new FailureResponse(false, 400, 'Invalid email or password', []))
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(new FailureResponse(false, 400, 'Invalid email or password dsd', []))

        }


        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.status(200).json(new SuccessResponse(true, 200, 'Logged in successfully', { token }));
    } catch (error) {
        res.status(500).json(new FailureResponse(false, 500, 'Internal Server Error', error))
    }
}



module.exports = { createOneUser, getOneUser, updateOneUser, userSignIn }