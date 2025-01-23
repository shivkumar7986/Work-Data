const express = require('express');
const router = express.Router();
const countryModel = require('../model/country');


// create country
router.post('/' , async (req,res)=>{
    try{
        const country = await countryModel.create(req.body);
        res.status(201).json(country);
    }
    catch (err){
        res.status(400).json({error: err.message});
    }
});

// get all country
router.get('/' , async (req,res)=>{
    try {
        const allCountry = await countryModel.findAll();
        res.status(201).json(allCountry)
    } catch (error) {
        res.status(400).json({error: err.message });
    }
});


//get a specific country by id

router.get('/:id' , async (req,res)=>{
    try{
        const country = await countryModel.findByPk(req.params.id)
        if(country){
            res.status(201).json(country)
        }
        else{
            res.status(400).json({error: 'Country not found'});
        }

    }
    catch (err){
        res.status(400).json({error: err.message})
    }
})


// update country

router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Country.update(req.body, {
            where: { CountryID: req.params.id }
        });
        if (updated) {
            const updatedCountry = await Country.findByPk(req.params.id);
            res.status(200).json(updatedCountry);
        } else {
            res.status(404).json({ error: 'Country not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Delete a country
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Country.destroy({
            where: { CountryID: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Country deleted' });
        } else {
            res.status(404).json({ error: 'Country not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;