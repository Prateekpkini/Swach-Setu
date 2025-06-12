const express = require('express');
const router = express.Router();
const Household = require('../models/Household');

router.get('/overview', async (req, res) => {
  try {
    const households = await Household.find();
    const paid = households.filter(h => h.fee_status === 'Paid').length;
    const unpaid = households.length - paid;
    res.json({ total: households.length, paid, unpaid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
