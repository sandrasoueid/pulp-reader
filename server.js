// server.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// (Optional later) Serve React build
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.get('/python', async (req, res) => {
  try {
    const py = await axios.get('http://localhost:5001/');
    res.send(`Python service says: ${py.data}`);
  } catch (err) {
    res.status(500).send('Could not reach Python service');
  }
});

app.post('/api/fetchStory', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    // Extract title & author
    const title = $('#profile_top b').first().text() || $('title').text();
    const author = $('#profile_top a[href*="/u/"]').first().text();

    // Extract story text paragraphs
    const content = $('#storytext p')
      .map((i, el) => $(el).text().trim())
      .get()
      .filter(para => para.length > 0);

    res.json({ title, author, content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching or parsing story' });
  }
});

// Fallback to React for any other route (once you build it)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Node.js listening on port ${port}`);
});
