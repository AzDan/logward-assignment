import React, { useState } from 'react'
import styled from 'styled-components';

type Props = {
  type: string
  setNewComment: (comment: any) => void
  hasParent?: boolean
  pid?: string
  setIsReply?: (val: boolean) => void
}

const Post = (props: Props) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
  }

  const validateComment = () => {
    //check name and comment
    if(name!=='' && comment!=='') {
      const commentData = {
        data:{
          name: name,
          text: comment,
          id: generateUniqueId(),
          pid: (props.hasParent !== undefined && props.pid !== undefined) ? props.pid : null,
          date: new Date()
        },
        replies: [{}]
      }

      props.setNewComment(commentData)
      setName('')
      setComment('')
      if(props.hasParent!==undefined && props.hasParent===true && props.setIsReply!==undefined)
        props.setIsReply(false)
    }
  }

  return (
    <CommentPost>
      {props.type==='comment' ?
        <p>Comment</p>
        :
        <p>Reply</p>
      }
      <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)}></input>
      <textarea placeholder='comment' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      <button onClick={() => validateComment()}>POST</button>
      {props.hasParent!==undefined&&props.hasParent===true&&
        <button onClick={() => props.setIsReply!==undefined && props.setIsReply(false)}>CANCEL</button>
      }
    </CommentPost>
  )
}

const CommentPost = styled.div`
  background-color: #F1F2EE;
  padding: 16px;
  border-radius: 8px;
  input, textarea {
    width: 100%;
    display: block;
    margin: 12px 0;
    padding: 8px;
    box-sizing: border-box;
    resize: none;
  }
  button {
    display: inline-block;
    padding: 4px 8px;
    margin-right: 16px;
  }
`

export default Post;