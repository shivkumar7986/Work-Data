// routes/states.js
const express = require('express');
const router = express.Router();
const State = require('../model/State');

// Create a new state
router.post('/', async (req, res) => {
    try {
        const state = await State.create(req.body);
        res.status(201).json(state);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all states
router.get('/', async (req, res) => {
    try {
        const states = await State.findAll();
        res.status(200).json(states);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a state by ID
router.get('/:id', async (req, res) => {
    try {
        const state = await State.findAll({ where: { CountryID: req.params.id } });
        if (state) {
            res.status(200).json(state);
        } else {
            res.status(404).json({ error: 'State not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a state
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await State.update(req.body, {
            where: { StateID: req.params.id }
        });
        if (updated) {
            const updatedState = await State.findByPk(req.params.id);
            res.status(200).json(updatedState);
        } else {
            res.status(404).json({ error: 'State not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a state
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await State.destroy({
            where: { StateID: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'State deleted' });
        } else {
            res.status(404).json({ error: 'State not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
