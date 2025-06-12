const express = require('express');
const router = express.Router();
const Household = require('../models/Household');

router.get('/:id', async (req, res) => {
  try {
    const household = await Household.findOne({ household_id: req.params.id });
    if (!household) return res.status(404).json({ error: 'Not found' });
    res.json(household);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/pay-fee', async (req, res) => {
  try {
    await Household.updateOne(
      { household_id: req.params.id },
      { $set: { fee_status: 'Paid' } }
    );
    res.json({ message: 'Payment status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
