const express = require('express');
const superagent = require('superagent');

// Constants
const URL = 'https://maps.googleapis.com/maps/api/';
const API_KEY = 'AIzaSyDbjMspt-ic4PGinaEdft0LltsijBuHjzk';

// Create router
const router = express.Router();





router.post('/sight-ideas', function (req, res) {
    /**
     * Get current weather by zip code
     */
    const zipCode = req.body.zipCode;
    if (!zipCode) {
        res.json({
            error: 'Invalid zip code'
        });
    } else {
        superagent
            .get(`${URL}place/nearbysearch/json?location=${zipCode},us&units=imperial&appid=${API_KEY}`)
            .end(function (err, result) {
                if (err) {
                    console.log(err);
                    res.json({
                        error: "Bad 3rd party API"
                    });
                } else {
                    const body = result.body;
                    res.json({
                        sightName: body.name,
                        latitude: body.coord.lat,
                        longitude: body.coord.lon,
                    });
                }
            });
    }
});