// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../model/User');

// Create a new user
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { Id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { Id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
