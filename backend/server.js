const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/swachapatha', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const routes = require('./routes');
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));