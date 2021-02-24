const { createPool } = require('mysql');
const { promisify } = require('util');

const {
    IS_DOCKER,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = process.env;

const host = IS_DOCKER ? 'db' : 'localhost';

const pool = createPool({
    host,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }
    if (connection) connection.release();
    return;
})

pool.query = promisify(pool.query);

function insertLandingPads(landingPads) {
    let queryItems = []
    for(const landingPad of landingPads) {
        pool.query('SELECT id FROM spaceData').then(pads => {
            if (!pads.includes(landingPad.id)) {
                queryItems.push([
                    landingPad.id,
                    JSON.stringify(landingPad)
                ])
            }
        })
    }
    if(queryItems.length > 0) {
        pool.query(`INSERT INTO spaceData(id, spaceItem) VALUES ?`, [queryItems])
    }
}

module.exports = {
    pool: pool,
    insertLandingPads: insertLandingPads
};
