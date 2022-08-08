import React, { useState } from 'react';
import './App.css';
import Comments from './Comments';
import Post from './Post';

function App() {
  const [newComment, setNewComment] = useState<Comment>();

  //function to pass down as prop to Comments and Post
  const passNewCommentToPost = (comment: Comment) => {
    setNewComment(comment);
  }

  return (
    <div className="App">
      <br></br>
      <Post type='comment' setNewComment={passNewCommentToPost}/>
      <br></br>
      <Comments newComment={newComment} setNewComment={passNewCommentToPost}/>
    </div>
  );
}

export default App;
