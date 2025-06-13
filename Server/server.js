const express = require('express');
const cors = require('cors');
const data = require('./data');

const app = express();
app.use(cors());

app.get('/api/households', (req, res) => {
  res.json(data.households);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});