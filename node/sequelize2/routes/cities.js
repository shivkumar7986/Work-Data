// routes/cities.js
const express = require('express');
const router = express.Router();
const City = require('../model/City');

// Create a new city
router.post('/', async (req, res) => {
    try {
        const city = await City.create(req.body);
        res.status(201).json(city);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all cities
router.get('/', async (req, res) => {
    try {
        const cities = await City.findAll();
        res.status(200).json(cities);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a city by ID
router.get('/:id', async (req, res) => {
    try {
        const city = await City.findByPk(req.params.id);
        if (city) {
            res.status(200).json(city);
        } else {
            res.status(404).json({ error: 'City not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a city
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await City.update(req.body, {
            where: { CityID: req.params.id }
        });
        if (updated) {
            const updatedCity = await City.findByPk(req.params.id);
            res.status(200).json(updatedCity);
        } else {
            res.status(404).json({ error: 'City not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a city
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await City.destroy({
            where: { CityID: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'City deleted' });
        } else {
            res.status(404).json({ error: 'City not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
