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

    pool.query('SELECT id FROM spaceData;').then(pads => {
        let ids = []
        pads.forEach(pad => {
            ids.push(pad.id)
        })
        for (const landingPad of landingPads) {
            if (!ids.includes(landingPad.id)) {
                queryItems.push([
                    landingPad.id,
                    JSON.stringify(landingPad)
                ])
            }
        }
        if (queryItems.length > 0) {
            pool.query(`INSERT INTO spaceData(id, spaceItem) VALUES ?`, [queryItems])
        }
    })    
}

function getLandingPad(id) {
    pool.query(`SELECT * FROM spaceData WHERE id="${id}"`).then(pads => {
        if (pads.length > 0) {
            return pads[0]
        }
    })
    return null
}

module.exports = {
    pool: pool,
    insertLandingPads: insertLandingPads,
    getLandingPad: getLandingPad
};
