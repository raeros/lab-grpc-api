const path = require('path');

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: '0.0.0.0',
            user: 'postgres',
            password: 'grpc',
            port: '5169',
            database: 'grpc_products',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.join(__dirname, 'db', 'migrations'),
        },
        seeds: {
            directory: path.join(__dirname, 'db', 'seeds'),
        },
    },
};