const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
// prime numbers
app.get('/numbers/primes', (req, res) => {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    return res.json({ numbers: primes });
  });
  
  // Fibonacci numbers
  app.get('/numbers/fibo', (req, res) => {
    const fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
    return res.json({ numbers: fibonacci });
  });
  
  // odd numbers
  app.get('/numbers/odd', (req, res) => {
    const oddNumbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    return res.json({ numbers: oddNumbers });
  });
  
  // random numbers
  app.get('/numbers/rand', (req, res) => {
    const randomNumbers = [10, 23, 7, 14, 36, 42, 55, 67, 81, 99];
    return res.json({ numbers: randomNumbers });
  });
  // numbers
app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid URL parameter' });
  }

  const fetchNumbers = async (url) => {
    try {
      const response = await axios.get(url, { timeout: 500 });
      const data = response.data;
      return data.numbers || [];
    } catch (error) {
      return [];
    }
  };

  try {
    const numbers = await Promise.all(urls.map(fetchNumbers));
    const mergedNumbers = Array.from(new Set(numbers.flat())).sort((a, b) => a - b);
    return res.json({ numbers: mergedNumbers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
