import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './Routes/userRoutes.js'
import schoolRoutes from './Routes/schoolroutes.js'

const app = express();
/*app.use(cors({
    origin: '*', // Permite requisições de qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));*/

app.use(express.json());
app.use('/user', userRoutes)
app.use('/school', schoolRoutes)

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on ${process.env.APP_URL}:${process.env.APP_PORT}/`);
})