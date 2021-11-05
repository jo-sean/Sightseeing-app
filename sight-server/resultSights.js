const express = require('express');
const superagent = require('superagent');

// Constants
const URL = 'https://maps.googleapis.com/maps/api/';
const API_KEY = 'AIzaSyDbjMspt-ic4PGinaEdft0LltsijBuHjzk';

// Create router
const router = express.Router();


function getCoorByZipcode(zipCode) {
    const geocoder = new google.maps.Geocoder();
    const address = zipCode;
    geocoder.geocode({ 'address': 'zipcode ' + address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            const latitude = results[0].geometry.location.lat();
            const longitude = results[0].geometry.location.lng();

            alert("Latitude: " + latitude + "\nLongitude: " + longitude);
        } else {
            alert("Request failed.")
        }
    });
    return [latitude, longitude];
}


router.post('/sight-ideas', function (req, res) {
    /**
     * Get current weather by zip code
     */
    const zipCode = req.body.zipCode;
    if (!zipCode || zipCode < 97001 || zipCode > 97920) {
        res.json({
            error: 'Invalid zip code'
        });
    } else {

        const coordinates = getCoorByZipcode(zipCode);

        superagent
            .get(`${URL}place/nearbysearch/json?location=${coordinates[0]}%2C${coordinates[1]}&radius=1500&type=tourist_attraction&key=${API_KEY}`)
            .end(function (err, result) {
                if (err) {
                    console.log(err);
                    res.json({
                        error: "Bad 3rd party API"
                    });
                } else {
                    const results = JSON.parse(result);
                    res.json({
                        0: {
                            name: results[0].icon_mask_base_uri.name,
                            latitude: results[0].geometry.location.lat,
                            longitude: results[0].geometry.location.lng
                        },
                        1: {
                            name: results[1].icon_mask_base_uri.name,
                            latitude: results[1].geometry.location.lat,
                            longitude: results[1].geometry.location.lng
                        },
                        2: {
                            name: results[2].icon_mask_base_uri.name,
                            latitude: results[2].geometry.location.lat,
                            longitude: results[2].geometry.location.lng
                        },
                        3: {
                            name: results[3].icon_mask_base_uri.name,
                            latitude: results[3].geometry.location.lat,
                            longitude: results[3].geometry.location.lng
                        },
                        4: {
                            name: results[4].icon_mask_base_uri.name,
                            latitude: results[4].geometry.location.lat,
                            longitude: results[4].geometry.location.lng
                        },
                    });
                }
            });
    }
});

module.exports = router;