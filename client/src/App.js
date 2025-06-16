import React, { useState } from 'react';
import Reader from './Reader';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [story, setStory] = useState(null);
  const [fontSize, setFontSize] = useState(18);

  const loadStory = async e => {
    e.preventDefault();
    const res = await fetch('/api/fetchStory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    if (res.ok) setStory(await res.json());
    else alert('Failed to load story');
  };

  return (
    <div className="App">
      <form onSubmit={loadStory} style={{ margin: '20px' }}>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter fanfiction.net link"
          style={{ width: '70%', padding: '8px' }}
        />
        <button type="submit" style={{ marginLeft: '8px' }}>Load</button>
      </form>

      {story && (
        <div>
          <h1>{story.title}</h1>
          <p><em>by {story.author}</em></p>
          <div style={{ margin: '10px' }}>
            <button onClick={() => setFontSize(f => Math.max(f - 2, 12))}>A-</button>
            <button onClick={() => setFontSize(f => f + 2)} style={{ marginLeft: '8px' }}>A+</button>
          </div>
          <Reader content={story.content} fontSize={fontSize} />
        </div>
      )}
    </div>
  );
}

export default App;
