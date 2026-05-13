"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LittleNest API',
            version: '1.0.0',
            description: 'Enterprise Baby & Kids Ecommerce Platform API',
            contact: { name: 'LittleNest Dev Team', email: 'dev@littlenest.in' },
        },
        servers: [
            { url: '/api/v1', description: 'Development' },
            { url: 'https://api.littlenest.in/api/v1', description: 'Production' },
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
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/**/*.ts', './src/controllers/**/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map