const express = require('express');
const { syncTables } = require('./src/models');
const { addStates } = require('./src/controllers/master.controller');
const app = express();
require('dotenv').config()
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const masterRouter = require('./src/routes/master.route');
const userRouter = require('./src/routes/user.route');
const productRouter = require('./src/routes/product.route');
const cartRouter = require('./src/routes/cart.route');



// addStates();  

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Flipzone API',
            version: '1.0.0',
            description: 'API documentation for Flipzone endpoints',
        },
        servers: [
            {
                url: 'http://localhost:4000', // Update based on your server's URL
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/**/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use('/', masterRouter);
app.use('/',userRouter)  ;
app.use('/',productRouter);
app.use('/',cartRouter);


(async () => {
    try {
        await syncTables(); // Sync all models with the database

        app.listen(process.env.PORT, () => {
            console.log(`Server running at http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
    }
})();

