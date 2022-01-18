import React from 'react'
import Post from './components/post-row/PostRow';

function App() {
  const props = {
    columnNames: ['Name1', 'name2', 'name3', 'name4', 'name5'],
    status: 'archive'
  }
  
  return (
    <main className="container">
      <Post content1={props} />
    </main>
  )
}

export default App;
