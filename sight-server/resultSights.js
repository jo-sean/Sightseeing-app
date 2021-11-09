const express = require('express');
const superagent = require('superagent');

// Constants
const API_KEY = 'AIzaSyDbjMspt-ic4PGinaEdft0LltsijBuHjzk';
const URL_ZIP = 'https://maps.googleapis.com/maps/api/geocode/json';
const URL_PLACES = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'

// Create router
const router = express.Router();

router.post('/sight-ideas', function (req, res) {
    const zipCode = req.body.zipCode;
    if (!zipCode || zipCode < 97001 || zipCode > 97920) {
        res.json({
            error: 'Invalid zip code'
        });
    } else {
        superagent
            .get(`${URL_ZIP}?address=${zipCode}&key=${API_KEY}`)
            .end(function (err, result) {
                if(err){
                    console.log(err);
                    return;
                }
                result = JSON.parse(result.text).results[0];
                superagent
                    .get(`${URL_PLACES}?location=${result.geometry.location.lat}%2C${result.geometry.location.lng}&radius=5000&type=tourist_attraction&key=${API_KEY}`)
                    .end(function (err, results) {
                        if (err) {
                            console.log(err);
                            res.json({
                                error: "Bad 3rd party API"
                            });
                        } else {
                            results = JSON.parse(results.text).results;
                            res.json(results.map(function (result, index) {
                                if (index <= 5) {
                                    return {
                                        name: result.name,
                                        latitude: result.geometry.location.lat,
                                        longitude: result.geometry.location.lng
                                    }
                                } else {
                                    return null;
                                }
                            }).filter(result => result))
                        }
                    });
            });
    };
});

module.exports = router;
