import * as dotenv from 'dotenv'
dotenv.config()
import knex from 'knex';
const configuration = ({
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
      /*  ssl: {
            rejectUnauthorized: false,
        },*/
    }
});

const myknex = knex(configuration)

export default myknex