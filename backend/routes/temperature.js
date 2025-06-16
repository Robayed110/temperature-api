const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

// Rate limiter (100 requests/sec)
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 100,
  message: {
    status: 429,
    error: "Too many requests. Please try again later."
  }
});

router.get('/', limiter, (req, res) => {
  const temperature = (Math.random() * (45 - 15) + 15).toFixed(2);
  res.json({
    temperature,                    
    unit: "Celcius",                
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
