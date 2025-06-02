import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './Routes/userRoutes.js'
import schoolRoutes from './Routes/schoolRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
import loginRoutes from './Routes/loginRoutes.js'
import deliveryRoutes from './Routes/deliveryRoutes.js'
import foodRoutes from './Routes/foodRoutes.js'
import reportRoutes from './Routes/reportRoutes.js'
import testRoutes from './Routes/testsRoutes.js'
import agenda from './services/schedules.js'


agenda.agenda()
const app = express();
app.use(cors({
    origin: '*', // Permite requisições de qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));
app.use(express.json());
app.use('/tests', testRoutes)
app.use('/', loginRoutes)
app.use('/user', userRoutes)
app.use('/school', schoolRoutes)
app.use('/order', orderRoutes)
app.use('/delivery', deliveryRoutes)
app.use('/food', foodRoutes)
app.use('/report', reportRoutes)
app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on ${process.env.APP_URL}:${process.env.APP_PORT}/`);
})