const express = require('express');
const superagent = require('superagent');

// Constants
const API_KEY = 'AIzaSyDbjMspt-ic4PGinaEdft0LltsijBuHjzk';
const URL_ZIP = 'https://maps.googleapis.com/maps/api/geocode/json';
const URL_PLACES = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'


// Create router
const router = express.Router();


// router.get

// function getCoorByZipcode(zipCode) {
//     const geocoder = new google.maps.Geocoder();
//     const address = zipCode;
//     geocoder.geocode({ 'address': 'zipcode ' + address }, function (results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//             const latitude = results[0].geometry.location.lat();
//             const longitude = results[0].geometry.location.lng();

//             alert("Latitude: " + latitude + "\nLongitude: " + longitude);
//         } else {
//             alert("Request failed.")
//         }
//     });
//     return [latitude, longitude];
// }

router.post('/sight-ideas', function (req, res) {
    /**
     * Get current weather by zip code
     */
    const zipCode = req.body.zipCode;
    // console.log(zipCode)

    if (!zipCode || zipCode < 97001 || zipCode > 97920) {
        res.json({
            error: 'Invalid zip code'
        });
    } else {

        //const coordinates = getCoorByZipcode(zipCode);
        superagent
            .get(`${URL_ZIP}?address=${zipCode}&key=${API_KEY}`)
            .end(function (err, result) {
                // console.log("superagent 1")
                result = JSON.parse(result.text).results[0];
                superagent
                    .get(`${URL_PLACES}?location=${result.geometry.location.lat}%2C${result.geometry.location.lng}&radius=5000&type=tourist_attraction&key=${API_KEY}`)
                    .end(function (err, results) {
                        // console.log('superagent 2')
                        if (err) {
                            console.log(err);
                            res.json({
                                error: "Bad 3rd party API"
                            });
                        } else {
                            results = JSON.parse(results.text).results;
                            //console.log(results.length, results)
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
                            })
                            )
                        }
                    });
            })
    };
});


module.exports = router;