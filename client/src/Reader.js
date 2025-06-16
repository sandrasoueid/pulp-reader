import React from 'react';

export default function Reader({ content, fontSize }) {
  return (
    <div
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: 1.6,
        maxWidth: '700px',
        margin: '20px auto'
      }}
    >
      {content.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}
