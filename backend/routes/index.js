const express = require('express');
const router = express.Router();

const collectorRoutes = require('./collector');
const residentRoutes = require('./resident');
const supervisorRoutes = require('./supervisor');

router.use('/collector', collectorRoutes);
router.use('/resident', residentRoutes);
router.use('/supervisor', supervisorRoutes);

module.exports = router;