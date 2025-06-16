// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.get('/python', async (req, res) => {
  try {
    const py = await axios.get('http://localhost:5001/');
    res.send(`Python service says: ${py.data}`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Could not reach Python service');
  }
});

app.listen(port, () => {
  console.log(`Node.js listening on port ${port}`);
});
