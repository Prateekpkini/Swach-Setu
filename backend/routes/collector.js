const express = require('express');
const router = express.Router();
const Household = require('../models/Household');

router.get('/routes', async (req, res) => {
  try {
    const households = await Household.find();
    res.json(households);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/log-collection', async (req, res) => {
  try {
    const { household_id, date } = req.body;
    // Collection log simulation, extend with a real schema if needed
    console.log(`Collection logged for ${household_id} on ${date}`);
    res.status(201).json({ message: 'Collection logged successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
