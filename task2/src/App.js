import React from 'react'
import Post from './components/post-row/PostRow';

function App() {
  return (
    <main className="container">
      <Post table={"main"} />
      <Post table={"pivot"} />
    </main>
  );
}

export default App;
