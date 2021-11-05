import * as sights from './sight_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());


app.post('/sights', (req, res) => {
    sights.createSight(req.body.name, req.body.location, req.body.weather, req.body.crimeRate)
        .then(sight => {
            res.status(201).json(sight);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});


app.get('/sights/:_id', (req, res) => {
    const sightId = req.params._id;
    sights.findSightById(sightId)
        .then(sight => {
            if (sight !== null) {
                res.json(sight);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});


app.get('/sights', (req, res) => {
    let filter = {};
    if (req.query.date !== undefined) {
        filter = { date: req.query.date };
    }
    sights.findSight(filter, '', 0)
        .then(sight => {
            res.json(sight);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});


app.put('/sights/:_id', (req, res) => {
    sights.replaceSight(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            // console.log(typeof (numUpdated), numUpdated)
            if (numUpdated === 1) {
                res.json({
                    _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight,
                    unit: req.body.unit, date: req.body.date
                })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});


app.delete('/sights/:_id', (req, res) => {
    sights.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});