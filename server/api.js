const https = require('https');
const { pool } = require('./db');
const db = require('./db');

const baseUrl = 'https://api.spacexdata.com/v3'
const endpoints = {
    landingPads: '/landpads'
}

function getLandingPads() {
    return new Promise((resolve, reject) => {
        https.get(baseUrl + endpoints.landingPads, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const landingPads = JSON.parse(data);
                const filteredLandingPads = []
                for (const pad of landingPads) {
                    filteredLandingPads.push({
                        id: pad.id,
                        fullName: pad.full_name,
                        status: pad.status,
                        location: pad.location
                    })
                }
                db.insertLandingPads(filteredLandingPads)
                resolve(filteredLandingPads)
            });

            resp.on('error', (error) => {
                reject(error)
            })
        })
    });
}

function getLandingPad(id) {
    return new Promise((resolve, reject) => {
        const landingPad = db.getLandingPad(id)
        if (landingPad !== null) {
            resolve(landingPad)
        }
        https.get(baseUrl + endpoints.landingPads + '/' + id, (resp) => {
            let data = '';
            
            resp.on('data', (chunk) => {
                data += chunk;
            });
            
            resp.on('end', () => {
                resolve(data)
            });

            resp.on('error', (error) => {
                reject(error)
            })
        })
    });
}

module.exports = {
    getLandingPads: getLandingPads,
    getLandingPad: getLandingPad
}