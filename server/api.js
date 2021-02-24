const https = require('https');
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

module.exports = {
    getLandingPads: getLandingPads
}