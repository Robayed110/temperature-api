const fs = require('fs');
const morgan = require('morgan');


const express = require('express');
const cors = require('cors');
const temperatureRoute = require('./routes/temperature');
require('dotenv').config();

const app = express();
app.use(cors());

const logStream = fs.createWriteStream('./access.log', { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

app.use('/temperature', temperatureRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
